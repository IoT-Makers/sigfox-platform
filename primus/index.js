'use strict';
// MONGO_URL=mongodb://usr:pwd@localhost:27017/testdb SERVER_ACCESS_TOKENS='"ghjmnbv44cdftgy rtyuh9784b"' npm start

const Primus = require('primus');
const amqp = require('amqplib/callback_api');
const mongolib = require('mongodb');
const MongoClient = mongolib.MongoClient;
const ObjectId = mongolib.ObjectId;
const mongodbUrl = process.env.MONGO_URL;
const rabbitUrl = process.env.RABBIT_URL || 'amqp://localhost';
if (!process.env.SERVER_ACCESS_TOKENS) return console.error('/!\ Please set the SERVER_ACCESS_TOKENS env.');
const serverAccessTokens = process.env.SERVER_ACCESS_TOKENS.slice(1, -1).split(' ');
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
amqp.connect(rabbitUrl, function(err, conn) {
    conn.createChannel(function(err, ch) {
        ch.assertExchange(ex, 'fanout', {durable: true});
        ch.assertQueue('', {exclusive: true}, function(err, q) {
            if (err) {
                console.error("RABBIT_URL not set on Primus");
                throw err;
            }
            ch.bindQueue(q.queue, ex, '');
            ch.consume(q.queue, function(msg) {
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
                }}, {noAck: true});
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

    console.info(primus.connected + " clients connected");
    // manual auth hook, attach userId to spark if access token found
    const access_token = spark.request.query.access_token;
    if (!access_token || access_token === healthcheckToken) return spark.end();

    if (!serverAccessTokens.includes(access_token)) {
        let AccessToken = db.collection("AccessToken");
        AccessToken.findOne({_id: access_token}, (err, token) => {
            if (err || !token) {
                console.info("Access token not found");
                spark.end();
                return;
            }
            spark.userId = token.userId.toString();

            // Check if user belongs to an organization
            const orguser = db.collection("Organizationuser");
            orguser.find({userId: token.userId}, {organizationId: true}).toArray((err, orgUsersIdObj) => {
                err ?
                    console.error(err) :
                    spark.organizationIds = orgUsersIdObj.map(x => x.organizationId.toString());
                console.log(spark.organizationIds);
            });

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
    }
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

// TODO: if action == update, sometimes there's no need to query the db
function messageHandler(payload) {
    const msg = payload.content;
    const userId = msg.userId;
    if (msg) {
        // from message.ts
        console.log(payload.action + ' message ' + msg.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId, payload.device.Organizations);
        if (!targetClients.size)
            return;

        if (payload.action === "DELETE") return send(targetClients, payload.event, payload.action, msg);

        db.collection("Geolocs").find({messageId: msg.id}).toArray((err, geolocs) => {
            addAttribute(msg, "Geolocs", geolocs);
            addAttribute(msg, "Device", payload.device);
            return send(targetClients, payload.event, payload.action, msg);
        });
    }
}

function deviceHandler(payload) {
    const device = payload.content;
    const userId = device.userId;
    if (device) {
        // from device.ts
        console.log(payload.action + ' device ' + device.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId);
        if (!targetClients.size)
            return;

        if (payload.action === "DELETE") return send(targetClients, payload.event, payload.action, device);

        db.collection("Message").find({deviceId: device.id}).limit(1).sort({"createdAt": -1}).toArray((err, messages) => {
            addAttribute(device, "Messages", messages);
            db.collection("Parser").findOne({_id: ObjectId(device.parserId)}, (err, parser) => {
                addAttribute(device, "Parser", parser);
                db.collection("Organization").find({deviceId: device.id}).toArray((err, organizations) => {
                    addAttribute(device, "Organizations", organizations);
                    if (device.categoryId)
                        db.collection("Category").findOne({_id: ObjectId(device.categoryId)}, (err, category) => {
                            addAttribute(device, "Category", category);
                            return send(targetClients, payload.event, payload.action, device);
                        });
                    return send(targetClients, payload.event, payload.action, device);
                });
            });
        });
    }
}


function parserHandler(payload) {
    const parser = payload.content;
    const userId = parser.userId;
    if (parser) {
        // from parser.ts
        console.log(payload.action + ' parser ' + parser.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.size)
            return;

        if (payload.action === "DELETE") return send(targetClients, payload.event, payload.action, parser);

        db.collection("Device").find({parserId: parser.id}).toArray((err, devices) => {
            addAttribute(parser, "Devices", devices);
            return send(targetClients, payload.event, payload.action, parser);
        });
    }
}

function geolocHandler(payload) {
    const geoloc = payload.content;
    const userId = geoloc.userId;
    if (geoloc) {
        console.log(payload.action + ' geoloc ' + geoloc.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.size)
            return;

        db.collection("Device").findOne({_id: geoloc.deviceId}, (err, device) => {
            addAttribute(geoloc, "Device", device);
            if (geoloc.beaconId) {
                db.collection("Beacon").findOne({_id: geoloc.beaconId}, (err, beacon) => {
                    addAttribute(geoloc, "Beacon", beacon);
                    return send(targetClients, payload.event, payload.action, geoloc);
                });
            } else return send(targetClients, payload.event, payload.action, geoloc);
        });
    }
}

function alertHandler(payload) {
    const alert = payload.content;
    const userId = alert.userId;
    if (alert) {
        // from alert.ts
        console.log(payload.action + ' alert ' + alert.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.size)
            return;

        if (payload.action === "DELETE") return send(targetClients, payload.event, payload.action, alert);

        db.collection("Connector").findOne({_id: ObjectId(alert.connectorId)}, (err, connector) => {
            addAttribute(alert, "Connector", connector);
            db.collection("Device").findOne({_id: alert.deviceId}, (err, device) => {
                addAttribute(alert, "Device", device);
                return send(targetClients, payload.event, payload.action, alert);
            });
        });
    }
}

function beaconHandler(payload) {
    const beacon = payload.content;
    const userId = beacon.userId;
    if (beacon) {
        console.log(payload.action + ' beacon ' + beacon.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.size)
            return;

        return send(targetClients, payload.event, payload.action, beacon);
    }
}

function connectorHandler(payload) {
    const connector = payload.content;
    const userId = connector.userId;
    if (connector) {
        console.log(payload.action + ' connector ' + connector.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.size)
            return;

        return send(targetClients, payload.event, payload.action, connector);
    }
}

function categoryHandler(payload) {
    const category = payload.content;
    const userId = category.userId;
    if (category) {
        console.log(payload.action + ' category ' + category.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.size)
            return;

        if (payload.action === "DELETE") {
            send(targetClients, payload.event, payload.action, category);
            return;
        }

        db.collection("Device").find({categoryId: category.id}).toArray((err, devices) => {
            addAttribute(category, "Devices", devices);
            db.collection("Organization").find({categoryId: category.id}).toArray((err, organizations) => {
                addAttribute(category, "Organizations", organizations);
                return send(targetClients, payload.event, payload.action, category);
            });
        });
    }
}

function dashboardHandler(payload) {
    const dashboard = payload.content;
    const userId = dashboard.userId;
    console.log(payload);
    if (dashboard) {
        // from dashboard.ts
        console.log(payload.action + ' dashboard ' + dashboard.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId, [dashboard.organizationId]);
        if (!targetClients.size)
            return;
        return send(targetClients, payload.event, payload.action, dashboard);
    }
}

function widgetHandler(payload) {
    const widget = payload.content;
    const userId = widget.userId;
    if (widget) {
        // from widget.ts
        console.log(payload.action + ' widget ' + widget.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.size)
            return;
        return send(targetClients, payload.event, payload.action, widget);
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

function getTargetClients(userId, orgIds = null) {
    let targetClients = new Set();
    if (userId) {
        primus.forEach(function (spark, id, connections) {
            if (spark.userId === userId) targetClients.add(spark);
        });
    }
    if (orgIds) {
        primus.forEach(function (spark, id, connections) {
            if (spark.organizationIds) {
                orgIds.forEach(orgId => {
                    if (spark.organizationIds.includes(orgId))
                        targetClients.add(spark);
                });
            }
        });
    }
    console.log(targetClients.size + ' clients online');
    return targetClients;
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
    console.info(primus.connected + " clients connected");
});


// primus.library();
primus.save(__dirname + '/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

