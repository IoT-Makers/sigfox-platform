import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Device, FireLoopRef, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmModal') confirmModal: any;

  private device: Device = new Device();

  private category: Category = new Category();
  private categoryToRemove: Category = new Category();
  private categorySub: Subscription;

  private devices: Device[] = [];
  private categories: Category[] = [];

  private categoryRef: FireLoopRef<Category>;

  private edit = false;
  private categoryToEdit: Category = new Category();
  private newCategory = false;

  public propertyType = ['string', 'number', 'geoloc', 'date', 'boolean'];

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
              private categoryApi: CategoryApi,
              private deviceApi: DeviceApi,
              private userApi: UserApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    console.log('Categories: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.edit = false;
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
    // this.ngOnDestroy();

    // Get and listen categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('change',
      {
        include: ['Devices'],
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(this.categories);
    });
  }

  openConfirmModal(category): void {
    this.categoryToRemove = category;
    this.confirmModal.show();
  }

  editCategory(category: Category): void {
    this.edit = true;
    if (category) {
      this.categoryToEdit = category;
    } else {
      this.categoryToEdit = new Category();
      delete this.categoryToEdit.id;
      this.categoryToEdit.userId = this.user.id;
    }
    console.log(this.categoryToEdit);
  }

  cancel(): void {
    this.edit = false;
  }

  update(): void {
    this.edit = false;

    this.categoryRef.upsert(this.categoryToEdit).subscribe((category: Category) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Category was successfully updated.');
    }, error => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Please fill in the category name.');
    });
  }

  addProperty(): void {
    const property: any = {
      key: '',
      value: '',
      type: 'string'
    };

    this.categoryToEdit.properties.push(property);
  }

  removeProperty(index: number): void {
    this.categoryToEdit.properties.splice(index, 1);
  }

  remove(): void {
    this.categoryRef.remove(this.categoryToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Category was successfully removed.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmModal.hide();
  }

  ngOnDestroy(): void {
    console.log('Categories: ngOnDestroy');

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

}
