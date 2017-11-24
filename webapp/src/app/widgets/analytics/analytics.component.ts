import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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

  // Messages graph

  private graphRange: string = 'hourly';

  private messageChartData: Array<any> = [];
  private messageChartLabels: Array<any> = [];

  public messageChartOptions:any = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
    }
  };
  private messageChartColors: Array<any> = [
    {
      backgroundColor: '#5b9bd3'
    }
  ];
  private messageChartLegend:boolean = true;
  private messageChartType:string = 'bar';


  // Devices Graph
  private deviceId: string = "";

  private dateEnd: Date = new Date();
  private dateBegin: Date = new Date();

  private deviceChartData: Array<any> = [];
  private deviceChartLabels: Array<any> = [];

  public deviceChartOptions: any = {
    responsive: true,
    maintainAspectRatio: true,
    legend: {
      display: true,
    }
  };
  private deviceChartColors: Array<any> = [];
  private deviceChartLegend: boolean = true;
  private deviceChartType: string = 'line';

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

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {limit: 100, order: 'updatedAt DESC', include: ['Category', 'Messages']}).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        console.log('Devices', this.devices);
      });

    this.dateBegin.setDate(this.dateBegin.getDate() - 7);


  }

  getMessagesGraph(option: string): void{

    this.graphRange = option;
     this.messageChartLabels = [];
     this.messageChartData   = [];
    // this.data = [];

    this.messageRef.stats({range: this.graphRange}).subscribe((stats: any) => {

      this.messageChartLabels = [];
      this.messageChartData   = [];
      this.data = [];

      console.log('Stats: ', stats);

      stats.forEach((stat: any) => {

        this.data.push(stat.count);
        if (option == 'hourly'){
          this.messageChartLabels.push(moment(stat.universal).format('h:mm a'));
        }
        if (option == 'daily'){
          this.messageChartLabels.push(moment(stat.universal).format('ddd MMM YY'));
        }
        if (option == 'weekly'){
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if (option == 'monthly'){
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if (option == 'yearly'){
          this.messageChartLabels.push(moment(stat.universal).format('MMM YYYY'));
        }
      });
      //console.log('Data:' ,this.data);
      // console.log('Labels:',this.messageChartLabels);
      this.messageChartData.push({ data: this.data, label: 'Messages'});
    });
  }

  getDeviceGraph():void{

    this.deviceChartLabels = [];
    this.deviceChartData   = [];
    this.deviceApi.graphData(this.deviceId, this.dateBegin ? this.dateBegin.toISOString() : null, this.dateEnd ? this.dateEnd.toISOString(): null).subscribe((result:any) => {
      console.log(result);

      this.deviceChartLabels = result.result.xAxis;

      let groupByKey:any = result.result.yAxis;
      for (var key in groupByKey) {
        let obj: any;
        obj = {
          label: '',
          data: []
        };

        let colorOption:any = {
          //backgroundColor: 'transparent',
          borderColor: '',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          pointRadius: 0
        }

        // check also if property is not inherited from prototype
        if (groupByKey.hasOwnProperty(key)) {

          groupByKey[key].forEach((item: any) => {
            if(typeof item.value === 'number' || item.type == 'number'){
              obj.label = key;
              obj.data.push(item.value);
            }else{
              obj.data.push(null);
            }
          });

          if(obj.label){
            this.deviceChartData.push(obj);
          }

          this.deviceChartColors.push(colorOption);

        }
      }

      console.log(this.deviceChartLabels);
      console.log(this.deviceChartData);

      //this.deviceChartData = result.result.yAxis
    })
  }

  searchDevice(context:any):void{
    console.log('search', context);
  }

  ngOnDestroy(): void {
    console.log('Analytics: ngOnDestroy');
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
