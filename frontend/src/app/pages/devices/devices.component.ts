import {AppSetting, Category, Connector, Device, Geoloc, Organization, Parser, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {
  AppSettingApi,
  DeviceApi,
  MessageApi,
  OrganizationApi,
  ParserApi,
  UserApi
} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../shared/realtime/realtime.service";

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private user: User;

  public filterQuery = '';

  public organization: Organization;
  private organizations: Organization[] = [];

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('confirmDBModal') confirmDBModal: any;
  @ViewChild('confirmParseModal') confirmParseModal: any;
  @ViewChild('shareDeviceWithOrganizationModal') shareDeviceWithOrganizationModal: any;

  // Flags
  public devicesReady = false;

  private isCircleVisible: boolean[] = [];

  private connectors: Connector[] = [];

  private showDeviceSuccessRate: AppSetting;

  private organizationRouteSub: Subscription;

  private categories: Category[] = [];
  public devices: Device[] = [];
  private parsers: Parser[] = [];

  public deviceToEdit: Device = new Device();
  public deviceToRemove: Device = new Device();

  public selectOrganizations: Array<any> = [];
  public selectedOrganizations: Array<any> = [];

  public edit = false;
  private loadingFromBackend = false;
  private loadingParseMessages = false;
  private loadingDownload = false;

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  public selectOrganizationsSettings = {
    singleSelection: false,
    text: 'Select organizations',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-organization'
  };

  // Pagination
  public numberOfDevicesToSee = 10;
  private pageOfDevicesToSee = 0;

  private api;
  private id;

  constructor(private rt: RealtimeService,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private parserApi: ParserApi,
              private appSettingApi: AppSettingApi,
              private deviceApi: DeviceApi,
              private elRef: ElementRef,
              toasterService: ToasterService,
              @Inject(DOCUMENT) private document: any,
              private messageApi: MessageApi,
              private route: ActivatedRoute,
              private http: HttpClient) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Devices: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Get the user connectors
    this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
    });

    // Get app settings
    this.appSettingApi.findById('showDeviceSuccessRate').subscribe((appSetting: AppSetting) => {
      this.showDeviceSuccessRate = appSetting;
    });

    // Hide all circles by default
    this.setCircles();

    // Check if organization view
    this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
      if (parentParams.id) {
        this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.setup();
        });
      } else {
        this.setup();
      }
    });
  }

  download(type: string) {
    this.loadingDownload = true;
    const url = 'https://api.' + this.document.location.hostname + '/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
    //const url = 'http://localhost:3000/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

    this.http.get(url, {responseType: 'blob'}).subscribe(res => {
      const blob: Blob = new Blob([res], {type: 'text/csv'});
      const today = moment().format('YYYY.MM.DD');
      const filename = today + '_' + this.deviceToEdit.id + '_export.csv';
      saveAs(blob, filename);
      this.loadingDownload = false;
    }, err => {
      console.log(err);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Server error');
      this.loadingDownload = false;
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

  setup(): void {
    this.unsubscribe();
    this.subscribe();
    console.log('Setup Devices');

    const filter = {
      where: {},
      limit: 1000,
      order: 'messagedAt DESC',
      include: ['Parser', 'Category', 'Organizations', {
        relation: 'Messages',
        scope: {
          limit: 1,
          order: 'createdAt DESC',
          include: [{
            relation: 'Geolocs',
            scope: {
              order: 'createdAt DESC'
            }
          }]
        }
      }]
    };

    this.api = this.organization ? this.organizationApi : this.userApi;
    this.id = this.organization ? this.organization.id : this.user.id;

    this.api.getDevices(this.id, filter).subscribe((devices: Device[]) => {
      this.devices = devices;
      this.devicesReady = true;
    });

    this.parserApi.find({order: 'createdAt DESC'}).subscribe((result: any) => {
      this.parsers = result;
    });
    this.api.getCategories(this.id).subscribe((result: any) => {
      this.categories = result;
    });
  }

  ngOnDestroy(): void {
    console.log('Devices: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
    this.unsubscribe();
  }

  editDevice(device): void {
    this.edit = true;
    this.deviceToEdit = device;
  }

  updateDevice(): void {
    this.edit = false;
    this.api.updateByIdDevices(this.id, this.deviceToEdit.id, this.deviceToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device was successfully updated.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
    });
  }

  updateDeviceCategory(): void {
    console.log(this.deviceToEdit.categoryId);
    if (this.deviceToEdit.categoryId) {
      this.api.findByIdCategories(this.id, this.deviceToEdit.categoryId).subscribe((category: Category) => {
        console.log(category);
        this.deviceToEdit.properties = category.properties;
      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
      });
    }

    console.log(this.deviceToEdit);
    // this.deviceRef.upsert(device).subscribe();
  }

  showRetrievalModal(): void {
    this.confirmDBModal.show();
  }

  showParseModal(): void {
    this.confirmParseModal.show();
  }

  retrieveMessages(deviceId: string, limit: number, before: number): void {
    this.userApi.getConnectors(this.user.id, {where: {type: 'sigfox-api'}}).subscribe((connectors: Connector[]) => {
      if (connectors.length > 0) {
        this.loadingFromBackend = true;
        this.deviceApi.getMessagesFromSigfoxBackend(deviceId, null, before ? before : null, null).subscribe(result => {
          console.log(result);
          if (result.paging.next) {
            const before = result.paging.next.substring(result.paging.next.indexOf('before=') + 7);
            this.retrieveMessages(deviceId, null, before);
          } else {
            console.log('Finished process');
            this.loadingFromBackend = false;
            if (this.toast)
              this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'Retrieved messages from Sigfox Backend complete.');
          }
        }, err => {
          if (this.toast)
            this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
          this.toast = this.toasterService.pop('error', 'Error', err.message.message);
          this.loadingFromBackend = false;
        });
        this.confirmDBModal.hide();
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Warning', 'Please refer your Sigfox API credentials in the connectors page first.');
      }
    });
  }

  parseAllMessages(deviceId: string): void {
    this.loadingParseMessages = true;
    // Disconnect real-time to avoid app crashing
    this.parserApi.parseAllMessages(deviceId, null, null).subscribe(result => {
      this.loadingParseMessages = false;
      if (result.message === 'Success') {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'All the messages were successfully parsed.');
      } else {
        this.loadingParseMessages = false;
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Warning', result.message);
      }
    });
    this.confirmParseModal.hide();
  }

  zoomOnDevice(geoloc: Geoloc): void {
    window.scrollTo(0, 0);
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

  cancel(): void {
    this.edit = false;
  }

  showRemoveModal(device: Device): void {
    this.confirmModal.show();
    this.deviceToRemove = device;
  }

  remove(): void {
    this.userApi.destroyByIdDevices(this.user.id, this.deviceToRemove.id).subscribe(value => {
      this.edit = false;
      this.confirmModal.hide();
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device and its messages were successfully deleted.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
    });
  }

  showShareDeviceWithOrganizationModal(): void {
    this.selectOrganizations = [];
    this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.organizations.forEach(organization => {
        const item = {
          id: organization.id,
          itemName: organization.name
        };
        let addOrganization = true;
        this.deviceToEdit.Organizations.forEach(deviceOrganization => {
          if (deviceOrganization.id === organization.id) {
            addOrganization = false;
            return;
          }
        });
        if (addOrganization) {
          this.selectOrganizations.push(item);
        }
      });
      this.shareDeviceWithOrganizationModal.show();
    });
  }

  shareDeviceWithOrganization(deviceId): void {
    this.selectedOrganizations.forEach(orga => {
      this.deviceApi.linkOrganizations(deviceId, orga.id).subscribe(results => {
        console.log(results);
        this.shareDeviceWithOrganizationModal.hide();
        this.organizationApi.findById(orga.id).subscribe((org: Organization) => {
          this.deviceToEdit.Organizations.push(org);
        });
        // if(this.deviceToEdit.Organizations){
        //
        // }

      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', err.error);
      });
    });
  }

  unshare(orga, device, index): void {
    this.deviceApi.unlinkOrganizations(device.id, orga.id).subscribe(results => {
      console.log(results);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device has been removed from ' + orga.name + '.');
      this.deviceToEdit.Organizations.splice(index, 1);
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.message);
    });
  }

  // getOrganizations(): void {
  //   this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
  //     this.organizations = organizations;
  //     console.log(organizations);
  //   });
  // }
  rtHandler = (payload: any) => {
    const device = payload.content;
    if ((device.userId && !this.organization) || device.Organizations.map(x => x.id).includes(this.organization.id)) {
      if (payload.action == "CREATE") {
        this.devices.unshift(payload.content);
      } else if (payload.action == "DELETE") {
        this.devices = this.devices.filter(function (device) {
          return device.id !== payload.content.id;
        });
      } else if (payload.action == "UPDATE") {
        let idx = this.devices.findIndex(x => x.id == payload.content.id);
        if (idx != -1) {
          // keep geolocs, payload does not have geoloc inside message
          if (this.devices[idx].Messages[0]) {
            const lastMsg = this.devices[idx].Messages[0];
            if (device && device.Messages[0] && device.Messages[0].id == lastMsg.id) {
              device.Messages[0] = lastMsg;
            }
          }
          this.devices[idx] = payload.content;
        }
      }
    }
  };

  rtLastMessageHandler = (payload: any) => {
    if (payload.action == "CREATE" || payload.action == "UPDATE") {
      let idx = this.devices.findIndex(x => x.id == payload.content.Device.id);
      if (idx != -1) {
        let updatedDevice = this.devices[idx];
        updatedDevice.Messages = [payload.content];
        this.devices[idx] = updatedDevice;
      }
    }
  };

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
    }
  };


  subscribe(): void {
    this.rtHandler = this.rt.addListener("device", this.rtHandler);
    this.rtLastMessageHandler = this.rt.addListener("message", this.rtLastMessageHandler);
    this.geolocHandler = this.rt.addListener("geoloc", this.geolocHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
    this.rt.removeListener(this.rtLastMessageHandler);
    this.rt.removeListener(this.geolocHandler);
  }
}
