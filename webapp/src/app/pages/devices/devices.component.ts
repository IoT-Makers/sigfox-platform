import { Component, OnInit } from '@angular/core';

import { Device, Parser, Category, FireLoopRef } from '../../shared/sdk/models';
import { RealTime, DeviceApi } from '../../shared/sdk/services';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {

  private device: Device = new Device();
  private deviceToEdit: Device = new Device();
  private devices: Device[] = new Array<Device>();
  private deviceRef: FireLoopRef<Device>;
  private countDevices: number = 0;

  private parser: Parser = new Parser();
  private parsers: Parser[] = new Array<Parser>();
  private parserRef: FireLoopRef<Parser>;

  private category: Category = new Category();
  private categories: Category[] = new Array<Category>();
  private categoryRef: FireLoopRef<Category>;

  private edit: boolean = false;

  private lat: number = 48.86795;
  private lng: number = 2.334070;


  constructor(private rt: RealTime, private deviceApi: DeviceApi) {

    this.rt.onReady().subscribe(() => {

      //Get and listen devices
      this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceRef.on('change',
        {limit: 1000, order: 'updatedAt DESC', include: ['Parser', 'Category']}
      ).subscribe((devices: Device[]) => {
        this.devices = devices;
        console.log(this.devices);
      });

      //Get and parsers
      this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
      this.parserRef.on('change'
      ).subscribe((parsers: Parser[]) => {
        this.parsers = parsers;
        console.log(this.parsers);
      });

      //Get and categories
      this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
      this.categoryRef.on('change'
      ).subscribe((categories: Category[]) => {
        this.categories = categories;
        console.log(this.categories);
      });



    });
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

