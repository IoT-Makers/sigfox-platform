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

        let targetClients = [];
        primus.forEach(function (spark, id, connections) {
            if (spark.userId === userId) {
                targetClients.push(spark);
            }
        });
        console.log('user ' + msg.userId + ' has ' + targetClients.length + ' client online');
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            const outgoingPayload = {
                event: "message",
                action: payload.action,
                content: msg

            };
            targetClients.forEach(function (spark) {
                spark.write(outgoingPayload);
                console.log("delete sent");
            });
            return;
        }

        db.collection("Geolocs").find({messageId: msg.id}).toArray((err, geolocs) => {
            msg.Geolocs = geolocs;
            msg.Device = payload.device;
            const outgoingPayload = {
                event: "message",
                action: payload.action,
                content: msg
            };
            targetClients.forEach(function (spark) {
                spark.write(outgoingPayload);
                console.log("sent");
            });
        });
    }
}

function deviceHandler(payload) {
    const device = payload.content;
    const userId = device.userId.toString();
    if (device) {
        // from message.ts
        console.log(payload.action + ' device ' + device.id + ' for user ' + userId);
        let targetClients = [];
        primus.forEach(function (spark, id, connections) {
            if (spark.userId === userId) {
                targetClients.push(spark);
            }
        });
        console.log('user ' + device.userId + ' has ' + targetClients.length + ' client online');
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            const outgoingPayload = {
                event: "device",
                action: payload.action,
                content: device
            };
            targetClients.forEach(function (spark) {
                spark.write(outgoingPayload);
                console.log("delete sent");
            });
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
                        const outgoingPayload = {
                            event: "device",
                            action: payload.action,
                            content: device
                        };
                        targetClients.forEach(function (spark) {
                            spark.write(outgoingPayload);
                            console.log("sent");
                        });
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
        // from message.ts
        console.log(payload.action + ' device ' + parser.id + ' for user ' + userId);


        let targetClients = [];
        primus.forEach(function (spark, id, connections) {
            if (spark.userId === userId) {
                targetClients.push(spark);
            }
        });
        console.log('user ' + userId + ' has ' + targetClients.length + ' client online');
        // if the message owner is not online, no need to look up
        if (!targetClients.length)
            return;

        if (payload.action === "DELETE") {
            const outgoingPayload = {
                event: "parser",
                action: payload.action,
                content: parser

            };
            targetClients.forEach(function (spark) {
                spark.write(outgoingPayload);
                console.log("delete sent");
            });
            return;
        }

        db.collection("Device").find({parserId:parser.id}).toArray((err, devices) => {
            parser.Devices = devices;
            const outgoingPayload = {
                event: "parser",
                action: payload.action,
                content: parser
            };
            targetClients.forEach(function (spark) {
                spark.write(outgoingPayload);
                console.log("sent");
            });
        });
    }
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

