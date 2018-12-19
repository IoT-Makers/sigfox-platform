'use strict';

const log = require('loglevel');
const {send} = require('./helper');

let AdminCh;
let adminSparks = [];

exports.registerAdminListener = function connection(spark) {
        if (spark.userIsAdmin && spark.listenerInfo && spark.listenerInfo.listenTo.includes('stats')) {
            adminSparks.push(spark);
            if (AdminCh) return;
            global.RabbitConn.createChannel().then(ch => {
                AdminCh = ch;
                AdminCh.assertQueue('admin_queue', {durable:false, autoDelete: true, messageTtl: 5000}).then(function(q) {
                    AdminCh.bindQueue(q.queue, RT_EX, '#');
                    return AdminCh.consume(q.queue, adminStatsHandler, {noAck: true});
                });
            });
        }
};


exports.unregisterAdminListener = function (spark) {
    const idx = adminSparks.findIndex(x => x === spark);
    adminSparks.splice(idx, 1);
    if (adminSparks.length === 0) {
        if (!AdminCh) return;
        AdminCh.close().then(_ => {
            AdminCh = null;
        });
    }
};


function adminStatsHandler(msg) {
    if (!msg) return;
    let payload = JSON.parse(msg.content.toString());
    if (!payload) return;
    let targets = [];
    primus.forEach(function (spark, id, connections) {
        if (spark.userIsAdmin && spark.listenerInfo && spark.listenerInfo.listenTo.includes('stats'))
            targets.push(spark);
    });
    if (targets.length && payload.action !== 'UPDATE')
        return send(targets, 'stats', payload.action, payload.event);
}

