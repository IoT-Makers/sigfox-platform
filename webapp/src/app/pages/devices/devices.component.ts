import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Device} from "../../shared/sdk/models/Device";
import {RealTime} from "../../shared/sdk/services/core/real.time";
import {FireLoopRef} from "../../shared/sdk/models/FireLoopRef";
import {Subscription} from "rxjs/Subscription";
import {forEach} from "@angular/router/src/utils/collection";
import {Parser} from "../../shared/sdk/models/Parser";
import {DeviceApi} from "../../shared/sdk/services/custom/Device";
import {ParserApi} from "../../shared/sdk/services/custom/Parser";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit,OnDestroy {

  private subscriptions: Subscription[] = new Array<Subscription>();
  editRowId: any;

  private devices : Device[] = new Array<Device>();
  private deviceRef : FireLoopRef<Device>;
  private callbackURL;

  constructor(private rt: RealTime, private parserApi: ParserApi, private deviceApi: DeviceApi) {

    this.subscriptions.push(

      this.rt.onReady().subscribe(() => {
        this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
        this.deviceRef.on('change',
          {limit: 1000, order: 'createdAt DESC'}
        ).subscribe((devices: Device[]) => {
          devices.forEach(device => {
            console.log(device.ParserId);

           /* this.parserApi.findById(device.ParserId).subscribe(response => {
              console.log(response);
            });*/

            /***
             * TODO: Check if 'include' is a better choice in the request!
             */

            this.deviceApi.getParser(device.id).subscribe(response => {
              console.log(response);
              device.Parser = response;
            });



          });
          this.devices = devices;
          console.log("Devices", this.devices);
        });

      }));
  }

  ngOnInit() {
  }

  toggle(id){
    this.editRowId = id;
  }

  add(): void {
    //this.deviceRef.create(this.device).subscribe(() => this.device = new Device());
  }
  update(device: Device): void {
    this.deviceRef.upsert(device).subscribe();
    this.editRowId = 0;
  }
  remove(device: Device): void {
    this.deviceRef.remove(device).subscribe();
  }

  ngOnDestroy(): void {
    console.log("Devices: ngOnDestroy");
    this.deviceRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
