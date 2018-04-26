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

  private myUser: User;
  private userToRemove: User;
  private users: User[] = [];

  private setting: AppSetting;
  private settings: AppSetting[] = [];

  private version: any;

  // Application statistics
  private countDashboards = 0;
  private countWidgets = 0;
  private countCategories = 0;
  private countDevices = 0;
  private countMessages = 0;
  private countGeolocs = 0;
  private countAlerts = 0;
  private countParsers = 0;
  private countConnectors = 0;
  private countUsers = 0;

  private organization: Organization;
  private organizations: Organization[] = [];

  private userRef: FireLoopRef<User>;
  private userSub: Subscription;

  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  // Flags
  private usersReady = false;
  private organizationsReady = false;

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
    this.appSettingApi.find().subscribe((settings: AppSetting[]) => {
      this.settings = settings;
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
    console.log(this.userToRemove);
    this.userApi.deleteById(this.userToRemove.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Account was deleted successfully.');
      this.confirmModal.hide();
      this.getUsers();
    });
  }

  changeSetting(setting: AppSetting): void {
    //setting.value = !setting.value;
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

  deleteOrganization(orga: Organization): void {
    this.organizationApi.deleteById(orga.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Organization was deleted successfully.');
    });
  }


  ngOnDestroy(): void {
    console.log('Admin: ngOnDestroy');
    if (this.userRef) this.userRef.dispose();
    if (this.userSub) this.userSub.unsubscribe();
  }

}

