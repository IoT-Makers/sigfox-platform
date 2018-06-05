import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Device, FireLoopRef, Organization, User} from '../../shared/sdk/models';
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
  public categoriesReady = false;

  private loadingDownload = false;

  private device: Device = new Device();

  private category: Category = new Category();
  public categoryToRemove: Category = new Category();
  private categorySub: Subscription;

  private devices: Device[] = [];
  public categories: Category[] = [];

  private organizationRouteSub: Subscription;
  public organization: Organization;
  private organizations: Organization[] = [];

  public selectOrganizations: Array<any> = [];
  public selectedOrganizations: Array<any> = [];

  private userRef: FireLoopRef<User>;
  private organizationRef: FireLoopRef<Organization>;
  private categoryRef: FireLoopRef<Category>;
  private categoryOrgaRef: FireLoopRef<Category>;

  public edit = false;
  public categoryToEdit: Category = new Category();
  private newCategory = false;

  public shareAssociatedDevices = false;

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

  public selectOrganizationsSettings = {
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

  setup(): void {
    this.cleanSetup();

    // Get and listen categories
    const filter = {
      order: 'updatedAt DESC',
      include: ['Devices', 'Organizations'],
    };

    this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
    this.categoryRef = this.userRef.child<Category>('Categories');

    if (!this.organization) {
      this.categorySub = this.categoryRef.on('change', filter).subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesReady = true;
      });
    } else {
      this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);
      this.categoryOrgaRef = this.organizationRef.child<Category>('Categories');
      this.categorySub = this.categoryOrgaRef.on('change', filter).subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoriesReady = true;
      });
    }
  }

  downloadFromOrganization(organizationId: string, category: Category, type: string): void {
    this.loadingDownload = true;
    const url = this.document.location.origin + '/api/Categories/download/' + organizationId + '/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
    //const url = 'http://localhost:3000/api/Categories/download/' + organizationId + '/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

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
    //const url = 'http://localhost:3000/api/Categories/download/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

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
    }
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
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
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
      this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
    });
    this.confirmModal.hide();
  }

  showShareCategoryWithOrganizationModal(category): void {
    this.categoryToEdit = category;
    this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.selectOrganizations = [];
      console.log(organizations);
      this.organizations.forEach(organization => {
        const item = {
          id: organization.id,
          itemName: organization.name
        };

        let addOrganization = true;
        category.Organizations.forEach(categoryOrganization => {
          if (categoryOrganization.id === organization.id) {
            addOrganization = false;
            return;
          }
        });
        if (addOrganization) {
          this.selectOrganizations.push(item);
        }
      });
      this.shareCategoryWithOrganizationModal.show();
    });
  }

  shareCategoryWithOrganization(category, shareAssociatedDevices): void {
    this.selectedOrganizations.forEach(orga => {
      this.categoryApi.linkOrganizations(category.id, orga.id).subscribe(results => {
        console.log(results);
        if (shareAssociatedDevices && category.Devices.length > 0) {
          category.Devices.forEach(device => {
            this.selectedOrganizations.forEach(orga => {
              this.deviceApi.linkOrganizations(device.id, orga.id).subscribe(results => {
                console.log(results);
              });
            });
          });
        }
        this.shareCategoryWithOrganizationModal.hide();
        this.organizationApi.findById(orga.id).subscribe((org: Organization) => {
          this.categoryToEdit.Organizations.push(org);
        });

      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', err.message);
      });
    });
  }

  unshare(orga, category, index): void {
    this.categoryApi.unlinkOrganizations(category.id, orga.id).subscribe(results => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The category has been removed from ' + orga.name + '.');
      this.categoryToEdit.Organizations.splice(index, 1);
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.message);
    });
  }


  ngOnDestroy(): void {
    console.log('Categories: ngOnDestroy');
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();
    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categoryOrgaRef) this.categoryOrgaRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }

}
