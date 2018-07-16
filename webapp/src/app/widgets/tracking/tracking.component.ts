import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {GeolocApi} from '../../shared/sdk/services/custom/Geoloc';
import {Device} from '../../shared/sdk/models/Device';
import {FireLoopRef, Geoloc, GeoPoint, User} from '../../shared/sdk/models';
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

  public mobile = false;

  public devicesList: Array<any> = [];
  public devices: Array<Device> = [];
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

  public circleAccuracy = false;
  private isCircleVisible: boolean[] = [];
  public directionsRoutes = true;
  public clustering = true;
  public travelMode = 'DRIVING';
  public sigfoxOnly = false;
  public gpsOnly = false;
  public gpsPrefer = true;
  public polylines = false;

  public markerInterval = 0;
  public mapPosition: GeoPoint = {lat: 48.86795, lng: 2.334070};
  public mapZoom = 3;
  public mapStyle = [{
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
  public dateBeginSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select begin date'
  };
  public dateEndSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select end date'
  };
  public dateBegin: Date = new Date();
  public dateEnd: Date = new Date();
  public searchResult = '';
  public directionsDisplayStore = [];

  private selectedDevice: Device = new Device();

  constructor(private rt: RealTime,
              private _googleMapsAPIWrapper: GoogleMapsAPIWrapper,
              private geolocApi: GeolocApi,
              private userApi: UserApi) {
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
    this.userApi.getDevices(this.user.id, {order: 'updatedAt DESC'}).subscribe((devices: Device[]) => {
      devices.forEach(device => {
        const item = {
          id: device.id,
          text: device.name ? device.id + ' - ' + device.name : device.id
        };
        this.devicesList.push(item);
      });
      this.devicesSelect.items = this.devicesList;
    });

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
  }

  setup(): void {

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
    this.searchResult = 'Searching for geolocation messages for this device ID.';

    if (this.gpsOnly) {
      /*this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      // Create a Child Reference
      this.messageRef = deviceRef.make(instance).child<Message>('Messages');
      this.geolocRef = messageRef.make(instance).child<Geoloc>('Geolocs');
      this.geolocRef.on('value').subscribe((geolocs: Geoloc[]) => {
        console.log(geolocs);
      });*/
      // Get and listen devices
      const filter = {
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
            where: {
              and: [
                {type: 'gps'},
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}}
              ]
            },
            limit: 1000
          }
        }]
      };
      /*this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change', filter).subscribe((devices: Device[]) => {*/
      this.userApi.getDevices(this.user.id, filter).subscribe((devices: Device[]) => {
        console.log(devices);
        if (devices.length > 0) {
          devices.forEach((device: any) => {
            device.directionsDisplayStore = [];
          });
          this.devices = devices;
          // Center map
          this.mapPosition = this.devices[0].Geolocs[this.devices[0].Geolocs.length - 1].location;
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.devices[0].Geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.devices[0].Geolocs);
        }
      });
    }  else if (this.sigfoxOnly) {
      // Get and listen devices
      const filter = {
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
            where: {
              and: [
                {type: 'sigfox'},
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}}
              ]
            },
            limit: 1000
          }
        }]
      };
      /*this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change', filter).subscribe((devices: Device[]) => {*/
      this.userApi.getDevices(this.user.id, filter).subscribe((devices: Device[]) => {
        console.log(devices);
        if (devices.length > 0) {
          devices.forEach((device: any) => {
            device.directionsDisplayStore = [];
          });
          this.devices = devices;
          // Center map
          this.mapPosition = this.devices[0].Geolocs[this.devices[0].Geolocs.length - 1].location;
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.devices[0].Geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.devices[0].Geolocs);
        }
      });
    } else if (this.gpsPrefer) {
      // Get and listen devices
      const filter = {
        where: {
          and: [
            {userId: this.user.id},
            {id: this.selectedDevice.id}
          ]
        },
        limit: 1,
        include: [
          {
            relation: 'Messages',
            order: 'createdAt DESC',
            scope: {
              limit: 1000,
              fields: ['id'],
              order: 'createdAt DESC',
              where: {
                and: [
                  {createdAt: {gte: this.dateBegin.toISOString()}},
                  {createdAt: {lte: this.dateEnd.toISOString()}}
                ]
              },
              include: [{
                relation: 'Geolocs',
                scope: {
                  limit: 5
                }
              }]
            }
          }]
      };
      this.userApi.getDevices(this.user.id, filter).subscribe((devices: Device[]) => {
        console.log(devices);
        if (devices.length > 0) {
          devices.forEach((device: any) => {
            device.directionsDisplayStore = [];
            device.Geolocs = [];
            device.Messages.forEach((message: any) => {
              message.Geolocs.forEach((geoloc: Geoloc, i) => {
                device.Geolocs.push(geoloc);
                if (message.Geolocs.length > 1) {
                  message.Geolocs.forEach((g: Geoloc) => {
                    if (g.messageId === geoloc.messageId && g.type === 'sigfox') {
                      device.Geolocs.splice(g, 1);
                    }
                  });
                }
              });
            });
          });
          this.devices = devices;
          // Center map
          this.mapPosition = this.devices[0].Geolocs[this.devices[0].Geolocs.length - 1].location;
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.devices[0].Geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.devices[0].Geolocs);
        }
      });
    } else {
      // Get and listen devices
      const filter = {
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
            where: {
              and: [
                {createdAt: {gte: this.dateBegin.toISOString()}},
                {createdAt: {lte: this.dateEnd.toISOString()}}
              ]
            },
            limit: 1000
          }
        }]
      };
      this.userApi.getDevices(this.user.id, filter).subscribe((devices: Device[]) => {
        console.log(devices);
        if (devices.length > 0) {
          devices.forEach((device: any) => {
            device.directionsDisplayStore = [];
          });
          this.devices = devices;
          // Center map
          this.mapPosition = this.devices[0].Geolocs[this.devices[0].Geolocs.length - 1].location;
          this.mapZoom = 14;
          this.searchResult = 'Showing ' + this.devices[0].Geolocs.length + ' markers for device ID: ' + this.selectedDevice.id;
        } else {
          this.searchResult = 'No markers to show with these filters for device ID: ' + this.selectedDevice.id;
          console.log(this.devices[0].Geolocs);
        }
      });
    }
  }

  generateColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
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

