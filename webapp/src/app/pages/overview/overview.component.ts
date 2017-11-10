import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
// import { Router } from '@angular/router';
import {Message, Device, Category, Parser, User, Organization, FireLoopRef} from '../../shared/sdk/models';
import {
  RealTime,
  MessageApi,
  DeviceApi,
  CategoryApi,
  ParserApi,
  UserApi,
  OrganizationApi
} from '../../shared/sdk/services';

import {Subscription} from "rxjs/Subscription";
import {DOCUMENT} from "@angular/common";
import {FullLayoutComponent} from "../../layouts/full-layout.component";


@Component({
  templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit,OnDestroy {

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

  public data = [];

  private isCircleVisible: boolean[] = new Array<boolean>();

  private lat: number = 48.858093;
  private lng: number = 2.294694;
  private zoom: number = 2;

  private edit: boolean = false;

  constructor(private rt: RealTime,
              private messageApi: MessageApi,
              private deviceApi: DeviceApi,
              private parserApi: ParserApi,
              private categoryApi: CategoryApi) {}

  ngOnInit(): void {
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

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    //console.log(this.organizations[0].id);
    this.messageSub = this.messageRef.on('change').subscribe(
      (messages: Message[]) => {
        this.data = messages;
        this.messages = messages;
        console.log("Messages", this.messages);
        this.messageApi.count().subscribe(result => {
          //console.log(messageApi);
          console.log("count: ", result);
          this.countMessages = result.count;
        });
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {limit: 10, order: 'updatedAt DESC', include: ['Parser', 'Category']}).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        console.log("Devices", this.devices);
        this.deviceApi.count().subscribe(result => {
          //console.log(deviceApi);
          console.log("count: ", result);
          this.countDevices = result.count;
        });
      });

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categoryRef.on('change').subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        console.log("Categories", this.categories);
        this.categoryApi.count().subscribe(result => {
          //console.log(categoryApi);
          console.log("count: ", result);
          this.countCategories = result.count;
        });
      });

    // Parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserRef.on('change').subscribe((parsers: Parser[]) => {
      this.parsers = parsers;
      console.log("Parsers", this.parsers);
      this.parserApi.count().subscribe(result => {
        //console.log(parserApi);
        console.log("count: ", result);
        this.countParsers = result.count;
      });
    });

  }

  ngOnDestroy(): void {
    console.log("Dashboard: ngOnDestroy");
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();

    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();

    if (this.parserRef)this.parserRef.dispose();
    if (this.parserSub)this.parserSub.unsubscribe();

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }


  create(): void {
    this.messageRef.create(this.message).subscribe(() => this.message = new Message());
  }

  update(message: Message): void {
    this.messageRef.upsert(message).subscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
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

  zoomOnDevice(lat:number, lng:number): void {
    this.lat=lat;
    this.lng=lng;
    this.zoom=12;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  // lineChart
  public lineChartData: Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
  ];
  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: any = {
    animation: false,
    responsive: true
  };
  public lineChartColours: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
