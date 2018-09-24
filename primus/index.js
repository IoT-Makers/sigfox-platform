'use strict';

const Primus = require('primus');
const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = process.env.MONGO_URL;
const serverAccessTokens = process.env.SERVER_ACCESS_TOKENS.split(' ');
let db;

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

    // manual auth hook, attach userId to spark if access token found
    const access_token = spark.request.query.access_token;
    let AccessToken = db.collection("AccessToken");
    if (!serverAccessTokens.includes(access_token)) {
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
            default:
                break;
        }
    });
});


function messageHandler(payload) {
    const msg = payload.content;
    if (msg) {
        // from message.ts
        console.log(payload.action + ' message ' + msg.id + ' for user ' + msg.userId);

        let Message = db.collection("Message");

        let targetClients = [];
        primus.forEach(function (spark, id, connections) {
            if (spark.userId === msg.userId.toString()) {
                targetClients.push(spark);
            }
        });
        console.log('user ' + msg.userId + 'has ' + targetClients.length + ' client online');
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

        Message.findOne({_id: msg.id}, (err, msg) => {
            if (!msg) return;
            msg.id = msg._id;
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
        });
    }
}



primus.on('disconnection', function end(spark) {
    console.log('disconnection');
    db.collection("OnlineClient").findOneAndDelete({"sparkId": spark.id});
});


primus.library();
primus.save(__dirname +'/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

