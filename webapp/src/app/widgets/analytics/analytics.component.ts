import {Component, OnInit} from '@angular/core';
import {Category, Device, FireLoopRef, Message, User} from '../../shared/sdk/models';
import {DeviceApi, RealTime, UserApi} from '../../shared/sdk/services';

import {Subscription} from 'rxjs/Subscription';

import * as moment from 'moment';

@Component({
  selector: 'app-analytics',
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  private user: User;

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

  constructor(private rt: RealTime,
              private deviceApi: DeviceApi,
              private userApi: UserApi) {}

  ngOnInit(): void {
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
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
    this.ngOnDestroy();
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);

    this.user = this.userApi.getCachedCurrent();

    this.getMessagesGraph(this.graphRange);

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {limit: 100,
        order: 'updatedAt DESC',
        where: {
          userId: this.user.id
        }
      }
    ).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        console.log('Devices', this.devices);
      });
  }

  getMessagesGraph(option: string): void{

    this.graphRange = option;
    this.messageChartLabels = [];
    this.messageChartData   = [];
    // this.data = [];

    this.messageRef.stats(
      {
        range: this.graphRange,
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((stats: any) => {

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
    this.deviceChartColors = [];
    this.deviceChartLabels = [];
    this.deviceChartData = [];

    this.deviceApi.graphData(this.selectedDevice.id, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((result: any) => {

      this.deviceChartLabels = result.result.xAxis;
      const groupByKey: any = result.result.yAxis;

      // Transform the labels in the user local time zone format
      this.deviceChartLabels.forEach((label: any, index) => {
        const offset = moment().utcOffset();
        this.deviceChartLabels[index] = moment.utc(label).utcOffset(offset).format('ddd MMM h:mm a');
      });

      // This boolean permits to activate (make visible) the first key graph only
      let firstNumericalKey = true;

      for (const key in groupByKey) {
        // Check if values are numerical for this key
        if (typeof groupByKey[key][0].value === 'number' || groupByKey[key][0].type === 'number') {
          let obj: any;
          obj = {
            label: key,
            data: []
          };
          groupByKey[key].forEach((item: any) => {
            obj.data.push(item.value);
          });
          const colorOption: any = {
            borderColor: '',
            borderWidth: 1,
            pointRadius: 4,
            pointBorderWidth: 0.2,
            pointBackgroundColor: 'rgba(255, 255, 255, 0.1)',
            pointHoverBackgroundColor: 'rgba(255, 255, 255, 0.8)',
            pointHoverRadius: 5,
            pointHoverBorderWidth: 2
          };

          if (groupByKey[key].length > 15)
            colorOption.pointRadius = 2;
          if (groupByKey[key].length > 30)
            colorOption.pointRadius = 0;

          if (key === 'battery') {
            colorOption.borderColor = '#ff4349';
            colorOption.backgroundColor = 'rgba(215, 44, 44, 0.1)';
          } else if (key === 'temperature') {
            colorOption.borderColor = '#44c35c';
            colorOption.backgroundColor = 'rgba(64, 175, 44, 0.1)';
          } else if (key === 'humidity') {
            colorOption.borderColor = '#5388ff';
            colorOption.backgroundColor = 'rgba(64, 117, 165, 0.3)';
          } else if (key === 'altitude') {
            colorOption.borderColor = '#7f4edb';
            colorOption.backgroundColor = 'rgba(133, 108, 163, 0.3)';
          } else if (key === 'light') {
            colorOption.borderColor = '#dbdb24';
            colorOption.backgroundColor = 'rgba(219, 212, 93, 0.3)';
          } else if (key === 'lat') {
            colorOption.borderColor = '#d3946a';
            colorOption.backgroundColor = 'rgba(200, 145, 93, 0.3)';
          } else if (key === 'lng') {
            colorOption.borderColor = '#d3946a';
            colorOption.backgroundColor = 'rgba(200, 145, 93, 0.3)';
          }

          if (firstNumericalKey)
            obj.hidden = false;
          else
            obj.hidden = true;

          firstNumericalKey = false;

          this.deviceChartData.push(obj);
          this.deviceChartColors.push(colorOption);
        }
      }
      console.log(this.deviceChartLabels);
      console.log(this.deviceChartData);
      // this.deviceChartData = result.result.yAxis
    });
  }

  searchDevice(context: any): void {
    console.log('search', context);
  }

  download(): void {
    console.log("Data:", this.deviceChartData);
  }

  ngOnDestroy(): void {
    console.log('Analytics: ngOnDestroy');
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();

    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();
  }
}
