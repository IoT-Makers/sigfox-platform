import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Category, Device, Organization, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, OrganizationApi, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {environment} from "../../../../environments/environment";

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

  public edit = false;
  public categoryToEdit: Category = new Category();
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

  public selectOrganizationsSettings = {
    singleSelection: false,
    text: 'Select organizations',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-organization'
  };

  constructor(private rt: RealtimeService,
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
          this.setup();
        });
      } else {
        this.setup();
      }
    });
  }

  setup(): void {
    const api = this.organization ? this.organizationApi : this.userApi;
    const id = this.organization ? this.organization.id : this.user.id;
    this.cleanSetup();
    this.subscribe(id);
    // Get and listen categories
    const filter = {
      order: 'updatedAt DESC',
      include: ['Devices', 'Organizations'],
    };

    api.getCategories(id, filter).subscribe((categories: Category[]) => {
      this.categories = categories;
      this.categoriesReady = true;
    });
  }

  downloadFromOrganization(organizationId: string, category: Category, type: string): void {
    this.loadingDownload = true;
    const url = environment.apiUrl + '/api/Categories/download/' + organizationId + '/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
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
    const url = environment.apiUrl + '/api/Categories/download/' + category.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
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
      this.newCategory = false;
    } else {
      this.categoryToEdit = new Category();
      this.newCategory = true;
    }
  }

  cancel(): void {
    this.edit = false;
  }

  update(): void {
    this.edit = false;
    if (this.newCategory) {
      // this operation is actually a create
      this.userApi.createCategories(this.user.id, this.categoryToEdit).subscribe((category: Category) => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Category was successfully updated.');
      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
      });
    } else {
      this.userApi.updateByIdCategories(this.user.id, this.categoryToEdit.id, this.categoryToEdit).subscribe((category: Category) => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Category was successfully updated.');
      }, err => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
      });
    }
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
    this.userApi.destroyByIdCategories(this.user.id, this.categoryToRemove.id).subscribe(value => {
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

  shareCategoryWithOrganization(category): void {
    this.selectedOrganizations.forEach(orga => {
      this.categoryApi.linkOrganizations(category.id, orga.id).subscribe(results => {
        this.shareCategoryWithOrganizationModal.hide();
        console.log(results);
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
    if (this.categorySub) this.categorySub.unsubscribe();
    this.unsubscribe();
  }

  rtHandler = (payload: any) => {
    if (payload.action == "CREATE") {
      this.categories.unshift(payload.content);
    } else if (payload.action == "DELETE") {
      this.categories = this.categories.filter(function (obj) {
        return obj.id !== payload.content.id;
      });
    }
  };

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['category']);
    this.rtHandler = this.rt.addListener("category", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }
}
