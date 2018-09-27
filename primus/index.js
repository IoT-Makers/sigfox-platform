'use strict';

const Primus = require('primus');
const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = process.env.MONGO_URL;
const serverAccessTokens = process.env.SERVER_ACCESS_TOKENS.split(' ');
const ObjectId = require('mongodb').ObjectId;

let db;
var connectedClient = 0;

// var http = require('http');
// var server = http.createServer(/* request handler */);
const primus = Primus.createServer(function connection(spark) {

}, { port: process.env.PORT || 2333,
    transformer: 'engine.io'
});


// Connect to the db
MongoClient.connect(mongodbUrl, { useNewUrlParser: true }, function(err, client) {
    if (err) {
        console.error("mongodbUrl not set on primus");
        throw err;
    }
    // get db name
    let s = mongodbUrl.split("/");
    let dbName = s[s.length-1];

    db = client.db(dbName);
    console.log("Primus connected to mongo");
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
primus.on('connection', function connection(spark) {
    console.log('new connection');
    connectedClient++;
    console.info(connectedClient + " clients connected");
    // TODO: handle the case where connection comes in before db connection
    if (!db) return;

    // manual auth hook, attach userId to spark if access token found
    const access_token = spark.request.query.access_token;
    if (!serverAccessTokens.includes(access_token)) {
        let AccessToken = db.collection("AccessToken");
        AccessToken.findOne({_id: access_token}, (err, token) => {
            if (err || !token) {
                console.info("Access token not found");
                spark.end();
                return;
            }
            spark.userId = token.userId.toString();
        });
    }

    spark.on('data', function data(payload) {
        if (!payload) return;
        console.log('incoming data');
        switch(payload.event) {
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
            default:
                break;
        }
    });
});

// TODO: if action == update, sometimes there's no need to query the db
function messageHandler(payload) {
    const msg = payload.content;
    const userId = msg.userId.toString();
    if (msg) {
        // from message.ts
        console.log(payload.action + ' message ' + msg.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            send(targetClients, payload.event, payload.action, msg);
            return;
        }

        db.collection("Geolocs").find({messageId: msg.id}).toArray((err, geolocs) => {
            msg.Geolocs = geolocs;
            msg.Device = payload.device;
            send(targetClients, payload.event, payload.action, msg);
        });
    }
}

function deviceHandler(payload) {
    const device = payload.content;
    const userId = device.userId.toString();
    if (device) {
        // from device.ts
        console.log(payload.action + ' device ' + device.id + ' for user ' + userId);
        let targetClients = getTargetClients(userId);
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            send(targetClients, payload.event, payload.action, device);
            return;
        }

        db.collection("Message").find({deviceId: device.id}).limit(1).sort({"createdAt": -1}).toArray((err, messages) => {
            device.Messages = messages;
            db.collection("Category").findOne({_id: ObjectId(device.categoryId)}, (err, category) => {
                device.Category = category;
                db.collection("Parser").findOne({_id: ObjectId(device.parserId)}, (err, parser) => {
                    device.Parser = parser;
                    db.collection("Organization").find({deviceId: device.id}).toArray((err, organizations) => {
                        device.Organizations = organizations;
                        send(targetClients, payload.event, payload.action, device);
                    });
                });
            });
        });
    }
}


function parserHandler(payload) {
    const parser = payload.content;
    const userId = parser.userId.toString();
    if (parser) {
        // from parser.ts
        console.log(payload.action + ' parser ' + parser.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            send(targetClients, payload.event, payload.action, parser);
            return;
        }

        db.collection("Device").find({parserId:parser.id}).toArray((err, devices) => {
            parser.Devices = devices;
            send(targetClients, payload.event, payload.action, parser);
        });
    }
}

function geolocHandler(payload) {
    const geoloc = payload.content;
    const userId = geoloc.userId.toString();
    if (geoloc) {
        // from message.ts
        console.log(payload.action + ' geoloc ' + geoloc.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        return send(targetClients, payload.event, payload.action, geoloc);
    }
}

function alertHandler(payload) {
    const alert = payload.content;
    const userId = alert.userId.toString();
    if (alert) {
        // from alert.ts
        console.log(payload.action + ' alert ' + alert.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            send(targetClients, payload.event, payload.action, alert);
            return;
        }
        console.log(alert);
        db.collection("Connector").findOne({_id: ObjectId(alert.connectorId)}, (err, connector) => {
            alert.Connector = connector;
            db.collection("Device").findOne({_id: alert.deviceId}, (err, device) => {
                alert.Device = device;
                send(targetClients, payload.event, payload.action, alert);
            });
        });
    }
}

function beaconHandler(payload) {
    const beacon = payload.content;
    const userId = beacon.userId.toString();
    if (beacon) {
        // from alert.ts
        console.log(payload.action + ' beacon ' + beacon.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        return send(targetClients, payload.event, payload.action, beacon);
    }
}

function connectorHandler(payload) {
    const connector = payload.content;
    const userId = connector.userId.toString();
    if (connector) {
        // from alert.ts
        console.log(payload.action + ' connector ' + connector.id + ' for user ' + userId);

        let targetClients = getTargetClients(userId);
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        return send(targetClients, payload.event, payload.action, connector);
    }
}

function getTargetClients(userId) {
    let targetClients = [];
    primus.forEach(function (spark, id, connections) {
        if (spark.userId === userId) {
            targetClients.push(spark);
        }
    });
    console.log('user ' + userId + ' has ' + targetClients.length + ' client online');
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
    connectedClient--;
    console.info(connectedClient + " clients connected");
});


primus.library();
primus.save(__dirname +'/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

