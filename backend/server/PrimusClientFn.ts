const Primus = require('primus');


export class PrimusClientFn {
  public static newClient() {
    let Socket = Primus.createSocket({ transformer: 'engine.io' });
    const primusURL = process.env.PRIMUS_URL || 'http://localhost:2333';
    let primusClient = new Socket(primusURL + '?access_token=' + process.env.SERVER_ACCESS_TOKEN);

    primusClient.on('close', () => {
      console.warn('close');
    });
    return primusClient;
  }
}


