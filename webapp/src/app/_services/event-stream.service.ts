import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieBrowser} from '../shared/sdk';
import {DOCUMENT} from '@angular/common';

declare var EventSourcePolyfill: any;

@Injectable()
export class EventStreamService {

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

  public createMessagesChangeStream() {
    const urlToChangeStream = this.apiUrl + '/Messages/change-stream?_format=event-stream&access_token=' + this.accessToken;
    if (typeof(EventSource) !== 'undefined') {
      return new EventSource(urlToChangeStream);
    } else {
      return new EventSourcePolyfill(urlToChangeStream);
    }
  }
}
