import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Alert, Category, Device, FireLoopRef, Message, Organization, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Geoloc} from '../../shared/sdk/models/Geoloc';
import {AgmInfoWindow, LatLngBounds} from '@agm/core';
import {ConnectorApi, DeviceApi, MessageApi, OrganizationApi, UserApi} from '../../shared/sdk/services/custom';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

declare var Zone: any;
declare const google: any;

@Component({
  templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit, OnDestroy {

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;

  // Flags
  public devicesReady = false;
  public messagesReady = false;
  public countCategoriesReady = false;
  public countDevicesReady = false;
  public countMessagesReady = false;
  public countAlertsReady = false;
  public countOrganizationMembersReady = false;

  public user: User = new User();

  public organization: Organization;
  private filter: any;

  private newOrganization = new Organization();
  private organizations: Organization[] = [];

  private mobile = false;

  private organizationRouteSub: Subscription;
  private messageSub: Subscription;
  private deviceSub: Subscription;
  private deviceReadSub: Subscription;
  private alertSub: Subscription;
  private categorySub: Subscription;

  private messages: Message[] = [];
  public devices: Device[] = [];
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
  private countOrganizationMembers = 0;

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private deviceReadRef: FireLoopRef<Device>;
  private organizationRef: FireLoopRef<Organization>;
  private userRef: FireLoopRef<User>;
  private alertRef: FireLoopRef<Alert>;
  private categoryRef: FireLoopRef<Category>;

  private isCircleVisible: boolean[] = [];

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;
  private map;

  public filterQuery = '';

  public see = false;
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
              private deviceApi: DeviceApi,
              private messageApi: MessageApi,
              private connectorApi: ConnectorApi,
              private route: ActivatedRoute) {

    /*this.eventStreamService.createMessagesChangeStream().addEventListener('data', (msg: any) => {
      const data = JSON.parse(msg.data);
      console.log(data);
    });*/
  }

  ngOnInit(): void {
    console.log('Overview: ngOnInit');

    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }

    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Check if organization view
    this.organizationRouteSub = this.route.params.subscribe(params => {

      if (params.id) {
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.organizationApi.countMembers(this.organization.id).subscribe(result => {
            this.countOrganizationMembers = result.count;
            this.countOrganizationMembersReady = true;
            console.log('Members', result.count);
          });
          // Check if real time and setup
          if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
            this.setup();
          else
            this.rt.onAuthenticated().subscribe(() => this.setup());
        });
      } else {
        // Check if real time and setup
        if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
          this.setup();
        else
          this.rt.onAuthenticated().subscribe(() => this.setup());
      }
      //console.log("Router", params);
    });
  }

  setup(): void {
    this.cleanSetup();
    console.log('Setup Overview');

    if (this.organization) {

      this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);

      /**
       * Count real time methods below
       */
      // Categories
      this.categoryRef = this.organizationRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change').subscribe((categories: Category[]) => {
        this.countCategories = categories.length;
        this.countCategoriesReady = true;
      });

      // Devices
      this.deviceRef = this.organizationRef.child<Device>('Devices');
      this.deviceSub = this.deviceRef.on('change', {
        limit: 10,
        order: 'updatedAt DESC',
        include: ['Category', {
          relation: 'Messages',
          scope: {
            limit: 1,
            order: 'createdAt DESC',
            include: [{
              relation: 'Geolocs',
              scope: {
                limit: 5,
                order: 'createdAt DESC'
              }
            }]
          }
        }]
      }).subscribe((devices: Device[]) => {
        console.log('devices', devices);
        this.devices = devices;
        this.devicesReady = true;
        this.fitMapBounds();
        this.organizationApi.countDevices(this.organization.id).subscribe(result => {
          this.countDevices = result.count;
          this.countDevicesReady = true;
        });
      });

      // Messages
      this.organizationApi.countMessages(this.organization.id).subscribe(result => {
        this.countMessages = result.count;
        this.countMessagesReady = true;
      });
      /*this.messageRef = this.organizationRef.child<Message>('Messages');
      this.messageSub = this.messageRef.on('child_changed', {limit: 1}).subscribe((messages: Message[]) => {
        this.organizationApi.countMessages(this.organization.id).subscribe(result => {
          this.countMessages = result.count;
        });
      });*/

    } else {

      this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);

      /**
       * Count real time methods below
       */
      // Categories
      this.categoryRef = this.userRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change').subscribe((categories: Category[]) => {
        this.countCategories = categories.length;
        this.countCategoriesReady = true;
      });

      // Devices
      this.deviceRef = this.userRef.child<Device>('Devices');
      this.deviceSub = this.deviceRef.on('change',
        {
          limit: 10,
          order: 'updatedAt DESC',
          include: ['Category', {
            relation: 'Messages',
            scope: {
              limit: 1,
              order: 'createdAt DESC',
              include: [{
                relation: 'Geolocs',
                scope: {
                  limit: 5,
                  order: 'createdAt DESC'
                }
              }]
            }
          }]
        }).subscribe((devices: Device[]) => {
        console.log('devices: ', devices);
        this.devices = devices;
        this.fitMapBounds();
        this.devicesReady = true;
        this.userApi.countDevices(this.user.id).subscribe(result => {
          this.countDevices = result.count;
          this.countDevicesReady = true;
        });
      });

      // Messages
      this.userApi.countMessages(this.user.id).subscribe(result => {
        this.countMessages = result.count;
        this.countMessagesReady = true;
      });
      this.messageRef = this.userRef.child<Message>('Messages');
      this.messageSub = this.messageRef.on('child_changed', {limit: 1}).subscribe((messages: Message[]) => {
        this.userApi.countMessages(this.user.id).subscribe(result => {
          this.countMessages = result.count;
          this.countMessagesReady = true;
        });
      });

      // Alerts
      this.alertRef = this.userRef.child<Alert>('Alerts');
      this.alertSub = this.alertRef.on('change', {where: {active: true}}).subscribe((alerts: Alert[]) => {
        this.countAlerts = alerts.length;
        this.countAlertsReady = true;
      });

      this.getMessagesGraph(this.graphRange);
    }
  }

  upgrade() {

  }

  onMapReady(event: any) {
    this.map = event;
    this.fitMapBounds();
  }

  fitMapBounds() {
    if (this.map) {
      const bounds: LatLngBounds = new google.maps.LatLngBounds();
      this.devices.forEach((device: any) => {
        if (device.Messages && device.Messages[0] && device.Messages[0].Geolocs[0]) {
          bounds.extend(new google.maps.LatLng(device.Messages[0].Geolocs[0].location.lat, device.Messages[0].Geolocs[0].location.lng));
        }
      });
      this.map.fitBounds(bounds);
    }
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

    this.graphRange = option;
    this.messageChartLabels = [];
    this.messageChartData = [];
    this.messagesReady = false;

    // this.data = [];

    // this.devices.forEach(device => {
    //   const item: any = {
    //     "deviceId": device.id
    //   };
    //   this.listDevicesId.push(item);
    // });

    // Messages
    this.messageApi.stats(this.graphRange, null, null, null).subscribe((stats: any) => {

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
      this.messagesReady = true;
    });
  }

  ngOnDestroy(): void {
    console.log('Overview: ngOnDestroy');
    // Dispose and unsubscribe to clean the real time connection
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();

    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();

    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceReadRef) this.deviceReadRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();
    if (this.deviceReadSub) this.deviceReadSub.unsubscribe();

    if (this.messageRef) this.messageRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();

    if (this.alertRef) this.alertRef.dispose();
    if (this.alertSub) this.alertSub.unsubscribe();
  }

  cancelSee(): void {
    this.see = false;
  }

  seeDevice(device: Device): void {
    this.see = true;

    // Reset all widget values on device change
    this.humidity = undefined;
    this.temperature = undefined;
    this.altitude = undefined;
    this.pressure = undefined;
    this.speed = undefined;
    this.light = undefined;
    this.battery = undefined;
    this.message = undefined;

    // Used for time & geoloc
    this.message = device.Messages[0];

    if (this.message && this.message.data_parsed) {
      this.humidity = _.filter(this.message.data_parsed, {key: 'humidity'})[0];
      this.temperature = _.filter(this.message.data_parsed, {key: 'temperature'})[0];
      this.altitude = _.filter(this.message.data_parsed, {key: 'altitude'})[0];
      this.pressure = _.filter(this.message.data_parsed, {key: 'pressure'})[0];
      this.speed = _.filter(this.message.data_parsed, {key: 'speed'})[0];
      this.light = _.filter(this.message.data_parsed, {key: 'light'})[0];
      this.battery = _.filter(this.message.data_parsed, {key: 'battery'})[0];
    }
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

  zoomOnDevice(geoloc: Geoloc): void {
    this.cancelSee();
    this.agmInfoWindow.forEach((child) => {
      // console.log(child['_el'].nativeElement.id);
      if (child['_el'].nativeElement.id === geoloc.id)
        child.open();
      else
        child.close();
    });

    this.mapLat = geoloc.location.lat;
    this.mapLng = geoloc.location.lng;
    this.mapZoom = 12;
  }

}
