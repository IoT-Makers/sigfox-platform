import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RealTime, UserApi} from '../../shared/sdk/services';
import {Device, FireLoopRef, Geoloc, Message, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {SelectComponent} from "ng2-select";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {AgmInfoWindow, AgmMap} from "@agm/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('devicesSelect') devicesSelect: SelectComponent;

  public devices: Array<any> = new Array<any>();

  // Widgets
  private message: Message;
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

  // Real time
  private messageSub: Subscription;
  private messageRef: FireLoopRef<Message>;

  // Notifications
  private isFirstSubscribe = true;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

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
    this.ngOnDestroy();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

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

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
  }

  deviceSelected(device: any): void {
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

    this.messageSub = this.messageRef.on('value',
      {
        limit: 1,
        order: 'updatedAt DESC',
        include: ['Device'],
        where: {
          userId: this.user.id,
          deviceId: device.id
        }
      }
    ).subscribe((messages: Message[]) => {
      const message = messages[0];
      this.message = message;

      this.humidity = _.filter(message.parsed_data, {key: 'humidity'})[0];
      this.temperature = _.filter(message.parsed_data, {key: 'temperature'})[0];
      this.altitude = _.filter(message.parsed_data, {key: 'altitude'})[0];
      this.pressure = _.filter(message.parsed_data, {key: 'pressure'})[0];
      this.speed = _.filter(message.parsed_data, {key: 'speed'})[0];
      this.light = _.filter(message.parsed_data, {key: 'light'})[0];
      this.alert = _.filter(message.parsed_data, {key: 'alert'})[0];
      this.mode = _.filter(message.parsed_data, {key: 'mode'})[0];
      this.battery = _.filter(message.parsed_data, {key: 'battery'})[0];
    });

    this.messageSub = this.messageRef.on('child_added',
      {
        order: 'updatedAt DESC',
        include: ['Device'],
        where: {
          userId: this.user.id,
          deviceId: device.id
        }
      }
    ).subscribe((message: Message) => {
      this.message = message;

      this.humidity = _.filter(message.parsed_data, {key: 'humidity'})[0];
      this.temperature = _.filter(message.parsed_data, {key: 'temperature'})[0];
      this.altitude = _.filter(message.parsed_data, {key: 'altitude'})[0];
      this.pressure = _.filter(message.parsed_data, {key: 'pressure'})[0];
      this.speed = _.filter(message.parsed_data, {key: 'speed'})[0];
      this.light = _.filter(message.parsed_data, {key: 'light'})[0];
      this.alert = _.filter(message.parsed_data, {key: 'alert'})[0];
      this.mode = _.filter(message.parsed_data, {key: 'mode'})[0];
      this.battery = _.filter(message.parsed_data, {key: 'battery'})[0];

      // Notification
      this.toasterService.pop('info', 'New message', 'New message received for this device.');
    });
  }

  ngOnDestroy(): void {
    console.log('Dashboard: ngOnDestroy');
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();
  }

}
