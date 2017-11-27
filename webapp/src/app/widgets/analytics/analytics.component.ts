import {Component, OnInit} from '@angular/core';
import {Category, Device, FireLoopRef, Message} from '../../shared/sdk/models';
import {DeviceApi, RealTime} from '../../shared/sdk/services';

import {Subscription} from 'rxjs/Subscription';

import * as moment from 'moment';

@Component({
  selector: 'app-analytics',
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  private messageSub: Subscription;
  private deviceSub: Subscription;

  private devices: Device[] = new Array<Device>();

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;

  public data = [];

  // Messages graph

  private graphRange = 'hourly';

  private messageChartData: Array<any> = [];
  private messageChartLabels: Array<any> = [];

  public messageChartOptions = {
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
  private messageChartLegend = true;
  private messageChartType = 'bar';


  // Devices Graph
  private selectedDevice: Device = new Device();


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
  private deviceChartLegend = true;
  private deviceChartType = 'line';

  constructor(private rt: RealTime,
              private deviceApi: DeviceApi) {}

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
        if (option === 'hourly') {
          this.messageChartLabels.push(moment(stat.universal).format('h:mm a'));
        }
        if (option === 'daily') {
          this.messageChartLabels.push(moment(stat.universal).format('ddd MMM YY'));
        }
        if (option === 'weekly') {
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if (option === 'monthly') {
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        }
        if (option === 'yearly') {
          this.messageChartLabels.push(moment(stat.universal).format('MMM YYYY'));
        }
      });
      // console.log('Data:' ,this.data);
      // console.log('Labels:',this.messageChartLabels);
      this.messageChartData.push({ data: this.data, label: 'Messages'});
    });
  }

  getDeviceGraph(): void {
    console.log(this.selectedDevice.id);
    this.deviceChartLabels = [];
    this.deviceChartData   = [];
    this.deviceApi.graphData(this.selectedDevice.id, this.dateBegin ? this.dateBegin.toISOString() : null, this.dateEnd ? this.dateEnd.toISOString(): null).subscribe((result:any) => {
      console.log(result);

      this.deviceChartLabels = result.result.xAxis;

      const groupByKey: any = result.result.yAxis;
      for (const key in groupByKey) {
        let obj: any;
        obj = {
          label: '',
          data: []
        };

        const colorOption: any = {
          //backgroundColor: 'transparent',
          borderColor: '',
          pointHoverBackgroundColor: '#fff',
          borderWidth: 1,
          pointRadius: 0
        }

        // check also if property is not inherited from prototype
        if (groupByKey.hasOwnProperty(key)) {

          groupByKey[key].forEach((item: any) => {
            if (typeof item.value === 'number' || item.type === 'number') {
              obj.label = key;
              obj.data.push(item.value);
            } else {
              obj.data.push(null);
            }
          });

          if (obj.label) {
            this.deviceChartData.push(obj);
          }

          this.deviceChartColors.push(colorOption);

        }
      }

      console.log(this.deviceChartLabels);
      console.log(this.deviceChartData);

      //this.deviceChartData = result.result.yAxis
    });
  }

  searchDevice(context: any): void {
    console.log('search', context);
  }

  ngOnDestroy(): void {
    console.log('Analytics: ngOnDestroy');
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();

    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();
  }


}
