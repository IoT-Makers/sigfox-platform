import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Alert, Category, Device, FireLoopRef, Message, Organization, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Geoloc} from '../../shared/sdk/models/Geoloc';
import {AgmInfoWindow} from '@agm/core';
import {UserApi, OrganizationApi} from '../../shared/sdk/services/custom';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ToasterConfig, ToasterService} from 'angular2-toaster';


@Component({
  templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit, OnDestroy {

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;

  private user: User;

  private organization: Organization;
  private filter: any;

  private newOrganization = new Organization();
  private organizations: Organization[] = [];

  private mobile = false;

  private messageSub: Subscription;
  private messageGraphSub: Subscription;
  private messageSeeSub: Subscription;
  private deviceSub: Subscription;
  private alertSub: Subscription;
  private categorySub: Subscription;

  private messages: Message[] = [];
  private devices: Device[] = [];
  private alerts: Alert[] = [];
  private categories: Category[] = [];

  private isLimit_hourly = false;
  private isLimit_daily = false;
  private isLimit_weekly = false;
  private isLimit_monthly = false;
  private isLimit_yearly = false;

  private countMessages = 0;
  private countDevices = 0;
  private countAlerts = 0;
  private countCategories = 0;

  private messageRef: FireLoopRef<Message>;
  private messageGraphRef: FireLoopRef<Message>;
  private messageSeeRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private alertRef: FireLoopRef<Alert>;
  private categoryRef: FireLoopRef<Category>;

  private isCircleVisible: boolean[] = [];

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;

  public filterQuery = '';

  private see = false;
  private deviceToSee: Device = new Device();

  // Graphs
  private hasNoMessageChartData = false;
  public data = [];
  // Messages graph
  private graphRange = 'hourly';
  private messageChartData: Array<any> = [];
  private messageChartLabels: Array<any> = [];
  public messageChartOptions = {
    responsive: true,
    scaleShowVerticalLines: false,
    maintainAspectRatio: false,
    legend: {
      display: true,
    }
  };
  private messageChartColors: Array<any> = [{backgroundColor: '#5b9bd3'}];

  // Widgets
  private message: any;
  private humidity;
  private temperature;
  private altitude;
  private pressure;
  private speed;
  private light;
  private alert;
  private mode;
  private battery;
  private thresholdHumidity = {
    '0': {color: '#cc853c'},
    '40': {color: '#66cccc'},
    '75': {color: '#3361cc'}
  };
  private thresholdTemperature = {
    '-50': {color: '#3361cc'},
    '17': {color: '#37ac55'},
    '23': {color: '#cc853c'},
    '30': {color: '#cb2c31'}
  };
  private thresholdSpeed = {
    '0': {color: '#936f4f'},
    '30': {color: '#ac756d'},
    '70': {color: '#ac5668'},
    '100': {color: '#cb2c31'}
  };
  private thresholdBattery = {
    '0': {color: '#cb2c31'},
    '30': {color: '#cc6543'},
    '50': {color: '#cc8a36'},
    '70': {color: '#3acc58'}
  };

  // Notifications
  private lastMessage: Message;
  private isFirstSubscribeMessage;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('Overview: ngOnInit');
    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }

    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    //Check if organization view
    this.route.params.subscribe(params => {

      if(params.id){
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          //console.log("Organization:", organization);

          //Set filter for API calls
          this.filter = {"organizationId": this.organization.id};

          //Check if real time and setup
          if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
            this.setup();
          else
            this.rt.onAuthenticated().subscribe(() => this.setup());
        });
      }else{

        //Set filter for API calls
        this.filter = {"userId": this.user.id};

        //Check if real time and setup
        if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
          this.setup();
        else
          this.rt.onAuthenticated().subscribe(() => this.setup());
      }
      //console.log("Router", params);
    });


    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/

  }

  setup(): void {
    // this.ngOnDestroy();

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change', {where: this.filter}).subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        if(!this.organization){
          this.userApi.countCategories(this.user.id).subscribe(result => {
            this.countCategories = result.count;
          });
        }else{
          this.organizationApi.countCategories(this.organization.id).subscribe(result => {
            this.countCategories = result.count;
          });
        }
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceSub = this.deviceRef.on('change',
      {
        limit: 10,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category', {
          relation: 'Messages',
          scope: {
            skip: 0,
            limit: 1,
            order: 'createdAt DESC'
          }
        }],
        where: this.filter
      }).subscribe(
      (devices: Device[]) => {
        //console.log(devices);
        this.devices = devices;
        if(!this.organization){
          this.userApi.countDevices(this.user.id).subscribe(result => {
            this.countDevices = result.count;
          });
        }else{
          this.organizationApi.countDevices(this.organization.id).subscribe(result => {
            this.countDevices = result.count;
          });
        }

      });

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageSub = this.messageRef.on('change', {
      limit: 1,
      order: 'createdAt DESC',
      where: this.filter
    }).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        if(!this.organization){
          this.userApi.countMessages(this.user.id).subscribe(result => {
            this.countMessages = result.count;
          });
        }else {
          this.organizationApi.countMessages(this.organization.id).subscribe(result => {
            this.countMessages = result.count;
          });
        }

      });

    // Alerts
    this.alertRef = this.rt.FireLoop.ref<Alert>(Alert);
    this.alertSub = this.alertRef.on('change', {
      where: {
        userId: this.user.id
      }
    }).subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
      this.userApi.countAlerts(this.user.id, {
        active: true
      }).subscribe(result => {
        this.countAlerts = result.count;
      });
    });

    this.getMessagesGraph(this.graphRange);
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
    this.messageGraphSub = this.messageRef.stats(
      {
        range: this.graphRange,
        where: this.filter
      }
    ).subscribe((stats: any) => {

      this.messageChartLabels = [];
      this.messageChartData = [];
      this.data = [];

      //console.log('Stats: ', stats);

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
      // console.log('Data:', this.data);
      // console.log('Labels:', this.messageChartLabels);
      this.messageChartData.push({data: this.data, label: 'Messages'});

      this.hasNoMessageChartData = this.data.every(value => {
        return value === 0;
      });
    });
  }

  ngOnDestroy(): void {
    console.log('Overview: ngOnDestroy');
    // Dispose and unsubscribe to clean the real time connection
    if (this.messageGraphRef) this.messageGraphRef.dispose();
    if (this.messageGraphSub) this.messageGraphSub.unsubscribe();

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();

    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();

    if (this.messageRef) this.messageRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();

    if (this.alertRef) this.alertRef.dispose();
    if (this.alertSub) this.alertSub.unsubscribe();


  }

  cancelSee(): void {
    this.see = false;
  }

  seeDevice(device): void {
    this.see = true;

    // Dispose and unsubscribe to clean the real time connection
    if (this.messageSeeRef) this.messageSeeRef.dispose();
    if (this.messageSeeSub) this.messageSeeSub.unsubscribe();

    // Used to trigger notifications
    this.lastMessage = new Message();
    this.isFirstSubscribeMessage = true;

    // Reset all widget values on device change
    this.humidity = undefined;
    this.temperature = undefined;
    this.altitude = undefined;
    this.pressure = undefined;
    this.speed = undefined;
    this.light = undefined;
    this.alert = undefined;
    this.mode = undefined;
    this.battery = undefined;
    this.message = undefined;

    // Message
    this.messageSeeRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageSeeSub = this.messageRef.on('change',
      {
        limit: 1,
        order: 'createdAt DESC',
        where: {
          and: [
            {userId: this.user.id},
            {deviceId: device.id}
          ]
        }
      }
    ).subscribe((messages: Message[]) => {
      const message = messages[0];
      //console.log('message', message);

      // Used for time & geoloc
      this.message = message;

      this.humidity = _.filter(message.data_parsed, {key: 'humidity'})[0];
      this.temperature = _.filter(message.data_parsed, {key: 'temperature'})[0];
      this.altitude = _.filter(message.data_parsed, {key: 'altitude'})[0];
      this.pressure = _.filter(message.data_parsed, {key: 'pressure'})[0];
      this.speed = _.filter(message.data_parsed, {key: 'speed'})[0];
      this.light = _.filter(message.data_parsed, {key: 'light'})[0];
      this.alert = _.filter(message.data_parsed, {key: 'alert'})[0];
      this.mode = _.filter(message.data_parsed, {key: 'mode'})[0];
      this.battery = _.filter(message.data_parsed, {key: 'battery'})[0];

      // Notification
      if (this.isFirstSubscribeMessage)
        this.lastMessage = message;
      if ((this.lastMessage.time !== message.time) && !this.isFirstSubscribeMessage) {
        this.toasterService.pop('primary', 'New message', 'New message received for device ' + message.deviceId + '.');
        this.lastMessage = message;
      }
      this.isFirstSubscribeMessage = false;
    });
  }


  setCircles() {
    for (let i = 0; i < this.devices.length; i++) {
      this.isCircleVisible.push(false);
    }
  }

  markerOut(i) {
    this.isCircleVisible[i] = false;
  }

  markerOver(i) {
    this.isCircleVisible[i] = true;
  }

  zoomOnDevice(elementId: string, geoloc: Geoloc): void {
    this.cancelSee();
    this.agmInfoWindow.forEach((child) => {
      // console.log(child['_el'].nativeElement.id);
      if (child['_el'].nativeElement.id === elementId)
        child.open();
      else
        child.close();
    });

    this.mapLat = geoloc.lat;
    this.mapLng = geoloc.lng;
    this.mapZoom = 12;
  }

}
