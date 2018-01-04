import {Alert, Category, Connector, Device, FireLoopRef, Geoloc, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {DeviceApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('confirmDBModal') confirmDBModal: any;
  @ViewChild('confirmParseModal') confirmParseModal: any;

  private isCircleVisible: boolean[] = [];

  private device: Device = new Device();
  private newAlert: Alert = new Alert();
  private parser: Parser = new Parser();
  private category: Category = new Category();
  private connectors: Connector[] = [];

  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;

  private devices: Device[] = [];
  private parsers: Parser[] = [];
  private categories: Category[] = [];

  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private deviceToEdit: Device = new Device();
  private deviceToRemove: Device = new Device();

  private edit = false;
  private loadingFromBackend = false;
  private parseMessages = false;

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

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private elRef: ElementRef,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.warn('Devices: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Get the user connectors
    this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
    });

    this.edit = false;
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
    // this.ngOnDestroy();

    // Get and listen devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceSub = this.deviceRef.on('change',
      {
        limit: 1000,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category'],
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
    console.warn('Devices: ngOnDestroy');
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

  addAlert(newAlert: Alert): void {
    if (newAlert.connectorId === '' || newAlert.key === '') {
      this.toasterService.pop('error', 'Error', 'Please select a connector and a key.');
    } else {
      if (!this.deviceToEdit.alerts)
        this.deviceToEdit.alerts = [];
      this.deviceToEdit.alerts.push(newAlert);
      this.toasterService.pop('success', 'Success', 'The alert was successfully created.');
      this.newAlert = new Alert();
    }
  }

  removeAlert(index: number): void {
    this.deviceToEdit.alerts.splice(index, 1);
    this.toasterService.pop('success', 'Success', 'The alert was successfully removed.');
  }

  updateDevice(): void {
    this.edit = false;
    this.deviceToEdit.CategoryId = this.deviceToEdit.categoryId;
    // @TODO change parserId to ParserID to be able to fetch devices from parser model, don't forget to update the API consequently and to test it!
    this.deviceToEdit.ParserId = this.deviceToEdit.parserId;
    /*if(device.ParserId.toString() == 'None')*/
    this.deviceRef.upsert(this.deviceToEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The device was successfully updated.');
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  updateDeviceCategory(): void {
    console.log(this.deviceToEdit.categoryId);
    if (this.deviceToEdit.categoryId) {
      this.userApi.findByIdCategories(this.user.id, this.deviceToEdit.categoryId).subscribe((category: Category) => {
        console.log(category);
        this.deviceToEdit.properties = category.properties;
        this.toasterService.pop('success', 'Success', 'The category was successfully updated.');
      }, err => {
        this.toasterService.pop('error', 'Error', err.error.message);
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
    this.loadingFromBackend = true;
    this.deviceApi.getMessagesFromSigfoxBackend(deviceId, null, before ? before : null, null).subscribe(result => {
      console.log(result);
      if (result.paging.next) {
        const before = result.paging.next.substring(result.paging.next.indexOf('before=') + 7);
        this.retrieveMessages(deviceId, null, before);
      } else {
        console.log('Finished process');
        this.loadingFromBackend = false;
        this.toasterService.pop('success', 'Success', 'Retrieved messages from Sigfox Backend complete');
      }
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmDBModal.hide();
  }

  parseAllMessages(deviceId: string): void {
    this.parseMessages = true;
    this.deviceApi.parseAllMessages(deviceId, null, null).subscribe(result => {
      this.parseMessages = false;
      if(result.message === 'Success') {
        this.toasterService.pop('success', 'Success', 'All the messages were successfully parsed.');
      }else{
        this.toasterService.pop('warning', 'Warning', result.message);
      }

      // console.log(result);
    });
    this.confirmParseModal.hide();
  }

  zoomOnDevice(elementId: string, geoloc: Geoloc): void {
    window.scrollTo(0, 0);
    this.agmInfoWindow.forEach((child) => {
      // console.log(child['_el'].nativeElement.id);
      if (child['_el'].nativeElement.id === elementId)
        child.open();
      else
        child.close();
    });

    this.mapLat = geoloc.lat;
    this.mapLng = geoloc.lng;
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
    this.deviceApi.deleteDeviceAndMessages(this.deviceToRemove.id).subscribe(value => {
      const index = this.devices.indexOf(this.deviceToRemove);
      this.devices.splice(index, 1);
      this.toasterService.pop('success', 'Success', 'The device and its messages were successfully deleted.');
    }, err => {
      this.toasterService.pop('error', 'Error', err.error.message);
    });
    /*this.userApi.deleteMessages().subscribe(value => {
      this.deviceRef.remove(this.deviceToRemove).subscribe();
    });*/
    this.confirmModal.hide();
  }
}

