import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppSetting, FireLoopRef, Organization, Role, User} from '../../shared/sdk/models';
import {AppSettingApi, OrganizationApi, RealTime, RoleApi, UserApi} from '../../shared/sdk/services';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Subscription} from 'rxjs/Subscription';
import {
  AlertApi,
  CategoryApi,
  ConnectorApi,
  DashboardApi,
  DeviceApi,
  GeolocApi,
  MessageApi,
  ParserApi,
  WidgetApi
} from '../../shared/sdk/services/custom';

@Component({
  selector: 'app-messages',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {

  @ViewChild('addOrEditUserModal') addOrEditUserModal: any

  private myUser: User;
  private userToRemove: User;
  public users: User[] = [];

  private setting: AppSetting;
  public appSettings: AppSetting[] = [];

  public version: any;

  // Application statistics
  public countDashboards = 0;
  public countWidgets = 0;
  public countCategories = 0;
  public countDevices = 0;
  public countMessages = 0;
  public countGeolocs = 0;
  public countAlerts = 0;
  public countParsers = 0;
  public countConnectors = 0;
  public countUsers = 0;

  private organization: Organization;
  public organizations: Organization[] = [];

  public addUserFlag = true;
  private userToAddOrEdit: User = new User();
  public verifyPassword = '';
  public errorMessage = '';

  private userRef: FireLoopRef<User>;
  private userSub: Subscription;

  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  // Flags
  public usersReady = false;
  public organizationsReady = false;

  // Notifications
  private toast;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });


  constructor(private rt: RealTime,
              private dashboardApi: DashboardApi,
              private widgetApi: WidgetApi,
              private categoryApi: CategoryApi,
              private deviceApi: DeviceApi,
              private messageApi: MessageApi,
              private geolocApi: GeolocApi,
              private alertApi: AlertApi,
              private parserApi: ParserApi,
              private connectorApi: ConnectorApi,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private appSettingApi: AppSettingApi,
              private roleApi: RoleApi,
              private toasterService: ToasterService) {

    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Admin: ngOnInit');

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
  }

  setup(): void {
    this.getUsers();
    this.getAppSettings();
    this.getAppStats();
    this.getOrganizations();
  }

  getUsers(): void {
    this.myUser = this.userApi.getCachedCurrent();
    this.userRef = this.rt.FireLoop.ref<User>(User);
    this.userSub = this.userRef.on('change', {
      include: [
        {
          relation: 'roles'
        }
      ],
      order: 'updatedAt DESC'
    }).subscribe((users: User[]) => {
      users.forEach((user: any) => {
        user.isAdmin = false;
        user.roles.forEach((role: Role) => {
          if (role.name === 'admin') {
            user.isAdmin = true;
            return;
          }
        });
        this.userApi.countDevices(user.id).subscribe((result: any) => {
          user.Devices = result.count;
        });
        this.userApi.countMessages(user.id).subscribe((result: any) => {
          user.Messages = result.count;
        });
      });
      this.users = users;
      this.usersReady = true;
    });
  }

  getAppStats(): void {
    this.dashboardApi.count().subscribe(result => {
      this.countDashboards = result.count;
    });
    this.widgetApi.count().subscribe(result => {
      this.countWidgets = result.count;
    });
    this.categoryApi.count().subscribe(result => {
      this.countCategories = result.count;
    });
    this.deviceApi.count().subscribe(result => {
      this.countDevices = result.count;
    });
    this.messageApi.count().subscribe(result => {
      this.countMessages = result.count;
    });
    this.geolocApi.count().subscribe(result => {
      this.countGeolocs = result.count;
    });
    this.alertApi.count().subscribe(result => {
      this.countAlerts = result.count;
    });
    this.parserApi.count().subscribe(result => {
      this.countParsers = result.count;
    });
    this.connectorApi.count().subscribe(result => {
      this.countConnectors = result.count;
    });
    this.userApi.count().subscribe(result => {
      this.countUsers = result.count;
    });
  }

  getAppSettings(): void {
    this.appSettingApi.find().subscribe((appSettings: AppSetting[]) => {
      this.appSettings = appSettings;
    });
    this.appSettingApi.getVersion().subscribe((result: any) => {
      this.version = result;
    });
  }

  getOrganizations(): void {
    console.log('getOrga');
    this.organizationApi.find({include: 'Members'}).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.organizationsReady = true;
      console.log(organizations);
    });
  }

  showRemoveModal(user: User): void {
    this.confirmModal.show();
    this.userToRemove = user;
  }

  deleteUser(): void {
    this.userApi.deleteById(this.userToRemove.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Account was deleted successfully.');
      this.confirmModal.hide();
      this.getUsers();
    });
  }

  changeSetting(setting: AppSetting): void {
    this.appSettingApi.upsert(setting).subscribe((setting: any) => {
      console.log(setting);
    });
  }

  grantAdminAccess(user): void {
    console.log('user: ', user);

    this.roleApi.findOne({where: {name: 'admin'}}).subscribe((admin: any) => {
      console.log('admin: ', admin);

      this.userApi.linkRoles(user.id, admin.id, {'principalType': 'USER', 'roleId': admin.id, 'principalId': user.id}).subscribe(result => {
        console.log(result);
        this.getUsers();
      });
    });
  }

  revokeAdminAccess(user): void {
    console.log('user: ', user);

    this.roleApi.findOne({where: {name: 'admin'}}).subscribe((admin: any) => {
      console.log('admin: ', admin);

      this.userApi.unlinkRoles(user.id, admin.id).subscribe(result => {
        console.log(result);
        this.getUsers();
      });
    });
  }

  openAddUserModal(): void {
    this.userToAddOrEdit = new User();
    this.verifyPassword = '';
    this.addUserFlag = true;

    this.addOrEditUserModal.show();
  }

  verify(): void {
    if (this.userToAddOrEdit.password !== this.verifyPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.errorMessage = '';
    }
  }

  addUser(): void {
    console.log('Admin | Try to create user...', this.userToAddOrEdit);

    this.userToAddOrEdit.email = this.userToAddOrEdit.email.toLocaleLowerCase();
    this.userToAddOrEdit.id = null;
    this.userToAddOrEdit.createdAt = new Date();

    this.userRef.create(this.userToAddOrEdit).subscribe((user: User) => {
      console.log('Admin | User created', user);
      this.getUsers();
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Account was created successfully.');
    }, (err) => {
      if (err.error.statusCode === 422) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Email exists.');
        console.log('Admin | Error 422 | Email already taken');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', 'Invalid username or password');
        console.log('Admin | Error | Invalid username or password ', err);
      }
    });

    this.addOrEditUserModal.hide();
  }

  deleteOrganization(organization: Organization): void {
    this.organizationApi.deleteById(organization.id).subscribe(result => {
      console.log(result);
      this.getOrganizations();
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Organization was deleted successfully.');
    }, (error: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', error.message);
    });
  }


  ngOnDestroy(): void {
    console.log('Admin: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.userRef) this.userRef.dispose();
    if (this.userSub) this.userSub.unsubscribe();
  }

}

