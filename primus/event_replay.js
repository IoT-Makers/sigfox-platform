const mongolib = require('mongodb');
const MongoClient = mongolib.MongoClient;
const mongodbUrl = process.env.MONGO_URL;
const rabbitUrl = process.env.RABBIT_URL || 'amqp://usr:pwd@localhost';
const amqp = require('amqplib/callback_api');

let db;


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
    console.log("replay connected to Mongo");

    start_replay();
});

let channel;
const ex = 'realtime_exchange';
amqp.connect(rabbitUrl, function (err, conn) {
    conn.createChannel(function (err, ch) {
        if (err) {
            console.error("RABBIT_URL not set on Primus");
            throw err;
        }
        ch.assertExchange(ex, 'fanout', {durable: true}, (err, ok) => {
            if (err) throw(err);
            channel = ch;
        });
    });
});

const START_DATE = new Date("2018-10-24 08:00:00").getTime();
const END_DATE = new Date("2018-10-25 22:00:00").getTime();
console.log(START_DATE);
console.log(END_DATE);
const interval = 2 * 60 * 1000;
var current = START_DATE;

function intervalFunc() {
    console.log("fetch");
    let next = current + interval;
    if (current >= END_DATE) process.exit(0);

    const Geoloc = db.collection("Geoloc");

    console.log(current);
    console.log(next);

    Geoloc.find({createdAt: {$gte: new Date(current), $lt: new Date(next)}}).toArray((err, geolocs) => {
        geolocs.forEach(function (geoloc) {
            const payload = {
                event: "geoloc",
                content: geoloc,
                action: "CREATE"
            };
            console.log(payload);
            channel.publish(ex, 'rt', Buffer.from(JSON.stringify(payload), 'utf8'));
        });
    });

    current = next;
}

function start_replay() {
    setInterval(intervalFunc, 1000);
}
