const request = require("request");
const sigfoxApiLogin = '';
const sigfoxApiPassword = '';

const credentials = Buffer.from(sigfoxApiLogin + ":" + sigfoxApiPassword).toString("base64");

getDevicetypes().then((devicetypes) => {
    console.log('------------ Got devicetypes ------------');
    devicetypes.forEach((devicetype) => {
        getCallbacks(devicetype.id).then((callbacks) => {
            console.log('------------ Got callbacks ------------');
            callbacks.data.forEach((cb) => {
                if (cb.urlPattern.includes('iotagency')) {
                    deleteCallback(devicetype.id, cb.id);
                    delete cb.id;
                    cb.contentType = 'application/json';
                    cb.httpMethod = 'POST';
                    cb.sendSni = true;
                    cb.url = cb.urlPattern.replace("https://", "https://api.");
                    delete cb.urlPattern;
                    createCallback(devicetype.id, cb).then(value => {
                        console.log('------------ Created callback DATA ------------');
                        if (cb.downlinkHook) selectDownlinkCallback(devicetype.id, value[0]);
                    });
                }
            });
            callbacks.service.forEach((cb) => {
                if (cb.urlPattern.includes('iotagency')) {
                    deleteCallback(devicetype.id, cb.id);
                    delete cb.id;
                    cb.contentType = 'application/json';
                    cb.httpMethod = 'POST';
                    cb.sendSni = true;
                    cb.url = cb.urlPattern.replace("https://", "https://api.");
                    delete cb.urlPattern;
                    createCallback(devicetype.id, cb).then(value => {
                        console.log('------------ Created callback SERVICE ------------');
                    });
                }
            });
        });
    });
});

function getDevicetypes() {
    // console.log('------------ getDevicetypes ------------');
    const options = {
        method: "GET",
        url: 'https://backend.sigfox.com/api/devicetypes',
        headers:
            {
                "cache-control": "no-cache",
                "authorization": "Basic " + credentials,
                "content-type": "application/json"
            },
        json: true
    };
    return new Promise(resolve => {
        request(options, (error, response, body) => {
            if (error) throw console.error(error);
            else resolve(response.body.data);
            // console.log('------------ END getDevicetypes ------------');
        });
    });
}

function getCallbacks(devicetypeId) {
    // console.log('------------ getCallbacks ------------');
    const options = {
        method: "POST",
        url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks',
        headers:
            {
                "cache-control": "no-cache",
                "authorization": "Basic " + credentials,
                "content-type": "application/json"
            },
        json: true
    };
    return new Promise(resolve => {
        request(options, (error, response, body) => {
            if (error) throw console.error(error);
            else resolve(response.body);
            // console.log('------------ END getCallbacks ------------');
        });
    });
}

function deleteCallback(devicetypeId, callbackId) {
    // console.log('------------ deleteCallback ------------');
    const options = {
        method: "POST",
        url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks/' + callbackId + '/delete',
        headers:
            {
                "cache-control": "no-cache",
                "authorization": "Basic " + credentials,
                "content-type": "application/json"
            },
        json: true
    };
    return new Promise(resolve => {
        request(options, (error, response, body) => {
            if (error) throw console.error(error);
            else resolve(response.body);
            // console.log('------------ END deleteCallback ------------');
        });
    });
}

function createCallback(devicetypeId, callback) {
    // console.log('------------ createCallback ------------');
    const options = {
        method: "POST",
        url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks/new',
        body: [callback],
        headers:
            {
                "cache-control": "no-cache",
                "authorization": "Basic " + credentials,
                "content-type": "application/json"
            },
        json: true
    };
    return new Promise(resolve => {
        request(options, (error, response, body) => {
            if (error) throw console.error(error);
            else resolve(response.body);
            // console.log('------------ END createCallback ------------');
        });
    });
}

function selectDownlinkCallback(devicetypeId, callbackId) {
    // console.log('------------ selectDownlinkCallback ------------');
    const options = {
        method: "POST",
        url: 'https://backend.sigfox.com/api/devicetypes/' + devicetypeId + '/callbacks/' + callbackId + '/downlink',
        headers:
            {
                "cache-control": "no-cache",
                "authorization": "Basic " + credentials,
                "content-type": "application/json"
            },
        json: true
    };
    return new Promise(resolve => {
        request(options, (error, response, body) => {
            if (error) throw console.error(error);
            else resolve(response.body);
            // console.log('------------ END selectDownlinkCallback ------------');
        });
    });
}
