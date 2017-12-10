import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RealTime, UserApi} from '../../shared/sdk/services';
import {Device, FireLoopRef, Message, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';
import {SelectComponent} from "ng2-select";
import {ToasterConfig, ToasterService} from "angular2-toaster";

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
  private humidity;
  private temperature;
  private thresholdHumidity = {
    '0': {color: 'orange'},
    '40': {color: '#66CCCC'},
    '75.5': {color: 'blue'}
  };
  private thresholdTemperature = {
    '-50': {color: 'blue'},
    '17': {color: '#3acc58'},
    '30': {color: 'red'}
  };

  private mobile = false;

  // Real time
  private messageSub: Subscription;
  private messageRef: FireLoopRef<Message>;

  // Notifications
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
    if (window.screen.width <= 360)
      this.mobile = true;

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
  }

  deviceSelected(device: any): void {
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    // this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
    this.messageSub = this.messageRef.on('change',
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
      this.toasterService.pop('info', 'New message', 'New message received for this device.');
      this.humidity = _.filter(messages[0].parsed_data, {key: 'humidity'})[0].value;
      this.temperature = _.filter(messages[0].parsed_data, {key: 'temperature'})[0].value;
    });
  }

  public refreshValue(value: any): void {
    console.log(value);
  }

  ngOnDestroy(): void {
    console.log('Dashboard: ngOnDestroy');
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();
  }

}
