import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Message} from '../../shared/sdk/models/Message';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {GeolocApi} from '../../shared/sdk/services/custom/Geoloc';
import {Device} from '../../shared/sdk/models/Device';
import {FireLoopRef} from '../../shared/sdk/models/FireLoopRef';
import {Subscription} from 'rxjs/Subscription';
import {RealTime} from '../../shared/sdk/services/core/real.time';
import * as _ from 'lodash';
import {User} from '../../shared/sdk/models';
import {UserApi} from '../../shared/sdk/services/custom';
import {SelectComponent} from "ng2-select";

@Component({
  selector: 'app-tracking',
  templateUrl: 'tracking.component.html',
  styleUrls: ['tracking.component.scss']
})

export class TrackingComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('devicesSelect') devicesSelect: SelectComponent;

  public devices: Array<any> = new Array<any>();

  public circlePrecision = false;
  public directionsRoutes = true;
  public travelMode = 'DRIVING';
  public sigfoxOnly = false;
  public gpsOnly = false;
  public gpsPrefer = true;
  public polylines = false;

  private markerInterval = 0;
  private mapPosition = {'lat': 48.86795, 'lng': 2.334070};
  private mapZoom = 3;

  private dateBegin: Date = new Date();
  private dateEnd: Date = new Date();
  private searchResult = '';
  public allLocalizedMessages: Message[] = new Array<Message>();
  public directionsDisplayStore = [];

  private selectedDevice: Device = new Device();

  constructor(private _googleMapsAPIWrapper: GoogleMapsAPIWrapper,
              private geolocApi: GeolocApi,
              private userApi: UserApi) {
  }

  deviceSelected(device: any) {
    this.selectedDevice = device;
  }

  selectedTravelMode(mode: any): void {
    this.travelMode = mode.text;
  }

  onGpsOnly(): void {
    if (this.sigfoxOnly) {
      this.sigfoxOnly = false;
      // console.log('Not allowed');
    } else if (!this.gpsOnly) {
      // console.log('Show only GPS');
    } else {
      // console.log('Show all');
      // this.onTrack();
    }
  }

  onSigfoxOnly(): void {
    if (this.gpsOnly) {
      this.gpsOnly = false;
      // console.log('Not allowed');
    }
    if (!this.sigfoxOnly) {
      // console.log('Show only Sigfox');
    } else {
      // console.log('Show all');
      // this.onTrack();
    }
  }


  onDirections(): void {
    if (!this.directionsRoutes) {
      for (const i in this.directionsDisplayStore) {
        this.directionsDisplayStore[i].setMap(null);
      }
      this.directionsDisplayStore = [];
    }
  }

  onTrack() {
    this.allLocalizedMessages = [];
    this.searchResult = 'Searching for geolocation messages for this device ID.';

    /*this.sigfoxOnly = false;
    this.gpsOnly = false;*/

    this.geolocApi.getGeolocsByDeviceId(this.selectedDevice.id, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((messages: Message[]) => {
      if (messages.length > 0) {
        // this.searchResult = 'Found ' + messages.length + ' geoloc messages for device ID: ' + this.selectedDevice.id;
        for (let i = 0; i < messages.length; i++) {
          this.allLocalizedMessages.push(messages[i]);
          i = i + this.markerInterval;
        }
        if (this.gpsPrefer) {
          this.allLocalizedMessages.forEach((message, i) => {
            let hasSigfox = false;
            if (message.geoloc.length > 1) {
              message.geoloc.forEach((geoloc, j) => {
                if (geoloc.type === 'sigfox')
                  hasSigfox = true;
                if (hasSigfox)
                  this.allLocalizedMessages[i].geoloc.splice(j, 1);
              });
            }
          });
        }
        if (this.gpsOnly) {
          // Message contains GPS
          this.allLocalizedMessages = _.filter(this.allLocalizedMessages, {geoloc: [{type: 'GPS'}]});
          // Filter others
          this.allLocalizedMessages.forEach((message, i) => {
            message.geoloc.forEach((geoloc, j) => {
              if (geoloc.type !== 'GPS') {
                this.allLocalizedMessages[i].geoloc.splice(j, 1);
              }
            });
          });

        } else if (this.sigfoxOnly) {
          // Message contains Sigfox
          this.allLocalizedMessages = _.filter(this.allLocalizedMessages, {geoloc: [{type: 'sigfox'}]});
          // Filter others
          this.allLocalizedMessages.forEach((message, i) => {
            message.geoloc.forEach((geoloc, j) => {
              if (geoloc.type !== 'sigfox') {
                this.allLocalizedMessages[i].geoloc.splice(j, 1);
              }
            });
          });
        }
        if (this.allLocalizedMessages.length > 0) {
          // Center map
          this.mapPosition = this.allLocalizedMessages[this.allLocalizedMessages.length - 1].geoloc[0];
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.allLocalizedMessages.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;

        console.log(this.allLocalizedMessages);
      } else // -- no localized messages
        this.searchResult = 'No geolocation messages found for this device ID.';
    }, (error: Error) => this.searchResult = error.message);
  }

  ngOnInit(): void {
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);

    this.user = this.userApi.getCachedCurrent();

    // Get devices
    this.userApi.getDevices(this.user.id).subscribe((devices: Device[]) => {
      devices.forEach(device => {
        const item = {
          id: device.id,
          text: device.name ? device.id + ' - ' + device.name : device.id
        };
        this.devices.push(item);
      });
      this.devicesSelect.items = this.devices;
    });
  }

  ngOnDestroy(): void {
    console.log('Tracking: ngOnDestroy');
  }

  rad(x) {
    return x * Math.PI / 180;
  }

  getDistance(p1, p2) {
    let R = 6378137; // Earth’s mean radius in meter
    let dLat = this.rad(p2.lat() - p1.lat());
    let dLong = this.rad(p2.lng() - p1.lng());
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d; // returns the distance in meter
  }
}

