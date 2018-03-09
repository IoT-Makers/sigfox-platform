import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Device, FireLoopRef, Organization, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, RealTime, UserApi, OrganizationApi} from '../../shared/sdk/services';
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
  @ViewChild('shareCategoryWithOrganizationModal') shareCategoryWithOrganizationModal: any;

  private device: Device = new Device();

  private category: Category = new Category();
  private categoryToRemove: Category = new Category();
  private categorySub: Subscription;

  private devices: Device[] = [];
  private categories: Category[] = [];

  private organization: Organization;
  private organizations: Organization[] = [];

  private selectOrganizations: Array<any> = [];
  private selectedOrganizations: Array<any> = [];

  private categoryRef: FireLoopRef<Category>;

  private edit = false;
  private categoryToEdit: Category = new Category();
  private newCategory = false;

  private shareAssociatedDevices: boolean = false;

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

  private selectOrganizationsSettings = {
    singleSelection: false,
    text: 'Select organizations',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-category'
  };

  constructor(private rt: RealTime,
              private categoryApi: CategoryApi,
              private deviceApi: DeviceApi,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
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
        include: ['Devices', 'Organizations'],
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


  showShareCategoryWithOrganizationModal(category): void{
    this.categoryToEdit = category;
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
      this.shareCategoryWithOrganizationModal.show();
    });


  }

  shareCategoryWithOrganization(category, shareAssociatedDevices): void{
    console.log(this.selectedOrganizations);
    console.log(category);
    this.selectedOrganizations.forEach(orga => {
      this.organizationApi.linkCategories(orga.id, category.id).subscribe(results => {
        console.log(results);
        if(shareAssociatedDevices && category.Devices.length > 0){
          category.Devices.forEach(device => {
            this.selectedOrganizations.forEach(orga => {
              this.organizationApi.linkDevices(orga.id, device.id).subscribe(results => {
                console.log(results);

              });
            });
          })
        }
        this.shareCategoryWithOrganizationModal.hide();
        this.organizationApi.findById(orga.id).subscribe((org: Organization) => {
          this.categoryToEdit.Organizations.push(org);
        });

      });
    });
  }

  unshare(orga, category, index): void {
    this.organizationApi.unlinkCategories(orga.id, category.id).subscribe(results => {
      console.log(results);
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The category has been removed from ' + orga.name + '.');
      this.categoryToEdit.Organizations.slice(index);
    });
  }


  ngOnDestroy(): void {
    console.log('Categories: ngOnDestroy');

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

}
