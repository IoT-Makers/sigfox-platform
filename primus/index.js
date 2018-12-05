'use strict';
const Primus = require('primus');
const amqp = require('amqplib/callback_api');
const mongolib = require('mongodb');
const MongoClient = mongolib.MongoClient;
const ObjectId = mongolib.ObjectId;
const mongodbUrl = process.env.MONGO_URL;
const rabbitUrl = process.env.RABBIT_URL || 'amqp://usr:pwd@localhost';
const healthcheckToken = 'healthcheck';

let db;
// var http = require('http');
// var server = http.createServer(/* request handler */);
const primus = Primus.createServer(function connection(spark) {

}, {
    port: process.env.PORT || 2333,
    transformer: 'engine.io'
});


// Connect to the db
MongoClient.connect(mongodbUrl, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        console.error("MONGO_URL not set on Primus");
        throw err;
    }
    // get db name
    let s = mongodbUrl.split("/");
    let dbName = s[s.length - 1];

    db = client.db(dbName);
    console.log("Primus connected to Mongo");
});


const ex = 'realtime_exchange';
amqp.connect(rabbitUrl, function (err, conn) {
    conn.createChannel(function (err, ch) {
        if (err) {
            console.error("RABBIT_URL not set on Primus");
            throw err;
        }
        ch.assertExchange(ex, 'fanout', {durable: true});
        ch.assertQueue('', {exclusive: true}, function (err, q) {
            if (err) {
                console.error("RABBIT_URL not set on Primus");
                throw err;
            }
            ch.bindQueue(q.queue, ex, '');
            console.log("Primus connected to RabbitMQ");
            ch.consume(q.queue, function (msg) {
                let payload = JSON.parse(msg.content.toString());
                if (!payload) return;
                // console.log(payload);
                switch (payload.event) {
                    case "message":
                        messageHandler(payload);
                        break;
                    case "device":
                        deviceHandler(payload);
                        break;
                    case "parser":
                        parserHandler(payload);
                        break;
                    case "geoloc":
                        geolocHandler(payload);
                        break;
                    case "alert":
                        alertHandler(payload);
                        break;
                    case "beacon":
                        beaconHandler(payload);
                        break;
                    case "connector":
                        connectorHandler(payload);
                        break;
                    case "category":
                        categoryHandler(payload);
                        break;
                    case "dashboard":
                        dashboardHandler(payload);
                        break;
                    case "widget":
                        widgetHandler(payload);
                        break;
                    default:
                        break;
                }
            }, {noAck: true});
        });
    });
});
//
// Add auth hook on server
//
// primus.authorize(function (req, done) {
//     const access_token = req.query.access_token;
//     if (serverAccessTokens.includes(access_token)) {
//         done();
//     } else {
//         db.collection("AccessToken").findOne({"_id": access_token}, (err, token) => {
//             if (err || !token) return;
//             done();
//         })
//     }
// });

//
// Listen for new connections and send data
//

// Handle connections to user client
primus.on('connection', function connection(spark) {
    if (!db) return;

    // manual auth hook, attach userId to spark if access token found
    const access_token = spark.request.query.access_token;
    if (!access_token || access_token === healthcheckToken) return spark.end();
    console.info(primus.connected + " clients connected");

    let AccessToken = db.collection("AccessToken");
    AccessToken.findOne({_id: access_token}, (err, token) => {
        if (err || !token) {
            console.info("Access token not found");
            spark.end();
            return;
        }
        spark.userId = token.userId.toString();

        // Update user properties: connected
        let user = db.collection("user");
        user.update({_id: ObjectId(spark.userId)}, {
            $set: {
                connected: true,
                connectedAt: new Date()
            }
        }, (err, user) => {
            if (err || !user) {
                console.info("User not found");
            } else console.info('[' + spark.userId + '] Updated fields connected and connectedAt');
        });
    });

    spark.on('data', function (data) {
        const id = data.id;
        const listenerType = id === spark.userId ? 'personal' : 'org';
        spark.listenerInfo = {
            id: id,
            type: listenerType,
            listenTo: data.listenTo
        };
        console.debug("listenerInfo", spark.listenerInfo);
    });
});


