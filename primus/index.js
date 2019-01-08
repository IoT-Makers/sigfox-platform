'use strict';
const {addAttribute, getTargetClients, send} = require('./helper');
const admin = require('./admin');
const Primus = require('primus');
const amqp = require('amqplib');
const mongolib = require('mongodb');
const MongoClient = mongolib.MongoClient;
const ObjectId = mongolib.ObjectId;
const mongodbUrl = process.env.MONGO_URL;
const rabbitUrl = process.env.RABBIT_URL || 'amqp://usr:pwd@localhost';
const healthcheckToken = 'healthcheck';
const log = require('loglevel');
log.setLevel('info');
// log.enableAll();

// TODO: opt using mongo aggreagation

let db;
let AdminRoleID;
global.primus = Primus.createServer(function connection(spark) {

    }, {
    port: process.env.PORT || 2333,
    transformer: 'engine.io'
});


// Connect to the db
MongoClient.connect(mongodbUrl, {useNewUrlParser: true}, function (err, client) {
    if (err) {
        log.error("MONGO_URL not set on Primus");
        throw err;
    }
    // get db name
    let s = mongodbUrl.split("/");
    let dbName = s[s.length - 1];
    db = client.db(dbName);
    log.info("Primus connected to Mongo");

    // cache admin role id
    const Role = db.collection('Role');
    Role.findOne({name: 'admin'}).then(adminRole => {
        AdminRoleID = adminRole._id;
    }).catch(_ => {
        // adminRole could be undef when launching new stack, just exit and wait for docker to bring it back
        log.error('adminRole not defined yet');
        process.exit(1);
    });
});


global.RT_EX = 'realtime_exchange_v2';
const TASK_QUEUE = 'task_queue';
let WorkerCh;
let RtQueue;
let RtCh;

amqp.connect(rabbitUrl).then(conn => {
    let promises = []; // array of promises
    global.RabbitConn = conn;
    let workerChPromise = conn.createChannel().then(ch => {
        WorkerCh = ch;
        WorkerCh.assertQueue(TASK_QUEUE, {durable: true, messageTtl: 5000}).then(function(q) {
            log.info("Worker connected to RabbitMQ");
            WorkerCh.prefetch(50);
            return WorkerCh.consume(q.queue, workerHandlers);
        })
    });
    promises.push(workerChPromise);

    let rtChPromise = conn.createChannel().then(ch => {
        RtCh = ch;
        RtCh.assertExchange(RT_EX, 'topic', {durable: true});
        return RtCh.assertQueue('', {exclusive: true, messageTtl: 5000}).then(function(q) {
            RtQueue = q;
            log.info("Rt handler connected to RabbitMQ");
            return RtCh.consume(RtQueue.queue, rtHandlers, {noAck: true});
        })
    });
    promises.push(rtChPromise);
    return Promise.all(promises);
}).catch(log.error);

const workerHandlers = function (msg) {
    let payload = JSON.parse(msg.content.toString());
    if (!payload) return;
    const cbAck = _ => {
        WorkerCh.ack(msg);
    };
    switch (payload.event) {
        case "device":
            deviceWorker(payload, cbAck);
            break;
        case "geoloc":
            geolocWorker(payload, cbAck);
            break;
    }
};

function deviceWorker(payload, cb) {
    const device = payload.content;
    if (!device) return;
    const userId = payload.usrId;
    log.debug(payload.action + ' device ' + device.id + ' for user ' + userId);

    db.collection("OrganizationDevice").find({deviceId: device.id}).toArray((err, ods) => {
        const orgIds = ods.map(od => od.organizationId.toString());
        payload.orgIds = orgIds;
        let rk = `${userId}.${orgIds.join('.')}`;
        WorkerCh.publish(RT_EX, rk, Buffer.from(JSON.stringify(payload), 'utf8'));
        cb();
    });
}

function geolocWorker(payload, cb) {
    const geoloc = payload.content;
    if (!geoloc) return;
    const userId = payload.usrId;
    log.debug(payload.action + ' geoloc ' + geoloc.id + ' for user ' + userId);

    db.collection("OrganizationDevice").find({deviceId: geoloc.deviceId}).toArray((err, ods) => {
        const orgIds = ods.map(od => od.organizationId.toString());
        payload.orgIds = orgIds;
        let rk = `${userId}.${orgIds.join('.')}`;
        WorkerCh.publish(RT_EX, rk, Buffer.from(JSON.stringify(payload), 'utf8'));
        cb();
    });
}

const rtHandlers = function (msg) {
    let payload = JSON.parse(msg.content.toString());
    if (!payload) return;
    // log.log(payload);
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
};
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


