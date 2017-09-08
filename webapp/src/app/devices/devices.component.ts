import { Component, OnInit } from '@angular/core';
import {Device} from "../shared/sdk/models/Device";
import {RealTime} from "../shared/sdk/services/core/real.time";
import {FireLoopRef} from "../shared/sdk/models/FireLoopRef";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  private devices : Device[] = new Array<Device>();
  private deviceRef : FireLoopRef<Device>;

  constructor(private rt: RealTime) {
    this.rt.onReady().subscribe(() => {
      this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceRef.on('change',
        {limit: 1000, order: 'id DESC'}
      ).subscribe((devices: Device[]) => {
        this.devices = devices;
        console.log("Devices", this.devices);
      });
    });
  }

  ngOnInit() {
  }

  add(): void {
    //this.deviceRef.create(this.device).subscribe(() => this.device = new Device());
  }
  update(device: Device): void {
    this.deviceRef.upsert(device).subscribe();
  }
  remove(device: Device): void {
    this.deviceRef.remove(device).subscribe();
  }
}