// Handle disconnections
primus.on('disconnection', function (spark) {
    if (!db || !spark.userId) return;
    let user = db.collection("user");
    user.update({_id: ObjectId(spark.userId)}, {$set: {connected: false, disconnectedAt: new Date()}}, (err, user) => {
        if (err || !user) {
            console.info("User not found");
        } else console.info('[' + spark.userId + '] Updated fields connected and disconnectedAt');
    });
});


function messageHandler(payload) {
    const msg = payload.content;
    if (msg) {
        // from message.ts
        const userId = msg.userId;
        console.debug(payload.action + ' message ' + msg.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'message', payload.device.Organizations.map(o => o.id.toString()));

        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, msg);

        db.collection("Geolocs").find({messageId: msg.id}).toArray((err, geolocs) => {
            addAttribute(msg, "Geolocs", geolocs);
            addAttribute(msg, "Device", payload.device);
            return send(targets.complete, payload.event, payload.action, msg);
        });
    }
}

function deviceHandler(payload) {
    const device = payload.content;
    const userId = device.userId;
    if (device) {
        // from device.ts
        console.debug(payload.action + ' device ' + device.id + ' for user ' + userId);

        db.collection("OrganizationDevice").find({deviceId: device.id}).toArray((err, ods) => {
            const targets = getTargetClients(userId, 'device', ods.map(od => od.organizationId.toString()));
            send(targets.countOnly, payload.event, payload.action, null);
            if (!targets.complete) return;
            if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, device);

            let organizations = [];
            let promises = [];
            ods.forEach(od => {
                promises.push(db.collection("Organization").findOne({_id: ObjectId(od.organizationId)}).then(org => {
                    organizations.push(org);
                }));
            });
            Promise.all(promises).then(_ => {
                addAttribute(device, "Organizations", organizations);
                db.collection("Message").find({deviceId: device.id}).limit(1).sort({"createdAt": -1}).toArray((err, messages) => {
                    addAttribute(device, "Messages", messages);
                    db.collection("Parser").findOne({_id: ObjectId(device.parserId)}, (err, parser) => {
                        addAttribute(device, "Parser", parser);

                        if (device.categoryId)
                            db.collection("Category").findOne({_id: ObjectId(device.categoryId)}, (err, category) => {
                                addAttribute(device, "Category", category);
                                return send(targets.complete, payload.event, payload.action, device);
                            });
                        return send(targets.complete, payload.event, payload.action, device);
                    });
                });
            });
        });
    }
}


function parserHandler(payload) {
    const parser = payload.content;
    if (parser) {
        // from parser.ts
        const userId = parser.userId;
        console.debug(payload.action + ' parser ' + parser.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'parser');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, parser);

        db.collection("Device").find({parserId: parser.id}).toArray((err, devices) => {
            addAttribute(parser, "Devices", devices);
            return send(targets.complete, payload.event, payload.action, parser);
        });
    }
}

function geolocHandler(payload) {
    const geoloc = payload.content;
    if (geoloc) {
        const userId = geoloc.userId;
        console.debug(payload.action + ' geoloc ' + geoloc.id + ' for user ' + userId);

        db.collection("OrganizationDevice").find({deviceId: geoloc.deviceId}).toArray((err, ods) => {
            const targets = getTargetClients(userId, 'geoloc', ods.map(od => od.organizationId.toString()));
            send(targets.countOnly, payload.event, payload.action, null);
            if (!targets.complete) return;
            // if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, device);

            db.collection("Device").findOne({_id: geoloc.deviceId}, (err, device) => {
                addAttribute(geoloc, "Device", device);

                if (geoloc.beaconId) {
                    db.collection("Beacon").findOne({_id: geoloc.beaconId}, (err, beacon) => {
                        addAttribute(geoloc, "Beacon", beacon);
                        return send(targets.complete, payload.event, payload.action, geoloc);
                    });
                } else return send(targets.complete, payload.event, payload.action, geoloc);
            });
        });
    }
}

function alertHandler(payload) {
    const alert = payload.content;
    const userId = alert.userId;
    if (alert) {
        // from alert.ts
        console.debug(payload.action + ' alert ' + alert.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'alert');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, msg);

        db.collection("Connector").findOne({_id: ObjectId(alert.connectorId)}, (err, connector) => {
            addAttribute(alert, "Connector", connector);
            db.collection("Device").findOne({_id: alert.deviceId}, (err, device) => {
                addAttribute(alert, "Device", device);
                return send(targets.complete, payload.event, payload.action, alert);
            });
        });
    }
}

