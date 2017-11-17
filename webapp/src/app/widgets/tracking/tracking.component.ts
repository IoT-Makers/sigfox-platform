import {Component, ElementRef, OnInit} from '@angular/core';

import {DeviceApi} from '../../shared/sdk/services';
import {Message} from "../../shared/sdk/models/Message";
import {GoogleMapsAPIWrapper} from "@agm/core";
import {GeolocApi} from "../../shared/sdk/services/custom/Geoloc";

@Component({
  selector: 'app-tracking',
  templateUrl: 'tracking.component.html',
  styleUrls: ['tracking.component.scss']
})

export class TrackingComponent implements OnInit {

  public circlePrecision: boolean = false;
  public directionsRoutes: boolean = true;

  private markerInterval: number = 1;
  private initMapPosition = {"lat": 48.86795, "lng": 2.334070};

  private geoloc_sigfoxMarkers: Boolean = true;
  private GPSMarkers: Boolean = true;

  private dateBegin: Date = new Date(Date.now());
  private dateEnd: Date = new Date(Date.now());
  private searchResult: String = '';
  public allLocalizedMessages: Message[] = new Array<Message>();
  public directionsDisplayStore = [];

  constructor(private elRef: ElementRef,
              private _googleMapsAPIWrapper: GoogleMapsAPIWrapper,
              private deviceApi: DeviceApi,
              private geolocApi: GeolocApi) {
  }

  onDirections(){
    if(!this.directionsRoutes){
      for(let i in this.directionsDisplayStore) {
        this.directionsDisplayStore[i].setMap(null);
      }
      this.directionsDisplayStore = [];
    }
  }

  onTrack(deviceId: string) {
    this.allLocalizedMessages = [];
    this.searchResult = "Searching for geolocation messages for this device ID.";

    this.geolocApi.getGeolocsByDeviceId(deviceId, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((messages: Message[]) => {
      if (messages.length > 0) {
        this.searchResult = "Found " + messages.length + " geoloc messages for device ID: " + deviceId;
        for(let i=0; i<messages.length; i++){
          this.allLocalizedMessages.push(messages[i]);
          i = i + this.markerInterval;
        }
        // Center map
        let latestGeoloc = messages[0].geoloc;
        this.initMapPosition = latestGeoloc[0];

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

