import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Device, FireLoopRef, Message, User} from '../../shared/sdk/models';
import {DeviceApi, RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {SelectComponent} from 'ng2-select';
import * as moment from 'moment';

@Component({
  selector: 'app-analytics',
  templateUrl: 'analytics.component.html',
  styleUrls: ['analytics.component.scss']
})
export class AnalyticsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('devicesSelect') devicesSelect: SelectComponent;

  private mobile = false;

  public devices: Array<any> = [];

  private messageGraphSub: Subscription;
  private messageGraphRef: FireLoopRef<Message>;

  public data = [];

  // Date
  public dateBeginSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select begin date'
  };
  public dateEndSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Select end date'
  };

  // Messages graph
  private graphRange = 'hourly';

  private isLimit_hourly = true;
  private isLimit_daily = false;
  private isLimit_weekly = false;
  private isLimit_monthly = false;
  private isLimit_yearly = false;

  public messageChartData: Array<any> = [];
  private messageChartLabels: Array<any> = [];

  public messageChartOptions = {
    responsive: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    legend: {
      display: true
    }
  };
  private messageChartColors: Array<any> = [{backgroundColor: '#5b9bd3'}];

  // Devices Graph
  public selectedDevice: Device = new Device();

  public dateEnd: Date = new Date();
  public dateBegin: Date = new Date();

  public deviceChartData: Array<any> = [];
  private deviceChartLabels: Array<any> = [];

  public deviceChartOptions: any = {
    responsive: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    legend: {
      display: true
    }
  };
  public deviceChartOptionsMobile: any = {
    responsive: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    legend: {
      display: true
    },
    scales: {
      xAxes: [{
        display: false
      }]
    }
  };
  private deviceChartColors: Array<any> = [];

  constructor(private rt: RealTime,
              private deviceApi: DeviceApi,
              private userApi: UserApi) {
  }

  ngOnInit(): void {
    console.log('Analytics: ngOnInit');
    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }
    this.dateBegin.setDate(this.dateBegin.getDate() - 7);
    this.dateBeginSettings.placeholder = this.dateBegin.toISOString();
    this.dateEndSettings.placeholder = this.dateEnd.toISOString();
    this.dateBeginSettings.placeholder = moment(this.dateBegin).format('MMM-DD-YYYY hh:mm A');
    this.dateEndSettings.placeholder =  moment(this.dateEnd).format('MMM-DD-YYYY hh:mm A');

    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/

    // Get devices
    this.userApi.getDevices(this.user.id).subscribe((devices: Device[]) => {
      devices.forEach(device => {
        const item = {
          id: device.id,
          text: device.name ? device.id + ' - ' + device.name : device.id
        };
        this.devices.push(item);
      });
      this.devicesSelect.items = this.devices;
    });
  }

  setup(): void {
    // this.cleanSetup();
  }

  getMessagesGraph(option: string): void {
    // Reset buttons
    this.isLimit_hourly = false;
    this.isLimit_daily = false;
    this.isLimit_weekly = false;
    this.isLimit_monthly = false;
    this.isLimit_yearly = false;
    if (option === 'hourly')
      this.isLimit_hourly = true;
    if (option === 'daily')
      this.isLimit_daily = true;
    if (option === 'weekly')
      this.isLimit_weekly = true;
    if (option === 'monthly')
      this.isLimit_monthly = true;
    if (option === 'yearly')
      this.isLimit_yearly = true;



    // Dispose and unsubscribe to clean the real time connection
    if (this.messageGraphRef) this.messageGraphRef.dispose();
    if (this.messageGraphSub) this.messageGraphSub.unsubscribe();

    this.graphRange = option;
    this.messageChartLabels = [];
    this.messageChartData = [];
    // this.data = [];

    // Messages
    this.messageGraphRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageGraphSub = this.messageGraphRef.stats(
      {
        range: this.graphRange,
        where: {
          userId: this.user.id,
          deviceId: this.selectedDevice.id
        }
      }
    ).subscribe((stats: any) => {

      this.messageChartLabels = [];
      this.messageChartData = [];
      this.data = [];

      // console.log('Stats: ', stats);

      stats.forEach((stat: any) => {

        this.data.push(stat.count);
        if (option === 'hourly')
          this.messageChartLabels.push(moment(stat.universal).format('h:mm a'));
        if (option === 'daily')
          this.messageChartLabels.push(moment(stat.universal).format('ddd MMM YY'));
        if (option === 'weekly')
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        if (option === 'monthly')
          this.messageChartLabels.push(moment(stat.universal).format('DD MMM YY'));
        if (option === 'yearly')
          this.messageChartLabels.push(moment(stat.universal).format('MMM YYYY'));
      });
      // console.log('Data:' ,this.data);
      // console.log('Labels:',this.messageChartLabels);
      this.messageChartData.push({data: this.data, label: 'Messages'});
    });
  }

  deviceSelected(device: any) {
    this.selectedDevice = device;
  }

  getDeviceGraph(): void {
    this.deviceChartColors = [];
    this.deviceChartLabels = [];
    this.deviceChartData = [];

    console.log(this.dateBegin.toISOString());
    console.log(this.dateEnd.toISOString());

    this.deviceApi.timeSeries(this.selectedDevice.id, this.dateBegin.toISOString(), this.dateEnd.toISOString()).subscribe((result: any) => {

      this.deviceChartLabels = result.result.xAxis;
      const groupByKey: any = result.result.yAxis;

      // Transform the labels in the user local time zone format
      this.deviceChartLabels.forEach((label: any, index) => {
        const offset = moment().utcOffset();
        this.deviceChartLabels[index] = moment.utc(label).utcOffset(offset).format('DD MMM YY - h:mm a');
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
      // console.log(this.deviceChartLabels);
      // console.log(this.deviceChartData);
      // this.deviceChartData = result.result.yAxis
    });
  }

  showGraphs(): void {
    this.getDeviceGraph();
    this.getMessagesGraph(this.graphRange);
  }
  searchDevice(context: any): void {
    // console.debug('search', context);
  }

  download(): void {
    console.log('Data:', this.deviceChartData);
  }

  ngOnDestroy(): void {
    console.log('Analytics: ngOnDestroy');
    // Dispose and unsubscribe to clean the real time connection
    if (this.messageGraphRef) this.messageGraphRef.dispose();
    if (this.messageGraphSub) this.messageGraphSub.unsubscribe();
  }
}