function beaconHandler(payload) {
    const beacon = payload.content;
    const userId = beacon.userId;
    if (beacon) {
        console.debug(payload.action + ' beacon ' + beacon.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'beacon');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, msg);

        return send(targets.complete, payload.event, payload.action, beacon);
    }
}


// TODO: TEST THIS
function connectorHandler(payload) {
    const connector = payload.content;
    if (connector) {
        const userId = connector.userId;
        console.debug(payload.action + ' connector ' + connector.id + ' for user ' + userId);

        let targets = getTargetClients(userId, 'beacon');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;

        return send(targets.complete, payload.event, payload.action, connector);
    }
}

function categoryHandler(payload) {
    const category = payload.content;
    if (category) {
        const userId = category.userId;
        console.debug(payload.action + ' category ' + category.id + ' for user ' + userId);

        let targets = getTargetClients(userId, 'category');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, parser);

        db.collection("Device").find({categoryId: category.id}).toArray((err, devices) => {
            addAttribute(category, "Devices", devices);
            db.collection("OrganizationCategory").find({categoryId: ObjectId(category.id)}).toArray((err, organizations) => {
                addAttribute(category, "Organizations", organizations);
                return send(targets.complete, payload.event, payload.action, category);
            });
        });
    }
}

function dashboardHandler(payload) {
    const dashboard = payload.content;
    if (dashboard) {
        const userId = dashboard.userId;
        // from dashboard.ts
        console.debug(payload.action + ' dashboard ' + dashboard.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId, 'dashboard', [dashboard.organizationId]);
        if (!targetClients.complete) return;
        return send(targetClients.complete, payload.event, payload.action, dashboard);
    }
}

// TODO: TEST
function widgetHandler(payload) {
    const widget = payload.content;
    if (widget) {
        const userId = widget.userId;
        // from widget.ts
        console.debug(payload.action + ' widget ' + widget.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId, 'widget');
        send(targetClients.countOnly, payload.event, payload.action, null);
        if (!targetClients.complete) return;
        return send(targetClients.complete, payload.event, payload.action, widget);
    }
}

function addAttribute(obj, attName, attValue) {
    if (attValue) {
        // change _id to id
        if (attValue._id) {
            attValue.id = attValue._id;
            delete attValue._id;
        }
        if (Array.isArray(attValue))
            attValue = attValue.map((v, i, arr) => {
                if (v._id) {
                    v.id = v._id;
                    delete v._id;
                }
                return v;
            });
        obj[attName] = attValue;
    }
}

// returns 2 groups of spark: clients needing detailed event (listenTo) and countOnly
function getTargetClients(userId, event='', orgIDs=null) {
    let complete=[], countOnly=[];
    primus.forEach(function (spark, id, connections) {
        const listenerInfo = spark.listenerInfo;
        if (!listenerInfo) return;
        // console.error(listenerInfo.listenTo);

        if (listenerInfo.type === 'personal') {
            if (listenerInfo.id === userId)
                listenerInfo.listenTo.includes(event) ?
                    complete.push(spark) :
                    countOnly.push(spark);
        } else {
            if (orgIDs && orgIDs.includes(listenerInfo.id))
                listenerInfo.listenTo.includes(event) ?
                    complete.push(spark) :
                    countOnly.push(spark);
        }
    });
    console.debug(`[${event}] ${complete.length} users needs detail`);
    console.debug(`[${event}] ${countOnly.length} users needs only count`);
    return {complete: complete, countOnly: countOnly};
}

function send(targetClients, eventName, action, content) {
    const outgoingPayload = {
        event: eventName,
        action: action,
        content: content
    };
    targetClients.forEach(function (spark) {
        spark.write(outgoingPayload);
        console.log(action + " sent");
    });
}

primus.on('disconnection', function end(spark) {
    console.log('disconnection');
    // don't log health check
    if (spark.userId) console.info(primus.connected + " clients connected");
});


// primus.library();
primus.save(__dirname + '/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

