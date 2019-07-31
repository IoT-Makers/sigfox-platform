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
import {
  Component,
  ElementRef,
  Inject, Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {Observable} from "rxjs";
import {DataFilterPipe} from "./datafilterpipe";

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
  @ViewChild('selectColumnsToDownloadModal') selectColumnsToDownloadModal: any;

  // Flags
  private isCircleVisible: boolean[] = [];

  private connectors: Connector[] = [];

  private showDeviceSuccessRate: AppSetting;

  private organizationRouteSub: Subscription;

  private categories: Category[] = [];
  public displayedDevices: Device[] = [];
  private parsers: Parser[] = [];

  public deviceToEdit: Device = new Device();
  public deviceToRemove: Device = new Device();

  public selectOrganizations: Array<any> = [];
  public selectedOrganizations: Array<any> = [];

  public selectColumns: Array<any> = [];
  public selectedColumns: Array<any> = [];

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

  public selectColumnsSettings = {
    singleSelection: false,
    text: 'Select columns',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-column'
  };


  // Pagination
  rowsOnPage = 15;
  activePage = 1;
  total: number;
  loading: boolean;
  searchFilter: string;

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

  download(type: string, tosend: string) {
    this.loadingDownload = true;

    if(this.selectedColumns.length !== 0){
      let tab : any = [];
      let tabid : any = [];
      
      this.selectedColumns.forEach(column => {
          tab.push(column);
      });
      tab.forEach(p => {
          tabid.push(p.id);
      });

      tosend = tabid;

      const url = 'https://api.' + this.document.location.hostname + '/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '/' + tosend + '?access_token=' + this.userApi.getCurrentToken().id;
      //const url = 'http://localhost:3000/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '/' + tosend + '?access_token=' + this.userApi.getCurrentToken().id;

      this.http.get(url, {responseType: 'blob'}).subscribe(res => {
        this.selectColumnsToDownloadModal.hide();
        const blob: Blob = new Blob([res], {type: 'text/csv'});
        const today = moment().format('YYYYMMDD');
        const filename = this.deviceToEdit.id + '_' + today + '.csv';
        saveAs(blob, filename);
        this.loadingDownload = false;
      }, err => {
        console.log(err);
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Server error');
        this.loadingDownload = false;
      });
    }else this.loadingDownload = false;
  }


  getColumns(type: string) {
    this.loadingDownload = true;
    this.selectedColumns = [];
    const url = 'https://api.' + this.document.location.hostname + '/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
    //const url = 'http://localhost:3000/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

    this.http.get(url).timeout(600000).subscribe((res: any[]) => {
      this.selectColumns = [];
      res.forEach(r => {
          console.log("sous champ:",r);
          const item2 = {
              id: r,
              itemName: r
            };
          this.selectColumns.push(item2);
          if (item2.id === "Date_LRT" || item2.id === "ID_LRT" || item2.id === "Name_LRT" || item2.id === "Sex_LRT" || item2.id === "Age_LRT" || item2.id === "Time_LRT" || item2.id === "South_LRT" || item2.id === "East_LRT" || item2.id === "UTM_LRT" || item2.id === "Area_LRT" || item2.id === "EVENT_LRT" || item2.id === "deviceId_LRT" || item2.id === "Notes_LRT" || item2.id === "gps_acq_LRT" || item2.id === "sat_LRT" || item2.id === "hdop_LRT" || item2.id === "speed_LRT" || item2.id === "battery_LRT" || item2.id === "seqNumber_LRT" || item2.id === "timestamp_LRT" || item2.id === "RSSI_LRT"  || item2.id === "Geoloc type_LRT"){
            item2.itemName = item2.itemName.replace('_LRT','');
            item2.id = item2.id.replace('_LRT','');
            this.selectedColumns.push(item2);
          }
      });
    
    this.loadingDownload = false;
    this.selectColumnsToDownloadModal.show();
  });
  }

  setCircles() {
    for (let i = 0; i < this.displayedDevices.length; i++) {
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
    this.api = this.organization ? this.organizationApi : this.userApi;
    this.id = this.organization ? this.organization.id : this.user.id;
    this.unsubscribe();
    this.subscribe();

    this.getPage(1);
    this.parserApi.find({order: 'createdAt DESC'}).subscribe((result: any) => {
      this.parsers = result;
    });
    this.api.getCategories(this.id).subscribe((result: any) => {
      this.categories = result;
    });
  }

  private queryFilter = {
    where: {},
    limit: this.rowsOnPage,
    skip: 0, //this.rowsOnPage * (page - 1),
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

  private loadDevice(page: number): Observable<any> {
    this.queryFilter.skip = this.rowsOnPage * (page - 1);
    this.api.countDevices(this.id, this.queryFilter.where).subscribe((result: any) => {
      this.total = result.count;
    });
    return this.api.getDevices(this.id, this.queryFilter);
  }

  getPage(page: number) {
    this.loading = true;
    this.loadDevice(page).subscribe((r:any) => {
      this.loading = false;
      this.activePage = page;
      this.displayedDevices = r;
    });
  }

  // search box
  timer: number;
  onKey(event: KeyboardEvent, value: string) { // with type info
    if (event.key === "Enter") return;
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.search(value);
    },500);
  }

  search(value: string) {
    this.searchFilter = value;
    clearInterval(this.timer);
    this.queryFilter.where = {or: [{id: {regexp: `/.*${value}.*/i`}}, {name: {regexp: `/.*${value}.*/i`}}]};
    this.getPage(1);
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

  rtHandler = (payload: any) => {
    const device = payload.content;
    if (device.userId == this.user.id || (this.organization && device.Organizations.map(x => x.id).includes(this.organization.id))) {
      if (payload.action == "CREATE") {
        if (this.activePage !== 1) return;
        if (this.displayedDevices.length === this.rowsOnPage)
          this.displayedDevices.pop();
        this.displayedDevices.unshift(payload.content);
        // apply search filter
        this.displayedDevices = new DataFilterPipe().transform(this.displayedDevices, this.searchFilter);
      } else if (payload.action == "DELETE") {
        this.displayedDevices = this.displayedDevices.filter(function (device) {
          return device.id !== payload.content.id;
        });
      } else if (payload.action == "UPDATE") {
        let idx = this.displayedDevices.findIndex(x => x.id == payload.content.id);
        if (idx != -1) {
          // keep geolocs, payload does not have geoloc inside message
          if (this.displayedDevices[idx].Messages[0]) {
            const lastMsg = this.displayedDevices[idx].Messages[0];
            if (device && device.Messages[0] && device.Messages[0].id == lastMsg.id) {
              device.Messages[0] = lastMsg;
            }
          }
          this.displayedDevices[idx] = payload.content;
        }
      }
    }
  };

  rtLastMessageHandler = (payload: any) => {
    if (payload.action == "CREATE" || payload.action == "UPDATE") {
      let idx = this.displayedDevices.findIndex(x => x.id == payload.content.Device.id);
      if (idx != -1) {
        let updatedDevice = this.displayedDevices[idx];
        updatedDevice.Messages = [payload.content];
        this.displayedDevices[idx] = updatedDevice;
      }
    }
  };

  geolocHandler = (payload: any) => {
    if (payload.action == "CREATE") {
      for (let device of this.displayedDevices) {
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
    this.rt.informCurrentPage(this.id, ['device', 'message', 'geoloc']);
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
