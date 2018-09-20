'use strict';

const Primus = require('primus');
const MongoClient = require('mongodb').MongoClient;
const mongodbUrl = process.env.MONGO_URL;
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
    let access_token = req.query.access_token;
    db.collection("AccessToken").findOne({"_id": access_token}, (err, token) => {
        if (err || !token) return;
        done();
    })
});

//
// Listen for new connections and send data
//
primus.on('connection', function connection(spark) {
    console.log('new connection');

    spark.on('data', function data(packet) {
        if (!packet) return;
        console.log('incoming data');
        // console.log(packet);

        // Browser client
        if (packet.frontend) {
            console.log('incoming user ' + spark.id);

            //TODO: Authorize only userId belonging to access token
            db.collection("OnlineClient").insertOne({
                createdAt: new Date(),
                userId: packet.frontend.userId,
                page: packet.frontend.page,
                sparkId: spark.id
            }, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("OK");
                }
            });


        } else if (packet.backend) { // Backend client
            console.log('incoming message to forward');

            let pkg = packet.backend;
            let spark = primus.spark(pkg.target_spark);
            if (spark)
                spark.write(pkg.message);
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

// server = http.createServer(function server(req, res) {
//     res.setHeader('Content-Type', 'text/html');
//     fs.createReadStream(
//         __dirname + (~req.url.indexOf('primus.js') ? '/primus.js' : '/index.html')
//     ).pipe(res);
// });

// server.listen(2334);