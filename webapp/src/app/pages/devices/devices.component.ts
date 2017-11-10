import { Component, OnInit } from '@angular/core';

import { Device, Parser, Category, User, FireLoopRef } from '../../shared/sdk/models';
import { RealTime, DeviceApi, CategoryApi, UserApi } from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";
import {Message} from "../../shared/sdk/models/Message";


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit {


  private isCircleVisible: boolean[] = new Array<boolean>();

  private message: Message = new Message();
  private device: Device = new Device();
  private parser: Parser = new Parser();
  private category: Category = new Category();

  private messageSub: Subscription;
  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;


  private messages: Message[] = new Array<Message>();
  private devices: Device[] = new Array<Device>();
  private parsers: Parser[] = new Array<Parser>();
  private categories: Category[] = new Array<Category>();

  private countMessages: number = 0;
  private countDevices: number = 0;
  private countParsers: number = 0;
  private countCategories: number = 0;

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private deviceToEdit: Device = new Device();

  private edit: boolean = false;

  private lat: number = 48.858093;
  private lng: number = 2.294694;
  private zoom: number = 2;


  constructor(private rt: RealTime, private categoryApi: CategoryApi) { }

  ngOnInit(): void {
    this.edit = false;
    // Hide all circles by default
    this.setCircles();

    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }
  }

  setCircles(){
    for(let i=0; i<this.devices.length; i++){
      this.isCircleVisible.push(false);
    }
  }

  markerOut(i) {
    this.isCircleVisible[i] = false;
  }

  markerOver(i) {
    this.isCircleVisible[i] = true;
  }

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();//Get and listen devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceSub = this.deviceRef.on('change',
      {limit: 1000, order: 'updatedAt DESC', include: ['Parser', 'Category']}
    ).subscribe((devices: Device[]) => {
      this.devices = devices;
      console.log(this.devices);
    });

    // Get and listen parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserSub = this.parserRef.on('change').subscribe((parsers: Parser[]) => {
      this.parsers = parsers;
      console.log(this.parsers);
    });

    // Get and listen categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change'
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });

  }

  ngOnDestroy(): void {
    console.log("Devices: ngOnDestroy");
    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();

    if (this.parserRef)this.parserRef.dispose();
    if (this.parserSub)this.parserSub.unsubscribe();

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }

  editDevice(device): void{
    this.edit = true;
    this.deviceToEdit = device;
  }

  update(device: Device): void {
    this.edit = false;
    console.log(device.ParserId);
    /*if(device.ParserId.toString() == "None")*/

    this.deviceRef.upsert(device).subscribe();
  }

  updateDeviceProperties(device: Device): void {
    console.log(device.CategoryId);
    if(device.CategoryId){
      this.categoryApi.findById(device.CategoryId).subscribe((category: Category) => {
        console.log(category);
        this.deviceToEdit.properties = category.properties;
      });
    }

    console.log(device);
    //this.deviceRef.upsert(device).subscribe();
  }

  zoomOnDevice(lat:number, lng:number): void {
    this.lat=lat;
    this.lng=lng;
    this.zoom=12;
  }

  cancel(): void{
    this.edit = false;
  }

  remove(device: Device): void {
    this.deviceRef.remove(device).subscribe();
  }

}

