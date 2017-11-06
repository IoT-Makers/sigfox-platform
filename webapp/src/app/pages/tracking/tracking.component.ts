import {AfterViewInit, Component, Directive, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {DeviceApi} from '../../shared/sdk/services';
import {Message} from "../../shared/sdk/models/Message";
import {AgmCoreModule, AgmMap, GoogleMapsAPIWrapper} from "@agm/core";

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  private initMapPosition = {"lat": 48.86795, "lng": 2.334070};

  private geoloc_sigfoxMarkers: Boolean = true;
  private GPSMarkers: Boolean = true;

  private dateBegin: Date = new Date(Date.now());
  private dateEnd: Date = new Date(Date.now());
  private searchResult: String = '';
  public allLocalizedMessages: Message[] = new Array<Message>();
  public directionsDisplayStore = [];

  constructor(private elRef: ElementRef, private _googleMapsAPIWrapper: GoogleMapsAPIWrapper, private deviceApi: DeviceApi) {
  }

  onTrack(deviceId: string) {
    /*    dateBegin = new Date('2017-09-19T21:30:00.000Z');
        dateEnd = new Date('2017-09-20T02:45:00.000Z');*/
    this.allLocalizedMessages = [];
    this.searchResult = "Searching for geolocation messages for this device ID.";

    this.deviceApi.getMessages(deviceId, {where: {and: [{createdAt: {gte: this.dateBegin}}, {createdAt: {lte: this.dateEnd}}], or: [{geoloc: {neq: null}}]}, fields: ["geoloc", "createdAt"]}).subscribe((messages: Message[]) => {
      if (messages.length > 0) {
        this.searchResult = "Found " + messages.length + " geoloc messages for device ID: " + deviceId;
        this.allLocalizedMessages = messages;
        // Center map
        let latestGeoloc = messages[0].geoloc;
        this.initMapPosition = latestGeoloc[0];
        console.log(messages);
        // DEBUG
        /*console.log("initMapPosition");
        console.log(this.initMapPosition);
        console.log("allLocalizedMessages");
        console.log(this.allLocalizedMessages);*/

      } else // -- no localized messages
        this.searchResult = "No geolocation messages found for this device ID.";
    }, (error: Error) => this.searchResult = error.message);
  }

  ngOnInit(): void {
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
  }

  rad(x) {
    return x * Math.PI / 180;
  };

  getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = this.rad(p2.lat() - p1.lat());
    var dLong = this.rad(p2.lng() - p1.lng());
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.rad(p1.lat())) * Math.cos(this.rad(p2.lat())) *
      Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter
  };
}

