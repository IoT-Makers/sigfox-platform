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

import * as moment from 'moment';


@Component({
  selector: 'app-analytics',
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

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

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  public data = [];

  private graphRange: string = 'hourly';

  private messageChartData:Array<any> = [];
  private messageChartLabels:Array<any> = [];
  // private messageChartOptions:any = {
  //   animation: false,
  //   responsive: true
  // };
  public messageChartOptions:any = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
    }
  };
  private messageChartColors:Array<any> = [
    {
      backgroundColor: '#63c2de'
    }
  ];
  private messageChartLegend:boolean = true;
  private messageChartType:string = 'bar';

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

    this.getMessagesGraph(this.graphRange);

    this.messageSub = this.messageRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (messages: Message[]) => {
        console.log(messages);
        console.log("onChange");
        this.getMessagesGraph(this.graphRange);
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {limit: 100, order: 'updatedAt DESC', include: ['Category']}).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        //console.log("Devices", this.devices);

      });




  }

  getMessagesGraph(option:string):void{

    this.graphRange = option;
     this.messageChartLabels = [];
     this.messageChartData   = [];
    // this.data = [];

    this.messageRef.stats({range:this.graphRange}).subscribe((stats: any) => {

      this.messageChartLabels = [];
      this.messageChartData   = [];
      this.data = [];

      console.log("Stats: ",stats);

      stats.forEach((stat: any) => {

        this.data.push(stat.count);
        if(option=='hourly'){
          this.messageChartLabels.push(moment(stat.universal).format('h:mm a'));
        }
        if(option=='daily'){
          this.messageChartLabels.push(moment(stat.universal).format('ddd MMM YY'));
        }
        if(option=='weekly'){
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if(option=='monthly'){
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if(option=='yearly'){
          this.messageChartLabels.push(moment(stat.universal).format('MMM YYYY'));
        }
      });
      //console.log("Data:" ,this.data);
      // console.log("Labels:",this.messageChartLabels);
      this.messageChartData.push({ data: this.data, label: 'Messages'});
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


}
