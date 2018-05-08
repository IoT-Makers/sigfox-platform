import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Alert, Category, Device, FireLoopRef, Organization, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, OrganizationApi, RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('shareCategoryWithOrganizationModal') shareCategoryWithOrganizationModal: any;

  // Flags
  private categoriesReady = false;

  private loadingDownload = false;

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

  private userRef: FireLoopRef<User>;
  private organizationRef: FireLoopRef<Organization>;
  private categoryRef: FireLoopRef<Category>;

  private edit = false;
  private categoryToEdit: Category = new Category();
  private newCategory = false;

  private shareAssociatedDevices = false;

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
    classes: 'select-organization'
  };

  constructor(private rt: RealTime,
              private categoryApi: CategoryApi,
              private deviceApi: DeviceApi,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              toasterService: ToasterService,
              private route: ActivatedRoute,
              @Inject(DOCUMENT) private document: any,
              private http: HttpClient) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    console.log('Categories: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.edit = false;

    // Check if organization view
    this.route.parent.parent.params.subscribe(parentParams => {
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

  setup(): void {
    this.ngOnDestroy();

    // Get and listen categories
    const filter = {
      include: ['Devices', 'Organizations'],
    };

    if (!this.organization) {
      this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
      this.categoryRef = this.userRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change', filter).subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesReady = true;
      });
    } else {
      this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);
      this.categoryRef = this.organizationRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change', filter).subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesReady = true;
      });
    }
  }

  downloadFromOrganization(organizationId: string, category: Category, type: string): void {
    this.loadingDownload = true;
    const url = this.document.location.origin + '/api/Categories/download/' + organizationId + '/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

    this.http.get(url, {responseType: 'blob'}).timeout(600000).subscribe(res => {
      const blob: Blob = new Blob([res], {type: 'text/csv'});
      const today = moment().format('YYYY.MM.DD');
      const filename = today + '_' + category.name + '_export.csv';
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

  download(category: Category, type: string): void {
    this.loadingDownload = true;
    const url = this.document.location.origin + '/api/Categories/download/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

    this.http.get(url, {responseType: 'blob'}).timeout(600000).subscribe(res => {
      const blob: Blob = new Blob([res], {type: 'text/csv'});
      const today = moment().format('YYYY.MM.DD');
      const filename = today + '_' + category.name + '_export.csv';
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
      /*// Unlink categories
      this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
        organizations.forEach((orga: Organization) => {
          this.organizationApi.unlinkCategories(orga.id, this.categoryToRemove.id).subscribe(value => {});
        });
      });*/
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

  showShareCategoryWithOrganizationModal(category): void {
    this.categoryToEdit = category;
    this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.selectOrganizations = [];
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
        if (shareAssociatedDevices && category.Devices.length > 0) {
          category.Devices.forEach(device => {
            this.selectedOrganizations.forEach(orga => {
              this.organizationApi.linkDevices(orga.id, device.id).subscribe(results => {
                console.log(results);
              });
            });
          });
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
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();
    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

}
