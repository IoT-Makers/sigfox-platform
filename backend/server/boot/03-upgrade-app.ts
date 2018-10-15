/**
 * This bootscript is used to upgrade the application during boot-up!
 * @param app
 */

const request = require("request");
const sigfoxApiLogin = '';
const sigfoxApiPassword = '';
const credentials = Buffer.from(sigfoxApiLogin + ":" + sigfoxApiPassword).toString("base64");
const upgradeApp = false;

module.exports = (app: any) => {
  if (upgradeApp) {
    getDevicetypes().then((devicetypes: any) => {
      devicetypes.forEach((devicetype: any) => {
        getCallbacks(devicetype.id).then((callbacks: any) => {
          callbacks.data.forEach((cb: any) => {
            if (cb.urlPattern.includes('iotagency')) {
              deleteCallback(devicetype.id, cb.id);
              delete cb.id;
              cb.contentType = 'application/json';
              cb.httpMethod = 'POST';
              cb.url = cb.urlPattern.replace("https://", "https://api.");
              delete cb.urlPattern;
              createCallback(devicetype.id, cb);
            }
          });
          callbacks.service.forEach((cb: any) => {
            if (cb.urlPattern.includes('iotagency')) {
              deleteCallback(devicetype.id, cb.id);
              delete cb.id;
              cb.contentType = 'application/json';
              cb.httpMethod = 'POST';
              cb.url = cb.urlPattern.replace("https://", "https://api.");
              delete cb.urlPattern;
              createCallback(devicetype.id, cb);
            }
          });
        });
      });
    });
  }

  function getDevicetypes(): Promise<any> {
    console.log('------------ getDevicetypes ------------');
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
      request(options, (error: any, response: any, body: any) => {
        if (error) throw console.error(error);
        else resolve(response.body.data);
        console.log('------------ END getDevicetypes ------------');
      });
    });
  }

  function getCallbacks(devicetypeId: string): Promise<any> {
    console.log('------------ getCallbacks ------------');
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
      request(options, (error: any, response: any, body: any) => {
        if (error) throw console.error(error);
        else resolve(response.body);
        console.log('------------ END getCallbacks ------------');
      });
    });
  }

  function deleteCallback(devicetypeId: string, callbackId: string): Promise<any> {
    console.log('------------ deleteCallback ------------');
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
      request(options, (error: any, response: any, body: any) => {
        if (error) throw console.error(error);
        else resolve(response.body);
        console.log('------------ END deleteCallback ------------');
      });
    });
  }

  function createCallback(devicetypeId: string, callback: any): Promise<any> {
    console.log('------------ createCallback ------------');
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
      request(options, (error: any, response: any, body: any) => {
        if (error) throw console.error(error);
        else resolve(response.body);
        console.log('------------ END createCallback ------------');
      });
    });
  }
};
