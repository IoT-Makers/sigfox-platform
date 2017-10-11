import { Component, OnInit } from '@angular/core';

import { Device, FireLoopRef } from '../../shared/sdk/models';
import { RealTime, DeviceApi } from '../../shared/sdk/services';
import {Message} from "../../shared/sdk/models/Message";


@Component({
  selector: 'app-devices',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  private device: Device = new Device();
  private deviceToEdit: Device = new Device();
  private devices: Device[] = new Array<Device>();
  private deviceRef: FireLoopRef<Device>;
  private countDevices: number = 0;

  private edit: boolean = false;

  private lat: number = 48.86795;
  private lng: number = 2.334070;

  private searchResult: String = '';

  private geoloc_sigfoxMessages: Message[] = new Array<Message>();
  private GPSMessages: Message[] = new Array<Message>()

  constructor(private rt: RealTime, private deviceApi: DeviceApi) {

    this.rt.onReady().subscribe(() => {

      /* //Get and listen devices
       this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
       this.deviceRef.on('change',
         {limit: 1000, order: 'updatedAt DESC', include: ['Parser', 'Category']}
       ).subscribe((devices: Device[]) => {
         this.devices = devices;
         console.log(this.devices);
       });*/
    });
  }

  onTrack(deviceId: string) {
    this.geoloc_sigfoxMessages = [];
    this.GPSMessages = [];
    this.searchResult = "Searching for geolocation messages for this device ID.";

    this.deviceApi.getMessages(deviceId, {where: {geoloc_sigfox: {neq: null}}}).subscribe((messages: Message[]) => {
      if(messages.length > 0){
        this.searchResult = "Found " + messages.length + " geoloc_sigfox messages for this device ID.";
        this.geoloc_sigfoxMessages = messages;
      }

      this.deviceApi.getMessages(deviceId,{where: {GPS: {neq: null}}}).subscribe((messages: Message[]) => {
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
    this.edit = false;
  }

  editDevice(device): void{
    this.edit = true;
    this.deviceToEdit = device;
  }

  update(device: Device): void {
    this.edit = false;
    this.deviceRef.upsert(device).subscribe();
  }


  cancel(): void{
    this.edit = false;
  }

}

