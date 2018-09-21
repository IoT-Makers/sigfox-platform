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
primus.authorize(function (req, done) {
    const access_token = req.query.access_token;
    if (serverAccessTokens.includes(access_token)) {
        done();
    } else {
        db.collection("AccessToken").findOne({"_id": access_token}, (err, token) => {
            if (err || !token) return;
            done();
        })
    }
});

//
// Listen for new connections and send data
//
primus.on('connection', function connection(spark) {
    console.log('new connection');

    let OnlineClient = db.collection("OnlineClient");
    spark.on('data', function data(payload) {
        if (!payload) return;
        console.log('incoming data');
        // console.log(packet);

        // Browser client
        if (payload.frontend) {
            spark.userId = payload.frontend.userId;
            console.log('incoming user ' + spark.userId + '\n spark id ' + spark.id);
            //TODO: Authorize only userId belonging to access token
            OnlineClient.insertOne({
                createdAt: new Date(),
                userId: payload.frontend.userId,
                page: payload.frontend.page,
                sparkId: spark.id
            }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("OnlineClient registred");
                }
            });


        } else if (payload.backend) { // Backend client
            console.log('incoming message to forward');

            const pkg = payload.backend;

            if (pkg.message) {
                // from message.ts
                let Message = db.collection("Message");

                const msg = pkg.message;
                console.log(msg.id);

                Message.findOne({_id: msg.id}, (err, msg) => {
                    if (!msg) return;
                    db.collection("Geolocs").find({messageId: msg.id}).toArray((err, geolocs) => {
                        // if ()
                        msg.Geolocs = geolocs;
                        msg.Device = pkg.device;
                        const payload = {
                            payload: {
                                action: pkg.action,
                                message: msg
                            }
                        };
                        primus.forEach(function (spark, id, connections) {
                            if (spark.userId === msg.userId.toString()) {
                                spark.write(payload);
                            }
                        });
                    });
                });
            }
        }
    });
});

primus.on('data', function message(data) {
    console.log('Received a new message from the server', data);
});


primus.on('disconnection', function end(spark) {
    console.log('disconnection');
    db.collection("OnlineClient").findOneAndDelete({"sparkId": spark.id});
});


primus.library();
primus.save(__dirname +'/primus.js', function save(err) {
    if (err) throw "primus.js can not be saved";
});

