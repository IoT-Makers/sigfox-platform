import {Component, ElementRef, OnInit} from '@angular/core';

import {DeviceApi} from '../../shared/sdk/services';
import {Message} from "../../shared/sdk/models/Message";
import {GoogleMapsAPIWrapper} from "@agm/core";
import {GeolocApi} from "../../shared/sdk/services/custom/Geoloc";
import {Device} from "../../shared/sdk/models/Device";
import {FireLoopRef} from "../../shared/sdk/models/FireLoopRef";
import {Subscription} from "rxjs/Subscription";
import {RealTime} from "../../shared/sdk/services/core/real.time";

@Component({
  selector: 'app-tracking',
  templateUrl: 'tracking.component.html',
  styleUrls: ['tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  private deviceSub: Subscription;
  private deviceRef: FireLoopRef<Device>;

  private devices: Device[] = new Array<Device>();

  public circlePrecision = false;
  public directionsRoutes = true;

  private markerInterval = 1;
  private initMapPosition = {'lat': 48.86795, 'lng': 2.334070};

  private dateBegin: Date = new Date(Date.now());
  private dateEnd: Date = new Date(Date.now());
  private searchResult = '';
  public allLocalizedMessages: Message[] = new Array<Message>();
  public directionsDisplayStore = [];

  private selectedDevice: Device = new Device();

  constructor(private _googleMapsAPIWrapper: GoogleMapsAPIWrapper,
              private geolocApi: GeolocApi,
              private rt: RealTime) {
  }

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {limit: 100, order: 'updatedAt DESC', include: ['Category', 'Messages']}).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        console.log('Devices', this.devices);
      });

    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
  }


  onDirections(){
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

    this.geolocApi.getGeolocsByDeviceId(this.selectedDevice.id, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((messages: Message[]) => {
      if (messages.length > 0) {
        this.searchResult = 'Found ' + messages.length + ' geoloc messages for device ID: ' + this.selectedDevice.id;
        for (let i = 0; i < messages.length; i++) {
          this.allLocalizedMessages.push(messages[i]);
          i = i + this.markerInterval;
        }
        // Center map
        const latestGeoloc = messages[0].geoloc;
        this.initMapPosition = latestGeoloc[0];

      } else // -- no localized messages
        this.searchResult = 'No geolocation messages found for this device ID.';
    }, (error: Error) => this.searchResult = error.message);
  }

  ngOnInit(): void {
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }
  }

  ngOnDestroy(): void {
    console.log('Tracking: ngOnDestroy');

    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();
  }

  rad(x) {
    return x * Math.PI / 180;
  };

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
  };
}

