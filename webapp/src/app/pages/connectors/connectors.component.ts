import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {Subscription} from 'rxjs/Subscription';
import {RealTime} from '../../shared/sdk/services/core';
import {Connector, FireLoopRef, User} from '../../shared/sdk/models';

@Component({
  selector: 'app-profile',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})
export class ConnectorsComponent implements OnInit, OnDestroy {

  public user: User;

  @ViewChild('addConnectorModal') addConnectorModal: any;
  @ViewChild('editConnectorModal') editConnectorModal: any;
  @ViewChild('confirmConnectorModal') confirmConnectorModal: any;

  // Flags
  public connectorsReady = false;

  private connectorSub: Subscription;
  private connectorRef: FireLoopRef<Connector>;
  private userRef: FireLoopRef<User>;
  public connectors: Connector[] = [];
  public connectorToAdd: Connector = new Connector();
  public connectorToRemove: Connector = new Connector();
  public connectorToEdit: Connector = new Connector();

  // Select
  public selectTypes: Array<Object> = [
    {id: 'sigfox-api', itemName: 'Sigfox API'},
    {id: 'webhook', itemName: 'Webhook'},
    {id: 'free-mobile', itemName: 'Free Mobile'},
    {id: 'office-365', itemName: 'Outlook (Office 365)'},
    {id: 'mqtt', itemName: 'MQTT'}
  ];
  public selectedTypes = [];
  public selectOneSettings = {
    singleSelection: true,
    text: 'Select one type',
    enableSearchFilter: false,
    classes: 'select-one'
  };

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      animation: 'fade'
    });

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi,
              private rt: RealTime,
              private connectorApi: ConnectorApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Connector: ngOnInit');

    // Get the logged in User object (avatar, email, ...)
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
    this.cleanSetup();

    // Get and listen connectors
    this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
    this.connectorRef = this.userRef.child<Connector>('Connectors');
    this.connectorSub = this.connectorRef.on('change',
      {
        limit: 1000,
        order: 'updatedAt DESC'
      }
    ).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
      this.connectorsReady = true;
    });
  }

  openAddConnectorModal(): void {
    // Reset selects
    this.selectedTypes = [];
    // New connector
    this.connectorToAdd = new Connector();
    // Open modal
    this.addConnectorModal.show();
  }

  openEditConnectorModal(connector: Connector): void {
    this.connectorToEdit = connector;
    // Set selected values
    this.selectTypes.forEach((type: any) => {
      if (connector.type === type.id) {
        this.selectedTypes = [{
          id: type.id,
          itemName: type.itemName
        }];
        return;
      }
    });

    this.editConnectorModal.show();
  }

  openConfirmConnectorModal(connector: Connector): void {
    this.connectorToRemove = connector;
    this.confirmConnectorModal.show();
  }

  removeConnector(): void {
    this.connectorRef.remove(this.connectorToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Connector was successfully removed.');
      this.confirmConnectorModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  editConnector(): void {
    this.connectorRef.upsert(this.connectorToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Connector was successfully updated.');
      this.editConnectorModal.hide();
    }, err => {
      if (err.error.statusCode === 401) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Ouch', 'Could not connect to Sigfox. Are the API credentials correct?');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', err.error.message);
      }
    });
  }

  addConnector(): void {
    this.connectorRef.create(this.connectorToAdd).subscribe((connector: Connector) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Connector was successfully updated.');
      this.addConnectorModal.hide();
    }, err => {
      if (err.error.statusCode === 401) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Ouch', 'Could not connect to Sigfox. Are the API credentials correct?');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', err.error.message);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('Connector: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.userRef) this.userRef.dispose();
    if (this.connectorRef) this.connectorRef.dispose();
    if (this.connectorSub) this.connectorSub.unsubscribe();
  }
}
