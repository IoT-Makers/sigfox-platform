import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {Subscription} from 'rxjs/Subscription';
import {Connector, FireLoopRef, User} from '../../shared/sdk/models';
import {RealtimeService} from "../../shared/realtime/realtime.service";

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
  public connectors: Connector[] = [];
  public connectorToAdd: Connector = new Connector();
  public connectorToRemove: Connector = new Connector();
  public connectorToEdit: Connector = new Connector();

  // Select
  public selectTypes: Array<Object> = [
    {id: 'sigfox-api', itemName: 'Sigfox API'},
    {id: 'nexmo-sms', itemName: 'Nexmo SMS'},
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
              private rt: RealtimeService,
              private connectorApi: ConnectorApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Connector: ngOnInit');

    // Get the logged in User object (avatar, email, ...)
    this.user = this.userApi.getCachedCurrent();

    this.setup();
  }

  setup(): void {
    this.unsubscribe();
    this.subscribe();

    // Get and listen connectors
    this.userApi.getConnectors(this.user.id,{
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
    this.userApi.destroyByIdConnectors(this.user.id, this.connectorToRemove.id).subscribe(value => {
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
    this.userApi.updateByIdConnectors(this.user.id, this.connectorToEdit.id, this.connectorToEdit).subscribe(value => {
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
    this.userApi.createConnectors(this.user.id, this.connectorToAdd).subscribe((connector: Connector) => {
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
    if (this.connectorSub) this.connectorSub.unsubscribe();
  }

  rtHandler = (payload:any) => {
    if (payload.action == "CREATE") {
      this.connectors.unshift(payload.content);
    } else if (payload.action == "DELETE") {
      this.connectors = this.connectors.filter(function (obj) {
        return obj.id !== payload.content.id;
      });
    }
  };

  subscribe(): void {
    this.rtHandler = this.rt.addListener("connector", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }
}
