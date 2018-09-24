import {environment} from "../../../../environments/environment";
import {Injectable, Optional} from '@angular/core';

import {OrganizationApi, ReceptionApi, UserApi} from "../sdk/services/index";


export class RealtimeServiceConfig {
  public primusURL: string
}


@Injectable({
  providedIn: 'root',
})
export class RealtimeService {

  private primusClient: any;
  private readonly primusURL: string;


  public constructor(@Optional() config: RealtimeServiceConfig) {
    this.primusURL = config.primusURL;
  }


  public connect(accessToken: string) {
    if (this.primusClient)
      this.primusClient.end();
    this.primusClient = new Primus(this.primusURL + "?access_token=" + accessToken,
      {
        transformer: 'engine.io',
        reconnect: {
          max: Infinity // Number: The max delay before we try to reconnect.
          , min: 500 // Number: The minimum delay before we try reconnect.
          , retries: 5 // Number: How many times we should try to reconnect.
        }
      });
    this.primusClient.on('error', function error(err) {
      console.error('Something horrible has happened', err.stack);
    });
    // this.primusClient.on('open', () => {
    //   console.log('Messages: connected!!');
    //   this.primusClient.write({
    //     "frontend" : {
    //       "userId": this.user.id,
    //       "page": "message"
    //     }
    //   })
    // });
  }


  public addListener(listener: (data:any)=>void): void {
    this.primusClient.on('data', (data) => {
      listener(data);
    });
  }
}

