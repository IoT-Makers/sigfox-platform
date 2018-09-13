import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieBrowser} from '../shared/sdk';
import {DOCUMENT} from '@angular/common';

@Injectable()
export class ExampleService {

  protected accessToken: string;
  protected apiUrl: string;

  constructor(
    @Inject(DOCUMENT) private document: any,
    public http: HttpClient,
    public cookieBrowser: CookieBrowser,
  ) {
    this.apiUrl = this.document.location.origin + '/api';
    if (this.apiUrl.startsWith('http://localhost', 0) === true) {
      this.apiUrl = 'http://localhost:3000/api';
    }
    this.accessToken = this.cookieBrowser.get('$LoopBackSDK$id');
  }

  public getMessagesStats(range: string) {
    return this.http.get(this.apiUrl + '/Messages/stats', {
      params: {
        range: range,
        access_token: this.accessToken
      }
    });
  }

  public getMessagesStatsByDevice(range: string, deviceId: string) {
    return this.http.get(this.apiUrl + '/Messages/stats', {
      params: {
        range: range,
        where: JSON.stringify({deviceId: deviceId}),
        access_token: this.accessToken
      }
    });
  }
}