// Handle connections to user client
primus.on('connection', function connection(spark) {
    if (!db) return;

    // manual auth hook, attach userId to spark if access token found
    const access_token = spark.request.query.access_token;
    if (!access_token || access_token === healthcheckToken) return spark.end();
    log.info(primus.connected + " clients connected");

    // auth & stats
    let AccessToken = db.collection("AccessToken");
    AccessToken.findOne({_id: access_token}, (err, token) => {
        if (err || !token) {
            log.info("Access token not found");
            spark.end();
            return;
        }
        spark.userId = token.userId.toString();

        const RoleMapping = db.collection('RoleMapping');
        RoleMapping.findOne({principalId: spark.userId}).then(userRM => {
            spark.userIsAdmin = userRM.roleId.toString() === AdminRoleID.toString();
        });

        // Update user properties: connected
        const user = db.collection("user");
        user.updateOne({_id: token.userId}, {
            $set: {
                connected: true,
                connectedAt: new Date()
            }
        }, (err, user) => {
            if (err || !user) {
                log.info("[connection] User not found");
            } else log.debug('[' + spark.userId + '] Updated fields connected and connectedAt');
        });
    });

    spark.on('data', function (data) {
        const id = data.id;
        const listenerType = id === spark.userId ? 'personal' : 'org';
        const rk = `#.${id}.#`;
        RtCh.bindQueue(RtQueue.queue, RT_EX, rk);

        spark.listenerInfo = {
            id: id,
            type: listenerType,
            listenTo: data.listenTo
        };
        log.debug("listenerInfo", spark.listenerInfo);

        admin.registerAdminListener(spark);
    });
});


// Handle disconnections
primus.on('disconnection', function (spark) {
    if (!db || !spark.userId || !spark.listenerInfo) return;

    const rk = spark.listenerInfo.id;
    let bindCount = 0;
    primus.forEach(function (spark, id, connections) {
        if (spark.listenerInfo && spark.listenerInfo.id === rk)
            bindCount++;
    });
    if (bindCount === 0)
        RtCh.unbindQueue(RtQueue.queue, RT_EX, `#.${spark.listenerInfo.id}.#`);

    admin.unregisterAdminListener(spark);

    let user = db.collection("user");
    user.update({_id: ObjectId(spark.userId)}, {$set: {connected: false, disconnectedAt: new Date()}}, (err, user) => {
        if (err || !user) {
            log.info("[disconnection] User not found");
        } else log.debug('[' + spark.userId + '] Updated fields connected and disconnectedAt');
    });
});


function messageHandler(payload) {
    const msg = payload.content;
    if (msg) {
        // from message.ts
        const userId = payload.usrId;
        log.debug(payload.action + ' message ' + msg.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'message', payload.orgIds);

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
    if (device) {
        // from device.ts
        const userId = payload.usrId;
        log.debug(payload.action + ' device ' + device.id + ' for user ' + userId);

        const targets = getTargetClients(userId, 'device', payload.orgIds);
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, device);

        let organizations = [];
        let promises = [];
        payload.orgIds.forEach(orgId => {
            promises.push(db.collection("Organization").findOne({_id: ObjectId(orgId)}).then(org => {
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
    }
}


function parserHandler(payload) {
    const parser = payload.content;
    if (parser) {
        // from parser.ts
        const userId = payload.usrId;
        log.debug(payload.action + ' parser ' + parser.id + ' for user ' + userId);
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
        const userId = payload.usrId;
        log.debug(payload.action + ' geoloc ' + geoloc.id + ' for user ' + userId);

        const targets = getTargetClients(userId, 'geoloc', payload.orgIds);
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        // if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, device);
        addAttribute(geoloc, "Device", payload.device);
        if (geoloc.beaconId) {
            db.collection("Beacon").findOne({_id: geoloc.beaconId}, (err, beacon) => {
                addAttribute(geoloc, "Beacon", beacon);
                return send(targets.complete, payload.event, payload.action, geoloc);
            });
        } else return send(targets.complete, payload.event, payload.action, geoloc);
    }
}

function alertHandler(payload) {
    const alert = payload.content;
    const userId = payload.usrId;
    if (alert) {
        // from alert.ts
        log.debug(payload.action + ' alert ' + alert.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'alert');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, alert);

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
    const userId = payload.usrId;
    if (beacon) {
        log.debug(payload.action + ' beacon ' + beacon.id + ' for user ' + userId);
        let targets = getTargetClients(userId, 'beacon');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;
        if (payload.action === "DELETE") return send(targets.complete, payload.event, payload.action, beacon);

        return send(targets.complete, payload.event, payload.action, beacon);
    }
}

function connectorHandler(payload) {
    const connector = payload.content;
    if (connector) {
        const userId = payload.usrId;
        log.debug(payload.action + ' connector ' + connector.id + ' for user ' + userId);

        let targets = getTargetClients(userId, 'connector');
        send(targets.countOnly, payload.event, payload.action, null);
        if (!targets.complete) return;

        return send(targets.complete, payload.event, payload.action, connector);
    }
}

function categoryHandler(payload) {
    const category = payload.content;
    if (category) {
        const userId = payload.usrId;
        log.debug(payload.action + ' category ' + category.id + ' for user ' + userId);

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
        const userId = payload.usrId;
        // from dashboard.ts
        log.debug(payload.action + ' dashboard ' + dashboard.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId, 'dashboard', [dashboard.organizationId]);
        if (!targetClients.complete) return;
        return send(targetClients.complete, payload.event, payload.action, dashboard);
    }
}

function widgetHandler(payload) {
    const widget = payload.content;
    if (widget) {
        const userId = payload.usrId;
        // from widget.ts
        log.debug(payload.action + ' widget ' + widget.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId, 'widget');
        send(targetClients.countOnly, payload.event, payload.action, null);
        if (!targetClients.complete) return;
        return send(targetClients.complete, payload.event, payload.action, widget);
    }
}

primus.on('disconnection', function end(spark) {
    // don't log health check
    if (spark.userId) log.info(`disconnection ${primus.connected} clients connected`);
});


// primus.library();
primus.save(__dirname + '/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

