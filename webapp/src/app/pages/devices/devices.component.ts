import {AppSetting, Category, Connector, Device, FireLoopRef, Geoloc, Organization, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {AppSettingApi, DeviceApi, MessageApi, OrganizationApi, ParserApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import * as moment from 'moment';
import {ActivatedRoute} from '@angular/router';

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

  private appSettings: AppSetting[] = [];

  private organizationRouteSub: Subscription;
  private categorySub: Subscription;
  private deviceSub: Subscription;
  private deviceReadSub: Subscription;
  private parserSub: Subscription;

  private categories: Category[] = [];
  public devices: Device[] = [];
  private parsers: Parser[] = [];

  private userRef: FireLoopRef<User>;
  private organizationRef: FireLoopRef<Organization>;
  private categoryRef: FireLoopRef<Category>;
  private deviceRef: FireLoopRef<Device>;
  private deviceReadRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;

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

  constructor(private rt: RealTime,
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
    this.appSettingApi.find({where: {key: 'showDeviceSuccessRate'}}).subscribe((appSettings: AppSetting[]) => {
      this.appSettings = appSettings;
      console.log(this.appSettings);
    });

    // Hide all circles by default
    this.setCircles();

    // Check if organization view
    this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
      if (parentParams.id) {
        this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
          this.organization = organization;
          // Check if real time and setup
          if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
            this.setup();
          else
            this.rt.onAuthenticated().subscribe(() => this.setup());
        });
      } else {
        // Check if real time and setup
        if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
          this.setup();
        else
          this.rt.onAuthenticated().subscribe(() => this.setup());
      }
    });
  }

  download(type: string) {
    this.loadingDownload = true;
    const url = this.document.location.origin + '/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
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
    this.cleanSetup();
    console.log('Setup Devices');

    const filter = {
      where: {},
      limit: 1000,
      order: 'updatedAt DESC',
      include: ['Parser', 'Category', 'Organizations', {
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
    };

    this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
    this.deviceRef = this.userRef.child<Device>('Devices');

    // Get and listen parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserSub = this.parserRef.on('change').subscribe((parsers: Parser[]) => {
      this.parsers = parsers;
    });
    // Get and listen user categories
    this.categoryRef = this.userRef.child<Category>('Categories');
    this.categorySub = this.categoryRef.on('change').subscribe((categories: Category[]) => {
      this.categories = categories;
    });

    if (this.organization) {
      this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);
      this.deviceRef = this.organizationRef.child<Device>('Devices');
      this.deviceSub = this.deviceRef.on('change', filter).subscribe((devices: Device[]) => {
        this.devices = devices;
        this.devicesReady = true;
      });
    } else {
      this.userApi.countDevices(this.user.id).subscribe((result: any) => {
        if (result.count < 10) {
          filter.where = {userId: this.user.id};
          this.deviceReadRef = this.rt.FireLoop.ref<Device>(Device);
          this.deviceReadSub = this.deviceReadRef.on('change', filter).subscribe((devices: Device[]) => {
            this.devices = devices;
            this.devicesReady = true;
          });
        } else {
          this.deviceSub = this.deviceRef.on('change', filter).subscribe((devices: Device[]) => {
            this.devices = devices;
            this.devicesReady = true;
          });
        }
      });
    }
  }

  ngOnDestroy(): void {
    console.log('Devices: ngOnDestroy');
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();

    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();

    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();
    if (this.deviceReadRef) this.deviceReadRef.dispose();
    if (this.deviceReadSub) this.deviceReadSub.unsubscribe();

    if (this.parserRef) this.parserRef.dispose();
    if (this.parserSub) this.parserSub.unsubscribe();

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

  editDevice(device): void {
    this.edit = true;
    this.deviceToEdit = device;
  }

  updateDevice(): void {
    this.edit = false;
    this.deviceRef.upsert(this.deviceToEdit).subscribe(value => {
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
      this.userApi.findByIdCategories(this.user.id, this.deviceToEdit.categoryId).subscribe((category: Category) => {
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
    this.rt.connection.disconnect();
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
      this.rt.onReady();
      //console.log(result);
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
    // Delete all messages belonging to the device
    this.deviceRef.remove(this.deviceToRemove).subscribe(value => {
      console.log(value);
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

  showShareDeviceWithOrganizationModal(): void{
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
}
