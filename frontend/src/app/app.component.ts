import {Component, OnInit} from '@angular/core';
import {setTheme} from 'ngx-bootstrap';
import {Geoloc} from './shared/sdk/models/Geoloc';
import {UserApi} from './shared/sdk/services/custom';
import {User} from './shared/sdk/models';

@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  public user: User = new User();

  constructor(private userApi: UserApi) {
    setTheme('bs4'); // or 'bs3'
  }

  ngOnInit(): void {
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    if (this.user) {
      this.setUserPosition();
      this.setUserConnected();
    }
  }

  setUserPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        const p = {
          type: 'navigator',
          createdAt: new Date(),
          location: {lat: position.coords.latitude, lng: position.coords.longitude},
          accuracy: position.coords.accuracy
        };

        this.userApi.updateAttributes(this.user.id, {position: p});
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  setUserConnected(): void {
    this.userApi.updateAttributes(this.user.id, {connected: true});
  }
}
