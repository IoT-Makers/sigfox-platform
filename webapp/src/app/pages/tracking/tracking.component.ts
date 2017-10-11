import {Component, OnInit} from '@angular/core';

import {DeviceApi, RealTime} from '../../shared/sdk/services';
import {Message} from "../../shared/sdk/models/Message";


@Component({
  selector: 'app-devices',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  private lat: number = 48.86795;
  private lng: number = 2.334070;

  private dateBegin: Date;
  private dateEnd: Date;

  private searchResult: String = '';

  private geoloc_sigfoxMessages: Message[] = new Array<Message>();
  private GPSMessages: Message[] = new Array<Message>()

  constructor(private rt: RealTime, private deviceApi: DeviceApi) {

  }

  onTrack(deviceId: string, dateBegin: Date, dateEnd: Date) {
    /*    dateBegin = new Date('2017-09-19T21:30:00.000Z');
        dateEnd = new Date('2017-09-20T02:45:00.000Z');*/

    this.geoloc_sigfoxMessages = [];
    this.GPSMessages = [];
    this.searchResult = "Searching for geolocation messages for this device ID.";

    this.deviceApi.getMessages(deviceId, {where: {and: [{createdAt: {gt: dateBegin}}, {createdAt: {lte: dateEnd}}], geoloc_sigfox: {neq: null}}, fields: ["geoloc_sigfox","createdAt"]}).subscribe((messages: Message[]) => {
      if(messages.length > 0){
        this.searchResult = "Found " + messages.length + " geoloc_sigfox messages for this device ID.";
        this.geoloc_sigfoxMessages = messages;
      }

      this.deviceApi.getMessages(deviceId,{where: {and: [{createdAt: {gte: dateBegin}}, {createdAt: {lte: dateEnd}}], GPS: {neq: null}}, fields: ["GPS","createdAt"]}).subscribe((messages: Message[]) => {
        console.log(messages);
        if(messages.length > 0){
          this.searchResult = "Found " + messages.length + " GPS messages for this device ID.";
          this.GPSMessages = messages;
        }

        if(this.geoloc_sigfoxMessages.length == 0 && this.GPSMessages.length == 0)
          this.searchResult = "No geolocation messages found for this device ID.";
      });
    }, (error: Error) => this.searchResult = error.message);
  }

  ngOnInit(): void {
    this.dateEnd = new Date(Date.now());
    this.dateBegin = new Date(Date.now());
    this.dateBegin.setFullYear(this.dateBegin.getFullYear() - 1);
  }

}

