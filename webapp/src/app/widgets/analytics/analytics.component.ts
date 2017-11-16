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

  public brandPrimary:string =  '#20a8d8';
  public brandSuccess:string =  '#4dbd74';
  public brandInfo:string =   '#63c2de';
  public brandWarning:string =  '#f8cb00';
  public brandDanger:string =   '#f86c6b';

  private lineChartData:Array<any> = [];
  private lineChartLabels:Array<any> = [];
  // private lineChartOptions:any = {
  //   animation: false,
  //   responsive: true
  // };
  public mainChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
        }
      }]
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  private lineChartColors:Array<any> = [
    {
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  private lineChartLegend:boolean = true;
  private lineChartType:string = 'bar';

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

    this.messageSub = this.messageRef.on('change').subscribe(
      (messages: Message[]) => {
        this.getMessagesGraph(this.graphRange);
      });




  }

  getMessagesGraph(option:string):void{

    this.graphRange = option;
     this.lineChartLabels = [];
     this.lineChartData   = [];
    // this.data = [];

    this.messageRef.stats({range:this.graphRange}).subscribe((stats: any) => {

      this.lineChartLabels = [];
      this.lineChartData   = [];
      this.data = [];

      //console.log("Stats: ",stats);

      stats.forEach((stat: any) => {

        this.data.push(stat.count);
        if(option=='hourly'){
          this.lineChartLabels.push(moment(stat.universal).format('h:mm:ss a'));
        }
        if(option=='daily'){
          this.lineChartLabels.push(moment(stat.universal).format('ddd MMM YY'));
        }
        if(option=='weekly'){
          this.lineChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if(option=='monthly'){
          this.lineChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if(option=='yearly'){
          this.lineChartLabels.push(moment(stat.universal).format('MMM YYYY'));
        }
      });
      // console.log("Data:" ,this.data);
      // console.log("Labels:",this.lineChartLabels);
      this.lineChartData.push({ data: this.data, label: 'Messages'});
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
