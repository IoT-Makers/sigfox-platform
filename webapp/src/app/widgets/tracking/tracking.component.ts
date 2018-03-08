import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {GeolocApi} from '../../shared/sdk/services/custom/Geoloc';
import {Device} from '../../shared/sdk/models/Device';
import {FireLoopRef, Geoloc, User} from '../../shared/sdk/models';
import {UserApi} from '../../shared/sdk/services/custom';
import {SelectComponent} from 'ng2-select';
import {Subscription} from 'rxjs/Subscription';
import {RealTime} from '../../shared/sdk/services';

import * as moment from 'moment';

@Component({
  selector: 'app-tracking',
  templateUrl: 'tracking.component.html',
  styleUrls: ['tracking.component.scss']
})

export class TrackingComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('devicesSelect') devicesSelect: SelectComponent;

  private mobile = false;

  public devices: Array<any> = [];
  private deviceSub: Subscription;
  private deviceRef: FireLoopRef<Device>;

  // Map
  private clusterStyles = [
    {
      textSize: 13,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m1.png',
      height: 37,
      width: 37
    },
    {
      textSize: 14,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m2.png',
      height: 40,
      width: 40
    },
    {
      textSize: 15,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m3.png',
      height: 53,
      width: 53
    }
  ];

  public circlePrecision = false;
  private isCircleVisible: boolean[] = [];
  public directionsRoutes = true;
  public travelMode = 'DRIVING';
  public sigfoxOnly = false;
  public gpsOnly = false;
  public gpsPrefer = true;
  public polylines = false;

  private markerInterval = 0;
  private mapPosition = {'lat': 48.86795, 'lng': 2.334070};
  private mapZoom = 3;
  private mapStyle = [{
    "featureType": "landscape",
    "stylers": [{"hue": "#FFBB00"}, {"saturation": 43.400000000000006}, {"lightness": 37.599999999999994}, {"gamma": 1}]
  }, {
    "featureType": "road.highway",
    "stylers": [{"hue": "#FFC200"}, {"saturation": -61.8}, {"lightness": 45.599999999999994}, {"gamma": 1}]
  }, {
    "featureType": "road.arterial",
    "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 51.19999999999999}, {"gamma": 1}]
  }, {
    "featureType": "road.local",
    "stylers": [{"hue": "#FF0300"}, {"saturation": -100}, {"lightness": 52}, {"gamma": 1}]
  }, {
    "featureType": "water",
    "stylers": [{"hue": "#0078FF"}, {"saturation": -13.200000000000003}, {"lightness": 2.4000000000000057}, {"gamma": 1}]
  }, {
    "featureType": "poi",
    "stylers": [{"hue": "#00FF6A"}, {"saturation": -1.0989010989011234}, {"lightness": 11.200000000000017}, {"gamma": 1}]
  }];

  // Date
  private dateBeginSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select begin date'
  };
  private dateEndSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select end date'
  };
  private dateBegin: Date = new Date();
  private dateEnd: Date = new Date();
  private searchResult = '';
  private geolocs: Geoloc[] = [];
  public directionsDisplayStore = [];

  private selectedDevice: Device = new Device();

  constructor(private rt: RealTime,
              private _googleMapsAPIWrapper: GoogleMapsAPIWrapper,
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
    this.geolocs = [];
    this.searchResult = 'Searching for geolocation messages for this device ID.';

    if (this.gpsPrefer) {
      // Get and listen devices
      this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change', {
        where: {
          and: [
            {userId: this.user.id},
            {id: this.selectedDevice.id}
          ]
        },
        limit: 1,
        include: [{
          relation: 'Geolocs',
          scope: {
            limit: 3000,
            order: 'createdAt DESC',
            where: {
              and: [
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}}
              ],
              or : [
                {type: 'GPS'},
                {type: 'sigfox'}
              ]
            }
          }
        }]
      }).subscribe((devices: Device[]) => {
        console.log(devices);
        this.geolocs = devices[0].Geolocs;
        if (this.geolocs.length > 0) {
          // Center map
          this.mapPosition = this.geolocs[this.geolocs.length - 1][0];
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;

          this.geolocs.forEach((geoloc: Geoloc, i) => {
            if (geoloc.type === 'GPS') {
              this.geolocs.forEach((g: Geoloc) => {
                if (g.messageId === geoloc.messageId && g.type === 'sigfox') {
                  this.geolocs.splice(i, 1);
                }
              });
            }
          });

        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.geolocs);
        }
      });
    } else if (this.gpsOnly) {
      // Get and listen devices
      this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change', {
        where: {
          and: [
            {userId: this.user.id},
            {id: this.selectedDevice.id}
          ]
        },
        limit: 1,
        include: [{
          relation: 'Geolocs',
          scope: {
            limit: 3000,
            order: 'createdAt DESC',
            where: {
              and: [
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}},
                {type: 'GPS'}
              ],
            }
          }
        }]
      }).subscribe((devices: Device[]) => {
        console.log(devices);
        this.geolocs = devices[0].Geolocs;
        if (this.geolocs.length > 0) {
          // Center map
          this.mapPosition = this.geolocs[this.geolocs.length - 1][0];
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.geolocs);
        }
      });
    } else if (this.sigfoxOnly) {
      // Get and listen devices
      this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change', {
        where: {
          and: [
            {userId: this.user.id},
            {id: this.selectedDevice.id}
          ]
        },
        limit: 1,
        include: [{
          relation: 'Geolocs',
          scope: {
            limit: 3000,
            order: 'createdAt DESC',
            where: {
              and: [
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}},
                {type: 'sigfox'}
              ],
            }
          }
        }]
      }).subscribe((devices: Device[]) => {
        console.log(devices);
        this.geolocs = devices[0].Geolocs;
        if (this.geolocs.length > 0) {
          // Center map
          this.mapPosition = this.geolocs[this.geolocs.length - 1][0];
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.geolocs);
        }
      });
    }

    /*
        this.geolocApi.getGeolocsByDeviceId(this.selectedDevice.id, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((messages: Message[]) => {
          if (messages.length > 0) {
            // this.searchResult = 'Found ' + messages.length + ' geoloc messages for device ID: ' + this.selectedDevice.id;
            for (let i = 0; i < messages.length; i++) {
              this.geolocs.push(messages[i]);
              i = i + this.markerInterval;
            }
            if (this.gpsPrefer) {
              this.geolocs.forEach((message, i) => {
                let hasSigfox = false;
                if (message.geoloc.length > 1) {
                  message.geoloc.forEach((geoloc, j) => {
                    if (geoloc.type === 'sigfox')
                      hasSigfox = true;
                    if (hasSigfox)
                      this.geolocs[i].geoloc.splice(j, 1);
                  });
                }
              });
            }
            if (this.gpsOnly) {
              // Message contains GPS
              this.geolocs = _.filter(this.geolocs, {geoloc: [{type: 'GPS'}]});
              // Filter others
              this.geolocs.forEach((message, i) => {
                message.geoloc.forEach((geoloc, j) => {
                  if (geoloc.type !== 'GPS') {
                    this.geolocs[i].geoloc.splice(j, 1);
                  }
                });
              });

            } else if (this.sigfoxOnly) {
              // Message contains Sigfox
              this.geolocs = _.filter(this.geolocs, {geoloc: [{type: 'sigfox'}]});
              // Filter others
              this.geolocs.forEach((message, i) => {
                message.geoloc.forEach((geoloc, j) => {
                  if (geoloc.type !== 'sigfox') {
                    this.geolocs[i].geoloc.splice(j, 1);
                  }
                });
              });
            }
            if (this.geolocs.length > 0) {
              // Center map
              this.mapPosition = this.geolocs[this.geolocs.length - 1].geoloc[0];
              this.mapZoom = 14;
              this.searchResult = 'Showing ' + this.geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
            } else
              this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;

            console.log(this.geolocs);
          } else // -- no localized messages
            this.searchResult = 'No geolocation messages found for this device ID.';
        }, (error: Error) => this.searchResult = error.message);
      */
  }

  generateColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  ngOnInit(): void {
    console.log('Tracking: ngOnInit');
    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
    this.dateBeginSettings.placeholder = moment(this.dateBegin).format('MMM-DD-YYYY hh:mm A');
    this.dateEndSettings.placeholder =  moment(this.dateEnd).format('MMM-DD-YYYY hh:mm A');

    // Get the logged in User object
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

  setCircles() {
    for (let i = 0; i < this.devices.length; i++) {
      this.isCircleVisible.push(false);
    }
  }

  markerOut(i) {
    this.isCircleVisible[i] = false;
  }

  markerOver(i) {
    this.isCircleVisible[i] = true;
  }

  getDistance(p1, p2) {
    const R = 6378137; // Earth’s mean radius in meter
    const dLat = this.rad(p2.lat() - p1.lat());
    const dLong = this.rad(p2.lng() - p1.lng());
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d; // returns the distance in meter
  }
}

