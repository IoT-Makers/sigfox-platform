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

  private geoloc_sigfoxMarkers = new Array<Message>();
  private GPSMarkers = new Array<Message>();

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
    this.geoloc_sigfoxMarkers = [];
    this.GPSMarkers = [];
    this.deviceApi.getMessages(deviceId).subscribe((messages: Message[]) => {
      messages.forEach(message => {
        if (message.hasOwnProperty("geoloc_sigfox")) {
          //console.log(message.GPS || message.geoloc_sigfox);
          this.geoloc_sigfoxMarkers.push(message);
          this.searchResult = "Found geoloc_sigfox messages for this device ID."
        }
        if (message.hasOwnProperty("GPS")){
          this.GPSMarkers.push(message);
          this.searchResult = "Found GPS messages for this device ID."
        } else {
          this.searchResult = "No geolocation for this device ID."
        };
      });

    });
    this.searchResult = "No messages found for this device ID."
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

