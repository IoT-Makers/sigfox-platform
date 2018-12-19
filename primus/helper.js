'use strict';
const log = require('loglevel');

exports.addAttribute = function addAttribute(obj, attName, attValue) {
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
};

// returns 2 groups of spark: clients needing detailed event (listenTo) and countOnly
exports.getTargetClients = function getTargetClients(userId, event='', orgIDs=null) {
    let complete=[], countOnly=[];
    primus.forEach(function (spark, id, connections) {
        const listenerInfo = spark.listenerInfo;
        if (!listenerInfo) return; // return === continue
        // log.error(listenerInfo.listenTo);

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
    log.debug(`[${event}] ${complete.length} users needs detail, ${countOnly.length} users needs only count`);
    return {complete: complete, countOnly: countOnly};
};

exports.send = function send(targetClients, eventName, action, content) {
    const outgoingPayload = {
        event: eventName,
        action: action,
        content: content
    };
    targetClients.forEach(function (spark) {
        spark.write(outgoingPayload);
        log.log(action + " sent " + spark.userId);
    });
};
