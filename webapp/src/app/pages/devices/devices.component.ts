import {Category, Connector, Device, FireLoopRef, Geoloc, Message, Organization, Parser, Property, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {DeviceApi, OrganizationApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Angular2Csv} from 'angular2-csv';
import * as moment from 'moment';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private user: User;

  private organization: Organization;
  private organizations: Organization[] = [];

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('confirmDBModal') confirmDBModal: any;
  @ViewChild('confirmParseModal') confirmParseModal: any;
  @ViewChild('shareDeviceWithOrganizationModal') shareDeviceWithOrganizationModal: any;

  private isCircleVisible: boolean[] = [];

  private connectors: Connector[] = [];

  private categorySub: Subscription;
  private deviceSub: Subscription;
  private parserSub: Subscription;

  private categories: Category[] = [];
  private devices: Device[] = [];
  private parsers: Parser[] = [];

  private categoryRef: FireLoopRef<Category>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;

  private deviceToEdit: Device = new Device();
  private deviceToRemove: Device = new Device();

  private selectOrganizations: Array<any> = [];
  private selectedOrganizations: Array<any> = [];

  private edit = false;
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

  private selectOrganizationsSettings = {
    singleSelection: false,
    text: 'Select organizations',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-category'
  };

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private deviceApi: DeviceApi,
              private elRef: ElementRef,
              toasterService: ToasterService) {
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

    // Hide all circles by default
    this.setCircles();
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

  downloadCsv() {
    this.loadingDownload = true;

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      headers: []
    };

    this.userApi.getMessages(this.user.id, {
      where: {deviceId: this.deviceToEdit.id},
      include: ['Geolocs']
    }).subscribe((messages: Message[]) => {
      const data: any = [];

      messages.forEach((message: Message, i) => {
        const obj: any = {};
        if (options.headers.indexOf('seqNumber') === -1) {
          options.headers.push('seqNumber');

          options.headers.push('createdAt');
          options.headers.push('createdAt_old');
          options.headers.push('year');
          options.headers.push('month');
          options.headers.push('day');
          options.headers.push('hours');
          options.headers.push('minutes');
          options.headers.push('seconds');

          options.headers.push('data');
          options.headers.push('ack');
          options.headers.push('data_downlink');
        }
        obj.seqNumber = message.seqNumber;

        obj.createdAt = moment(message.createdAt).format('YYYY-MM-DD HH:mm:ss');
        obj.createdAt_old = message.createdAt;
        obj.year = new Date(message.createdAt).getFullYear();
        obj.month = new Date(message.createdAt).getMonth() + 1;
        obj.day = new Date(message.createdAt).getDate();
        obj.hours = new Date(message.createdAt).getHours();
        obj.minutes  = new Date(message.createdAt).getMinutes();
        obj.seconds = new Date(message.createdAt).getSeconds();

        obj.data = message.data;
        obj.ack = message.ack;
        obj.data_downlink = message.data_downlink;

        message.data_parsed.forEach((p: Property) => {
          if (options.headers.indexOf(p.key) === -1) {
            options.headers.push(p.key);
          }
          obj[p.key] = p.value;
        });
        message.Geolocs.forEach((geoloc: Geoloc) => {
          if (options.headers.indexOf('lat_' + geoloc.type) === -1) {
            options.headers.push('lat_' + geoloc.type);
            options.headers.push('lng_' + geoloc.type);
            options.headers.push('precision_' + geoloc.type);
          }
          obj['lat_' + geoloc.type] = geoloc.location.lat;
          obj['lng_' + geoloc.type] = geoloc.location.lng;
          obj['precision_' + geoloc.type] = geoloc.precision;
        });
        data.push(obj);
      });
      const today = moment().format('YYYY.MM.DD');
      const filename = today + '_' + this.deviceToEdit.id + '_export';
      new Angular2Csv(data, filename, options);
      this.loadingDownload = false;
    }, (err: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
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
    // Get and listen devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceSub = this.deviceRef.on('change',
      {
        limit: 100,
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
        }],
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((devices: Device[]) => {
      this.devices = devices;
      console.log(this.devices);
    });

    // Get and listen parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserSub = this.parserRef.on('change').subscribe((parsers: Parser[]) => {
      this.parsers = parsers;
      console.log(this.parsers);
    });

    // Get and listen categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change',
      {
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  ngOnDestroy(): void {
    console.log('Devices: ngOnDestroy');
    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();

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
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
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
        this.toast = this.toasterService.pop('error', 'Error', err.error.message);
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
    this.deviceApi.parseAllMessages(deviceId, null, null).subscribe(result => {
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
      //this.rt.onReady().subscribe();
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
    this.deviceApi.deleteDeviceMessagesAlertsGeolocs(this.deviceToRemove.id).subscribe(value => {
      const index = this.devices.indexOf(this.deviceToRemove);
      this.devices.splice(index, 1);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device and its messages were successfully deleted.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmModal.hide();
  }

  showShareDeviceWithOrganizationModal(): void{
    this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      console.log(organizations);
      this.organizations.forEach(result => {
        const item = {
          id: result.id,
          itemName: result.name
        };
        this.selectOrganizations.push(item);
      });
      this.shareDeviceWithOrganizationModal.show();
    });
  }

  shareDeviceWithOrganization(deviceId): void{
    console.log(this.selectedOrganizations);
    console.log(deviceId);
    this.selectedOrganizations.forEach(orga => {
      this.organizationApi.linkDevices(orga.id, deviceId).subscribe(results => {
        console.log(results);
        this.shareDeviceWithOrganizationModal.hide();
        this.organizationApi.findById(orga.id).subscribe((org: Organization) => {
          this.deviceToEdit.Organizations.push(org);
        });
        // if(this.deviceToEdit.Organizations){
        //
        // }

      });
    });
  }

  unshare(orga, device, index): void {
    this.organizationApi.unlinkDevices(orga.id, device.id).subscribe(results => {
      console.log(results);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device has been removed from ' + orga.name + '.');
      this.deviceToEdit.Organizations.slice(index);
    });
  }

  // getOrganizations(): void {
  //   this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
  //     this.organizations = organizations;
  //     console.log(organizations);
  //   });
  // }
}

