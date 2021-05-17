import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Dashboard, Organization, Role, User} from '../shared/sdk/models';
import {TranslateService} from '@ngx-translate/core';
import {
  AppSettingApi,
  BeaconApi,
  DashboardApi,
  OrganizationApi,
  ParserApi,
  UserApi
} from '../shared/sdk/services/custom';
import {RealtimeService} from "../shared/realtime/realtime.service";
import * as _ from 'lodash';

@Component({
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.scss']
})

export class FullLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('addOrEditOrganizationModal') addOrEditOrganizationModal: any;

  // Flags
  public isInitialized = false;
  public devicesReady = false;
  public messagesReady = false;
  public countCategoriesReady = false;
  public countDevicesReady = false;
  public countMessagesReady = false;
  public countAlertsReady = false;
  public countParsersReady = false;
  public countConnectorsReady = false;
  public countBeaconsReady = false;
  public countOrganizationsReady = false;

  public user: User;
  private selectedUsers: Array<any> = [];
  private selectUsers: Array<any> = [];
  public organization: Organization;

  public addOrganizationFlag = true;
  private organizationToAddOrEdit: Organization = new Organization();
  private organizations: Organization[] = [];
  private dashboards: Dashboard[] = [];

  private countCategories = 0;
  private countDevices = 0;
  private countMessages = 0;
  private countAlerts = 0;
  private countParsers = 0;
  private countConnectors = 0;
  private countBeacons = 0;

  public admin = false;
  public appVersion: any;

  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  protected selectUsersSettings = {
    singleSelection: false,
    text: 'Select users',
    enableSearchFilter: true,
    enableCheckAll: false,
    classes: 'select-organization'
  };

  private api;
  private id;

  constructor(private rt: RealtimeService,
              private appSettingApi: AppSettingApi,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private parserApi: ParserApi,
              private beaconApi: BeaconApi,
              private dashboardApi: DashboardApi,
              private route: ActivatedRoute,
              private translate: TranslateService,
              private router: Router) {

    /*this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };*/
  }

  redirectToUserView(): void {
    this.router.navigate(['/' + this.route.snapshot.firstChild.routeConfig.path]);
  }

  redirectToOgranizationView(orgId: string): void {
    if (
      this.route.snapshot.firstChild.routeConfig.path === 'categories'
      || this.route.snapshot.firstChild.routeConfig.path === 'devices'
      || this.route.snapshot.firstChild.routeConfig.path === 'messages') {
      /*this.router.navigate(['/'], {skipLocationChange: true}).then(() => {
        this.router.navigate(['organization/' + orgId + '/' + this.route.snapshot.firstChild.routeConfig.path]);
      });*/
      this.router.navigate(['organization/' + orgId + '/' + this.route.snapshot.firstChild.routeConfig.path]);
    } else {
      /*this.router.navigate(['/'], {skipLocationChange: true}).then(() => {
        this.router.navigate(['/organization/' + orgId]);
      });*/
      this.router.navigate(['organization/' + orgId]);
    }

    /*this.organizationApi.findById(orgId, {include: 'Members'}).subscribe((organization: Organization) => {
      this.organization = organization;
      this.setup();
    });*/
  }

  ngOnInit(): void {
    console.log('Full Layout: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.userApi.getRoles(this.user.id).subscribe((roles: Role[]) => {
      this.user.roles = roles;
      roles.forEach((role: Role) => {
        if (role.name === 'admin') {
          this.admin = true;
          return;
        }
      });

      // Check if organization view
      this.route.params.subscribe(params => {
        this.isInitialized = false;
        console.log('params full layout', params);
        if (params.id) {
          this.organizationApi.findById(params.id, {include: 'Members'}).subscribe((organization: Organization) => {
            this.organization = organization;
            this.setup();
          });
        } else {
          this.setup();
        }
      });
    });
  }

  setup(): void {
    this.api = this.organization ? this.organizationApi : this.userApi;
    this.id = this.organization ? this.organization.id : this.user.id;
    this.unsubscribe();
    this.subscribe();
    this.getAppVersion();
    if (!this.isInitialized) {
      this.isInitialized = true;
      console.log('Setup Full layout');

      // For organizations menu
      this.userApi.getOrganizations(this.user.id, {order: 'createdAt DESC'}).subscribe((organizations: Organization[]) => {
        this.organizations = organizations;
        this.countOrganizationsReady = true;
      });

      // Categories
      this.api.countCategories(this.id).subscribe(result => {
        this.countCategories = result.count;
        this.countCategoriesReady = true;
      });

      // Devices
      this.api.countDevices(this.id).subscribe(result => {
        this.countDevices = result.count;
        this.countDevicesReady = true;
      });

      // Messages
      this.api.countMessages(this.id).subscribe(result => {
        this.countMessages = result.count;
        this.countMessagesReady = true;
      });

      this.api.getDashboards(this.id, {order: 'createdAt DESC'}).subscribe((dashboards: Dashboard[]) => {
        this.dashboards = dashboards;
      });

      if (!this.organization) {
        // Alerts
        this.userApi.countAlerts(this.user.id).subscribe(result => {
          this.countAlerts = result.count;
          this.countAlertsReady = true;
        });

        // Parsers
        this.parserApi.count().subscribe(result => {
          this.countParsers = result.count;
          this.countParsersReady = true;
        });

        // Beacons
        this.userApi.countBeacons(this.user.id).subscribe(result => {
          this.countBeacons = result.count;
          this.countBeaconsReady = true;
        });

        // Connectors
        this.userApi.countConnectors(this.user.id).subscribe(result => {
          this.countConnectors = result.count;
          this.countConnectorsReady = true;
        });
      }
    }
  }

  private cleanSetup() {
    this.unsubscribe();
  }

  ngOnDestroy(): void {
    console.log('Full Layout: ngOnDestroy');
    this.cleanSetup();
  }

  countOrganizationsMembers(open: boolean): void {
    if (open) {
      // Count organization members
      this.organizations.forEach((organization: any) => {
        this.organizationApi.countMembers(organization.id).subscribe(result => {
          organization.countMembers = result.count;
        });
      });
    }
  }

  getAppVersion(): void {
    this.appSettingApi.getVersion().subscribe((result: any) => {
      this.appVersion = result;
    });
  }

  toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  onLogout(): void {
    this.ngOnDestroy();
    this.userApi.logout().subscribe((result: any) => {
      console.log('is authenticated: ', this.userApi.isAuthenticated());
      // Some actions on logout
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }

  newDashboard(): void {
    const dashboard: Dashboard = new Dashboard();
    dashboard.name = 'New dashboard';
    if (this.organization) dashboard.name = 'Shared dashboard';

    this.api.createDashboards(this.id, dashboard).subscribe(dashboard => {
      if (!this.organization) this.router.navigate(['/dashboard/' + dashboard.id]);
      else this.router.navigate(['/organization/' + this.organization.id + '/dashboard/' + dashboard.id]);
    });
  }

  openAddOrganizationModal(): void {
    this.organizationToAddOrEdit = new Organization();
    this.selectedUsers = [];
    this.selectUsers = [];
    this.addOrganizationFlag = true;

    if (this.admin) {
      this.userApi.find({fields: {email: true, id: true}}).subscribe((users: User[]) => {
        //console.log(results);
        users.forEach((user: any) => {
          const item = {
            id: user.id,
            itemName: user.email
          };
          if (user.id !== this.user.id) this.selectUsers.push(item);
        });

      });
    }
    this.addOrEditOrganizationModal.show();
  }

  openEditOrganizationModal(): void {
    this.selectedUsers = [];
    this.selectUsers = [];
    this.addOrganizationFlag = false;
    this.organizationToAddOrEdit = this.organization;
    this.organization.Members.forEach(member => {
      const user = {
        id: member.id,
        itemName: member.email
      };
      if (user.id !== this.user.id) this.selectedUsers.push(user);
    });

    if (this.admin) {
      this.userApi.find({fields: {email: true, id: true}}).subscribe((users: User[]) => {
        //console.log(results);
        users.forEach((user: any) => {
          const item = {
            id: user.id,
            itemName: user.email
          };
          if (user.id !== this.user.id) this.selectUsers.push(item);
        });

      });
    }
    this.addOrEditOrganizationModal.show();
  }

  addOrganization(): void {
    this.organizationToAddOrEdit.userId = this.user.id;

    this.userApi.createOrganizations(this.user.id, this.organizationToAddOrEdit).subscribe((organization: Organization) => {
      console.log('Organization created', organization);
      this.router.navigate(['organization/' + organization.id]);
      this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
        this.organization = organization;
        this.addOrEditOrganizationModal.hide();
      });
    });
  }

  editOrganization(): void {
    const to_add = _.difference(this.selectedUsers.map(u=>u.id), this.organizationToAddOrEdit.Members.map(u=>u.id));
    const to_del = _.difference(this.organizationToAddOrEdit.Members.map(u=>u.id), this.selectedUsers.map(u=>u.id).concat([this.user.id]));
    to_add.forEach(user => {
      this.linkMember(user);
    });
    to_del.forEach(user => {
      this.unlinkMember(user);
    });
    this.userApi.updateByIdOrganizations(this.user.id, this.organizationToAddOrEdit.id, this.organizationToAddOrEdit).subscribe((organization: Organization) => {
      console.log('Organization edited', organization);
      this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
        this.organization = organization;
        this.addOrEditOrganizationModal.hide();
      });
    });
  }

  /*deleteOrganization(organization: Organization): void {
    this.organizationApi.deleteById(organization.id).subscribe(result => {
      this.router.navigate(['/']);
    });
  }*/

  linkMember(userId: any): void {
    this.organizationApi.linkMembers(this.organizationToAddOrEdit.id, userId).subscribe((result) => {
      console.log('Result after linking member: ', result);
    });
  }

  unlinkMember(userId: any): void {
    this.organizationApi.unlinkMembers(this.organizationToAddOrEdit.id, userId).subscribe((result) => {
      console.log('Result after unlinking member: ', result);
    });
  }

  // setAdminView():void {
  //   localStorage.setItem('adminView', 'true');
  //   this.setup();
  // }
  rtCategoryHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countCategories++ : payload.action == "DELETE" ? this.countCategories-- : 0;
  };
  rtDeviceHandler = (payload: any) => {
    const device = payload.content;
      payload.action == "CREATE" ? this.countDevices++ : payload.action == "DELETE" ? this.countDevices-- : 0;
  };
  rtMsgHandler = (payload: any) => {
    const msg = payload.content;
      payload.action == "CREATE" ? this.countMessages++ : payload.action == "DELETE" ? this.countMessages-- : 0;
  };
  rtAlertHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countAlerts++ : payload.action == "DELETE" ? this.countAlerts-- : 0;
  };
  rtParserHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countParsers++ : payload.action == "DELETE" ? this.countParsers-- : 0;
  };
  rtConnectorHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countConnectors++ : payload.action == "DELETE" ? this.countConnectors-- : 0;
  };
  rtBeaconHandler = (payload: any) => {
    payload.action == "CREATE" ? this.countBeacons++ : payload.action == "DELETE" ? this.countBeacons-- : 0;
  };
  rtDashboardHandler = (payload: any) => {
    const dashboard = payload.content;
    if (payload.action == "CREATE") {
      // ensure data for the user and any org don't mix up
      if (dashboard.userId == this.user.id || (this.organization && dashboard.organizationId === this.organization.id))
        this.dashboards.unshift(dashboard);
    } else if (payload.action == "UPDATE") {
      let idx = this.dashboards.findIndex(x => x.id == dashboard.id);
      if (idx != -1) this.dashboards[idx] = dashboard;
    } else if (payload.action == "DELETE") {
      this.dashboards = this.dashboards.filter(function (obj) {
        return obj.id !== dashboard.id;
      });
    }
  };

  subscribe(): void {
    this.rtCategoryHandler = this.rt.addListener("category", this.rtCategoryHandler);
    this.rtDeviceHandler = this.rt.addListener("device", this.rtDeviceHandler);
    this.rtMsgHandler = this.rt.addListener("message", this.rtMsgHandler);
    this.rtAlertHandler = this.rt.addListener("alert", this.rtAlertHandler);
    this.rtParserHandler = this.rt.addListener("parser", this.rtParserHandler);
    this.rtConnectorHandler = this.rt.addListener("Connector", this.rtConnectorHandler);
    this.rtBeaconHandler = this.rt.addListener("beacon", this.rtBeaconHandler);
    this.rtDashboardHandler = this.rt.addListener("dashboard", this.rtDashboardHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtCategoryHandler);
    this.rt.removeListener(this.rtDeviceHandler);
    this.rt.removeListener(this.rtMsgHandler);
    this.rt.removeListener(this.rtAlertHandler);
    this.rt.removeListener(this.rtParserHandler);
    this.rt.removeListener(this.rtConnectorHandler);
    this.rt.removeListener(this.rtBeaconHandler);
    this.rt.removeListener(this.rtDashboardHandler);
  }
}
