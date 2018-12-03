import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Alert, AppSetting, Category, Device, Message, Organization, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {Geoloc} from '../../shared/sdk/models/Geoloc';
import {AgmInfoWindow, LatLngBounds} from '@agm/core';
import {
  AppSettingApi,
  ConnectorApi,
  DeviceApi,
  MessageApi,
  OrganizationApi,
  UserApi
} from '../../shared/sdk/services/custom';
import * as moment from 'moment';
import * as _ from 'lodash';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {Angulartics2} from "angulartics2";

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

  public bannerMessage;

  constructor(private rt: RealtimeService,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private deviceApi: DeviceApi,
              private messageApi: MessageApi,
              private appSettingApi: AppSettingApi,
              private connectorApi: ConnectorApi,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Overview: ngOnInit');

    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }

    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // App settings (for banner)
    this.appSettingApi.findById('bannerMessage').subscribe((appSetting: AppSetting) => {
      this.bannerMessage = appSetting.value;
    });

    // Check if organization view
    this.organizationRouteSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.organizationApi.countMembers(this.organization.id).subscribe(result => {
            this.countOrganizationMembers = result.count;
            this.countOrganizationMembersReady = true;
          });
          this.setup();
        });
      } else {
        this.setup();
      }
    });
  }

  setup(): void {
    this.unsubscribe();
    this.subscribe();
    console.log('Setup Overview');

    const api = this.organization ? this.organizationApi : this.userApi;
    const id = this.organization ? this.organization.id : this.user.id;
    // Categories
    api.countCategories(id).subscribe(result => {
      this.countCategories = result.count;
      this.countCategoriesReady = true;
    });

    // Devices
    api.getDevices(id, {
      limit: 10,
      order: 'messagedAt DESC',
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
      this.devices = devices;
      this.devicesReady = true;
      this.fitMapBounds();
    });

    api.countDevices(id).subscribe(result => {
      this.countDevices = result.count;
      this.countDevicesReady = true;
    });

    // Messages
    api.countMessages(id).subscribe(result => {
      this.countMessages = result.count;
      this.countMessagesReady = true;
    });

    // Alerts
    api.countAlerts(id).subscribe(result => {
      this.countAlerts = result.count;
      this.countAlertsReady = true;
    });

    if (!this.organization) this.getMessagesGraph(this.graphRange);
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

    this.messageApi.stats(this.graphRange, null, {
      userId: this.user.id
    }, null).subscribe((stats: any) => {

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
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
    this.unsubscribe();
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


  rtCategoryHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countCategories++ : payload.action == "DELETE" ? this.countCategories-- : 0;
  };
  rtDeviceHandler = (payload: any) => {
    const device = payload.content;
    if (device.userId == this.user.id || (this.organization && device.Device.Organizations.map(x => x.id).includes(this.organization.id))) {
      if (payload.action == "CREATE") {
        this.devices.unshift(payload.content);
        this.countDevices++;
      } else if (payload.action == "DELETE") {
        this.countDevices--;
        this.devices = this.devices.filter(function (device) {
          return device.id !== payload.content.id;
        });
      }
      // no need to listen to update, and it does not have geoloc
      this.devicesReady = true;
    }
  };
  rtMsgHandler = (payload: any) => {
    const msg = payload.content;
    if (msg.userId == this.user.id || (this.organization && msg.Device.Organizations.map(x => x.id).includes(this.organization.id))) {
      let idx = this.devices.findIndex(x => x.id == msg.Device.id);
      if (payload.action == "CREATE") {
        this.countMessages++;
        let device = msg.Device;
        device.Messages = [msg];
        this.devices.unshift(device);
        idx != -1 ? this.devices.splice(idx, 1) : this.devices.pop();
      } else if (payload.action == "DELETE") {
        this.countMessages--;
        this.devices[idx].Messages = this.devices[idx].Messages.filter((msg) => {
          return msg.id !== payload.content.id;
        });
      }
    }
  };
  rtAlertHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countAlerts++ : payload.action == "DELETE" ? this.countAlerts-- : 0;
  };

  private geolocBuffer = [];
  geolocHandler = (payload: any) => {
    if (payload.action == "CREATE") {
      for (let device of this.devices) {
        let lastMsg = device.Messages[0];
        if (!lastMsg) continue;
        if (lastMsg.id == payload.content.messageId) {
          lastMsg.Geolocs ? lastMsg.Geolocs.push(payload.content) : lastMsg.Geolocs = [payload.content];
          return;
        }
      }
      this.geolocBuffer.push(payload);
    }
  };

  subscribe(): void {
    this.rtCategoryHandler = this.rt.addListener("category", this.rtCategoryHandler);
    this.rtDeviceHandler = this.rt.addListener("device", this.rtDeviceHandler);
    this.rtMsgHandler = this.rt.addListener("message", this.rtMsgHandler);
    this.rtAlertHandler = this.rt.addListener("alert", this.rtAlertHandler);
    this.geolocHandler = this.rt.addListener('geoloc', this.geolocHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtCategoryHandler);
    this.rt.removeListener(this.rtDeviceHandler);
    this.rt.removeListener(this.rtMsgHandler);
    this.rt.removeListener(this.rtAlertHandler);
    this.rt.removeListener(this.geolocHandler);
  }
}
