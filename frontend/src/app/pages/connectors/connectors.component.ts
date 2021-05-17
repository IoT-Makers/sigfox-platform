import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {Subscription} from 'rxjs/Subscription';
import {Connector, User} from '../../shared/sdk/models';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {TranslateService} from '@ngx-translate/core';

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
  public toasterconfig = {
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  };

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi,
              private rt: RealtimeService,
              private connectorApi: ConnectorApi,
              private translate: TranslateService,
              private toasterService: ToastrService) {
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
    this.subscribe(this.user.id);

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
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Connector was successfully removed.', this.toasterconfig);
      this.confirmConnectorModal.hide();
    }, err => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
    });
  }

  editConnector(): void {
    this.userApi.updateByIdConnectors(this.user.id, this.connectorToEdit.id, this.connectorToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId);
      this.toast = this.toasterService.success('Success', 'Connector was successfully updated.', this.toasterconfig);
      this.editConnectorModal.hide();
    }, err => {
      if (err.error.statusCode === 401) {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.warning('Ouch', 'Could not connect to Sigfox. Are the API credentials correct?', this.toasterconfig);
      } else {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
      }
    });
  }

  addConnector(): void {
    this.userApi.createConnectors(this.user.id, this.connectorToAdd).subscribe((connector: Connector) => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Connector was successfully updated.', this.toasterconfig);
      this.addConnectorModal.hide();
    }, err => {
      if (err.error.statusCode === 401) {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.warning('Ouch', 'Could not connect to Sigfox. Are the API credentials correct?', this.toasterconfig);
      } else {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
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

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['connector']);
    this.rtHandler = this.rt.addListener("connector", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }
}
