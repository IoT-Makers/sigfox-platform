import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AccessToken, Connector, FireLoopRef, User} from '../../shared/sdk/models';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {Subscription} from 'rxjs/Subscription';
import {RealTime} from '../../shared/sdk/services/core';

@Component({
  selector: 'app-profile',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})
export class ConnectorsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmTokenModal') confirmTokenModal: any;
  @ViewChild('addConnectorModal') addConnectorModal: any;
  @ViewChild('editConnectorModal') editConnectorModal: any;
  @ViewChild('confirmConnectorModal') confirmConnectorModal: any;

  private connectorSub: Subscription;
  private connectorRef: FireLoopRef<Connector>;
  private connectors: Connector[] = [];
  private connectorToAdd: Connector = new Connector();
  private connectorToRemove: Connector = new Connector();
  private connectorToEdit: Connector = new Connector();

  private devAccessTokenToRemove: AccessToken = new AccessToken();
  private callbackURL;

  // Select
  private selectTypes: Array<Object> = [
    {id: 'sigfox-api', itemName: 'Sigfox API'},
    {id: 'webhook', itemName: 'Webhook'},
    {id: 'free-mobile', itemName: 'Free Mobile'},
    {id: 'office-365', itemName: 'Outlook (Office 365)'},
    {id: 'mqtt', itemName: 'MQTT'}
  ];
  private selectedTypes = [];
  private selectOneSettings = {
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
    this.getUser();
    this.callbackURL = this.document.location.origin + '/api/Messages/sigfox';

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

  getUser(): void {
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id, {}).subscribe((user: User) => {
      this.user = user;
    });
  }

  setup(): void {
    // this.ngOnDestroy();

    // Get and listen connectors
    this.connectorRef = this.rt.FireLoop.ref<Connector>(Connector);
    this.connectorSub = this.connectorRef.on('change',
      {
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
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
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmConnectorModal.hide();
  }

  editConnector(): void {
    this.connectorRef.upsert(this.connectorToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Connector was successfully updated.');
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
    this.editConnectorModal.hide();
  }

  addConnector(): void {
    delete this.connectorToAdd.id;
    this.connectorToAdd.userId = this.user.id;
    this.connectorRef.upsert(this.connectorToAdd).subscribe((connector: Connector) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Connector was successfully updated.');
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
    this.addConnectorModal.hide();
  }

  createDevAccessToken(): void {
    const newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.user.id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.user.devAccessTokens.push(accessToken);
      this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
        this.user = user;
      });
    });
  }

  openConfirmTokenModal(devAccessToken: AccessToken): void {
    this.devAccessTokenToRemove = devAccessToken;
    this.confirmTokenModal.show();
  }

  removeDevAccessToken(): void {
    this.userApi.destroyByIdAccessTokens(this.user.id, this.devAccessTokenToRemove.id).subscribe(value => {
        const index = this.user.devAccessTokens.indexOf(this.devAccessTokenToRemove);
        this.user.devAccessTokens.splice(index, 1);
        this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
          this.user = user;
        });
      }
    );
    this.confirmTokenModal.hide();
  }

  toastClick() {
    if (this.toast)
      this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
    this.toast = this.toasterService.pop('info', 'Click', 'Copied to clipboard.');
  }

  ngOnDestroy(): void {
    console.log('Connector: ngOnDestroy');
    if (this.connectorRef) this.connectorRef.dispose();
    if (this.connectorSub) this.connectorSub.unsubscribe();
  }
}
