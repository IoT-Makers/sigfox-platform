import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DeviceApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Alert, Connector, Device, FireLoopRef, User} from '../../shared/sdk/models';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('addAlertModal') addAlertModal: any;
  @ViewChild('editAlertModal') editAlertModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  private alertSub: Subscription;

  private alerts: Alert[] = [];
  private newAlert: Alert = new Alert();
  private alertToRemove: Alert = new Alert();
  private alertToEdit: Alert = new Alert();

  private alertRef: FireLoopRef<Alert>;

  private dateOrigin: Date = new Date(0);

  // Select
  private selectDevices: Array<Object> = [];
  private selectedDevices = [];
  private selectOneDeviceSettings = {
    singleSelection: true,
    text: 'Select one device',
    enableSearchFilter: true,
    classes: 'select-one-device'
  };
  private selectConnectors: Array<Object> = [];
  private selectedConnectors = [];
  private selectConnectorsSettings = {
    singleSelection: true,
    text: 'Select connectors',
    enableSearchFilter: true,
    classes: 'select-connector'
  };
  private selectKeys: Array<Object> = [];
  private selectedKeys = [];
  private selectOneSettings = {
    singleSelection: true,
    text: 'Select one key',
    enableSearchFilter: false,
    classes: 'select-one'
  };

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private elRef: ElementRef,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Alerts: ngOnInit');
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
  }

  setup(): void {
    // Get and listen devices
    this.alertRef = this.rt.FireLoop.ref<Alert>(Alert);
    this.alertSub = this.alertRef.on('change',
      {
        limit: 1000,
        order: 'updatedAt DESC',
        include: ['Device', 'Connector'],
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
      console.log(this.alerts);
    });

    // Devices
    this.userApi.getDevices(this.user.id).subscribe((devices: Device[]) => {
      devices.forEach((device: Device) => {
        const item = {
          id: device.id,
          itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
        };
        this.selectDevices.push(item);
      });
    });
    // Connectors
    this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
      connectors.forEach((connector: Connector) => {
        const item = {
          id: connector.id,
          itemName: connector.name + ' (' + connector.type + ')'
        };
        this.selectConnectors.push(item);
      });
    });
  }

  openAddAlertModal(): void {
    // Reset selects
    this.selectedDevices = [];
    this.selectedKeys = [];
    this.selectedConnectors = [];
    // New alert
    this.newAlert = new Alert();
    // Open modal
    this.addAlertModal.show();
  }

  openEditAlertModal(alert): void {
    this.alertToEdit = alert;
    // Load keys for this device
    this.loadKeys(alert.deviceId);
    // Set selected values
    this.selectedDevices = [{
      id: alert.deviceId,
      itemName: alert.Device.name ? alert.Device.name + ' (' + alert.Device.id + ')' : alert.Device.id
    }];
    this.selectedKeys = [{id: alert.key, itemName: alert.key}];
    this.selectedConnectors = [{id: alert.Connector.id, itemName: alert.Connector.name + ' (' + alert.Connector.type + ')'}];

    this.editAlertModal.show();
  }

  openConfirmModal(alert): void {
    this.alertToRemove = alert;
    this.confirmModal.show();
  }

  setConnectors(): void {
    /**
     * TODO: implement multi connector (HasAndBelongsToMany relations?)
     */
    this.selectedConnectors.forEach((item: any) => {
      this.newAlert.connectorId = item.id;
      this.alertToEdit.connectorId = item.id;
    });
  }

  removeAlert(): void {
    this.alertRef.remove(this.alertToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully removed.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmModal.hide();
  }

  editAlert(): void {
    this.alertRef.upsert(this.alertToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully updated.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.editAlertModal.hide();
  }

  addAlert(): void {
    delete this.newAlert.id;
    this.newAlert.userId = this.user.id;
    this.alertRef.upsert(this.newAlert).subscribe((alert: Alert) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully updated.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Please fill in the alert form.' + err.error.message);
    });
    this.addAlertModal.hide();
  }

  loadKeys(deviceId: string): void {
    // Reset the selected keys
    this.selectedKeys = [];
    // Reset the selectable keys
    this.selectKeys = [];
    // Fetch all the keys belonging to selected devices
    this.userApi.getDevices(this.user.id, {where: {id: deviceId}}).subscribe((devices: Device[]) => {
      console.log(devices);
      if (devices[0].data_parsed) {
        devices[0].data_parsed.forEach(o => {
          const item = {
            id: o.key,
            itemName: o.key
          };
          // console.log(_.find(this.newWidget.options.tableColumnOptions, object));
          this.selectKeys.push(item);
        });
      }
    });
  }

  setAlertActive(alert: Alert): void {
    this.alertRef.upsert(alert).subscribe((alert: Alert) => {
      if (alert.active) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully activated.');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('info', 'Success', 'Alert was successfully deactivated.');
      }
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Please fill in the alert form.' + err.error.message);
    });
  }

  ngOnDestroy(): void {
    console.log('Alerts: ngOnDestroy');
    if (this.alertRef) this.alertRef.dispose();
    if (this.alertSub) this.alertSub.unsubscribe();
  }

}

