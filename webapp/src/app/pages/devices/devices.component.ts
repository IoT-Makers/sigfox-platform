import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Alert, Category, Connector, Device, FireLoopRef, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Geoloc} from '../../shared/sdk/models/Geoloc';
import {AgmInfoWindow} from '@agm/core';
import {DeviceApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
  @ViewChild('confirmModal') confirmModal: any;

  private isCircleVisible: boolean[] = new Array<boolean>();

  private device: Device = new Device();
  private parser: Parser = new Parser();
  private category: Category = new Category();
  private connectors: Connector[] = new Array<Connector>();

  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;

  private devices: Device[] = new Array<Device>();
  private parsers: Parser[] = new Array<Parser>();
  private categories: Category[] = new Array<Category>();

  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private deviceToEdit: Device = new Device();
  private deviceToRemove: Device = new Device();

  private edit = false;

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;

  // Notifications
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private elRef: ElementRef,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Get the user connectors
    this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
      this.connectors = connectors;
    });

    this.edit = false;
    // Hide all circles by default
    this.setCircles();

    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }
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
    this.ngOnDestroy();

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
    console.log('Devices: ngOnDestroy');
    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();

    if (this.parserRef)this.parserRef.dispose();
    if (this.parserSub)this.parserSub.unsubscribe();

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }

  editDevice(device): void{
    this.edit = true;
    this.deviceToEdit = device;
  }

  addAlert(): void {
    if (!this.deviceToEdit.alerts)
      this.deviceToEdit.alerts = [];
    this.deviceToEdit.alerts.push(new Alert());
  }

  removeAlert(index: number): void {
    this.deviceToEdit.alerts.splice(index, 1);
  }

  updateDevice(): void {
    this.edit = false;
    this.deviceToEdit.CategoryId = this.deviceToEdit.categoryId;
    // @TODO change parserId to ParserID to be able to fetch devices from parser model, don't forget to update the API consequently and to test it!
    this.deviceToEdit.ParserId = this.deviceToEdit.parserId;
    /*if(device.ParserId.toString() == 'None')*/

    this.deviceRef.upsert(this.deviceToEdit).subscribe(value => {
      this.toasterService.pop('success', 'Success', 'The device was successfully updated.');
    }, error => {
      this.toasterService.pop('error', 'Error', error.message);
    });
  }

  updateDeviceCategory(): void {
    console.log(this.deviceToEdit.categoryId);
    if (this.deviceToEdit.categoryId) {
      this.userApi.findByIdCategories(this.user.id, this.deviceToEdit.categoryId).subscribe((category: Category) => {
        console.log(category);
        this.deviceToEdit.properties_static = category.properties_static;
        this.toasterService.pop('success', 'Success', 'The category was successfully updated.');
      });
    }

    console.log(this.deviceToEdit);
    // this.deviceRef.upsert(device).subscribe();
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

  cancel(): void{
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
    });
    /*this.userApi.deleteMessages().subscribe(value => {
      this.deviceRef.remove(this.deviceToRemove).subscribe();
    });*/
    this.confirmModal.hide();
  }
}

