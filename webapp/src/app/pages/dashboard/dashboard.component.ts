import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
// import { Router } from '@angular/router';
import {Message, Device, Category, Parser, User, FireLoopRef} from '../../shared/sdk/models';
import {
  RealTime,
  MessageApi,
  DeviceApi,
  CategoryApi,
  ParserApi,
  UserApi
} from '../../shared/sdk/services';
import {count} from "rxjs/operator/count";
import {Subscription} from "rxjs/Subscription";
import {DOCUMENT} from "@angular/common";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit,OnDestroy {

  private callbackURL;

  private subscriptions: Subscription[] = new Array<Subscription>();

  private message: Message = new Message();
  private messages: Message[] = new Array<Message>();
  private messageRef: FireLoopRef<Message>;
  private countMessages: number = 0;

  private device: Device = new Device();
  private devices: Device[] = new Array<Device>();
  private deviceRef: FireLoopRef<Device>;
  private countDevices: number = 0;

  private parser: Parser = new Parser();
  private parsers: Parser[] = new Array<Parser>();
  private parserRef: FireLoopRef<Parser>;
  private countParsers: number = 0;

  private category: Category = new Category();
  private categories: Category[] = new Array<Category>();
  private categoryRef: FireLoopRef<Category>;
  private countCategories: number = 0;

  private user: User = new User();

  constructor(@Inject(DOCUMENT) private document: any,
              private rt: RealTime,
              private messageApi: MessageApi,
              private deviceApi: DeviceApi,
              private categoryApi: CategoryApi,
              private parserApi: ParserApi,
              private userApi: UserApi) {

    console.log(this.rt.connection);

    this.subscriptions.push(

      this.rt.onReady().subscribe(() => {

        //Messages
        this.messageRef = this.rt.FireLoop.ref<Message>(Message);
        this.messageRef.on('change').subscribe(
          (messages: Message[]) => {
            this.messages = messages;
            console.log("Messages", this.messages);
            this.messageApi.count().subscribe(result => {
              //console.log(messageApi);
              console.log("count: ", result);
              this.countMessages = result.count;
            });
          });

        //Devices
        this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
        this.deviceRef.on('change').subscribe(
          (devices: Device[]) => {
          this.devices = devices;
          console.log("Devices", this.devices);
          this.deviceApi.count().subscribe(result => {
            //console.log(deviceApi);
            console.log("count: ", result);
            this.countDevices = result.count;
          });
        });

        //Categories
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

        //Parsers
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

      })
    );

  }

  ngOnInit(): void {
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
    this.callbackURL = this.document.location.origin + "/api/users/" + this.user.id + "/Messages?access_token=";
  }

  ngOnDestroy(): void {
    console.log("Dashboard: ngOnDestroy");
    this.messageRef.dispose();
    this.parserRef.dispose();
    this.categoryRef.dispose();
    this.deviceRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
