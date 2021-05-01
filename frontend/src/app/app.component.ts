import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { UserApi } from './shared/sdk/services/custom';
import { User } from './shared/sdk/models';
import { RealtimeService } from './shared/realtime/realtime.service';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  public user: User = new User();

  constructor(
    private userApi: UserApi,
    private rt: RealtimeService,
    private router: Router,
    private angulartics: Angulartics2GoogleGlobalSiteTag
  ) {
    setTheme('bs4'); // or 'bs3'
    //angulartics.startTracking();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) =>
        this.angulartics.pageTrack(event.urlAfterRedirects)
      );
  }

  ngOnInit(): void {
    // Get the logged in user
    this.user = this.userApi.getCachedCurrent();
    if (this.user) this.setUserPosition();
    const accessToken = this.userApi.getCurrentToken().id;
    // Create the real-time connection
    if (accessToken) this.rt.connect(accessToken);
  }

  setUserPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const p = {
          type: 'navigator',
          createdAt: new Date(),
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          accuracy: position.coords.accuracy
        };

        this.userApi.updateAttributes(this.user.id, { position: p });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
