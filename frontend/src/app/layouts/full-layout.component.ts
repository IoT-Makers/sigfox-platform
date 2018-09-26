import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Alert,
  Beacon,
  Category,
  Connector,
  Dashboard,
  Device,
  Message,
  Organization,
  Parser,
  Role,
  User
} from '../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {BeaconApi, OrganizationApi, ParserApi, UserApi} from '../shared/sdk/services/custom';
import {RealtimeService} from "../shared/realtime/realtime.service";

@Component({
  templateUrl: './full-layout.component.html'
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

  private user: User;
  private selectedUsers: Array<Object> = [];
  private selectUsers: Array<Object> = [];
  public organization: Organization;

  public addOrganizationFlag = true;
  private organizationToAddOrEdit: Organization = new Organization();
  private organizations: Organization[] = [];

  private subscriptions: Subscription[] = [];

  private deviceSub: Subscription;
  private messageSub: Subscription;

  private dashboards: Dashboard[] = [];

  private countCategories = 0;
  private countDevices = 0;
  private countMessages = 0;
  private countAlerts = 0;
  private countParsers = 0;
  private countConnectors = 0;
  private countBeacons = 0;
  private countOrganizationUsers = 0;

  private admin = false;

  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  private selectUsersSettings = {
    singleSelection: false,
    text: 'Select users',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-organization'
  };

  constructor(private rt: RealtimeService,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private parserApi: ParserApi,
              private beaconApi: BeaconApi,
              private route: ActivatedRoute,
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
    if (!this.isInitialized) {
      this.isInitialized = true;
      console.log('Setup Full layout');
      // this.cleanSetup();

      // For organizations menu
      this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
        this.organizations = organizations;
        this.countOrganizationsReady = true;
        console.log(organizations);
      });

      const api = this.organization ? this.organizationApi : this.userApi;
      const id = this.organization ? this.organization.id : this.user.id
      // Categories
      api.countCategories(id).subscribe(result => {
        this.countCategories = result.count;
        this.countCategoriesReady = true;
      });

      // Devices
      api.countDevices(id).subscribe(result => {
        this.countDevices = result.count;
        this.countDevicesReady = true;
      });

      // Messages
      api.countMessages(id).subscribe(result => {
        this.countMessages = result.count;
        this.countMessagesReady = true;
      });

      if (!this.organization) {
        // Dashboards
        //TODO
        // this.dashboardRef = this.organizationRef.child<Dashboard>('Dashboards');
        // this.subscriptions.push(this.dashboardRef.on('change').subscribe((dashboards: Dashboard[]) => {
        //   this.dashboards = dashboards;
        // }));
      } else {
        //TODO
        // this.dashboardRef = this.userRef.child<Dashboard>('Dashboards');
        // this.subscriptions.push(this.dashboardRef.on('change').subscribe((dashboards: Dashboard[]) => {
        //   this.dashboards = dashboards;
        // }));

        // Alerts
        this.userApi.countAlerts(this.user.id).subscribe(result => {
          this.countAlerts = result.count;
          this.countAlertsReady = true;
        });

        // Parsers
        this.userApi.countParsers(this.user.id).subscribe(result => {
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

  ngOnDestroy(): void {
    console.log('Full Layout: ngOnDestroy');
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event: MouseEvent): void {
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

    if (this.organization) {
      dashboard.name = 'Shared dashboard';
    }

    // this.dashboardRef.create(dashboard).subscribe(dashboard => {
    //   if (!this.organization) {
    //     this.router.navigate(['/dashboard/' + dashboard.id]);
    //   } else {
    //     this.router.navigate(['/organization/' + this.organization.id + '/dashboard/' + dashboard.id]);
    //   }
    // });
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
          if (user.id !== this.user.id) {
            this.selectUsers.push(item);
          }
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
      if (user.id !== this.user.id) {
        this.selectedUsers.push(user);
      }
    });

    if (this.admin) {
      this.userApi.find({fields: {email: true, id: true}}).subscribe((users: User[]) => {
        //console.log(results);
        users.forEach((user: any) => {
          const item = {
            id: user.id,
            itemName: user.email
          };
          if (user.id !== this.user.id) {
            this.selectUsers.push(item);
          }
        });

      });
    }
    this.addOrEditOrganizationModal.show();
  }

  addOrganization(): void {
    this.organizationToAddOrEdit.userId = this.user.id;

    // this.userOrganizationRef.create(this.organizationToAddOrEdit).subscribe((organization: Organization) => {
    //   console.log('Organization created', organization);
    //   this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
    //     this.organization = organization;
    //     this.addOrEditOrganizationModal.hide();
    //   });
    // });
  }

  editOrganization(): void {
    // this.userOrganizationRef.upsert(this.organizationToAddOrEdit).subscribe((organization: Organization) => {
    //   console.log('Organization edited', organization);
    //   this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
    //     this.organization = organization;
    //     this.addOrEditOrganizationModal.hide();
    //   });
      /*this.userApi.getOrganizations(this.user.id, {include: ['Members']}).subscribe((organizations: Organization[]) => {
        console.log(organizations);
        this.organizations = organizations;
        this.addOrEditOrganizationModal.hide();
      });*/
    // });
  }

  linkMember(user: any): void {
    this.organizationApi.linkMembers(this.organizationToAddOrEdit.id, user.id).subscribe((result) => {
      console.log('Result after linking member: ', result);
    });
  }

  unlinkMember(user: any): void {
    this.organizationApi.unlinkMembers(this.organizationToAddOrEdit.id, user.id).subscribe((result) => {
      console.log('Result after unlinking member: ', result);
    });
  }

  // setAdminView():void {
  //   localStorage.setItem('adminView', 'true');
  //   this.setup();
  // }
  rtMsgHandler = (payload:any) => {
    if (payload.action == "CREATE") {
      this.countMessages++;
    } else if (payload.action == "DELETE") {
      this.countMessages--;
    }
  };

  rtDeviceHandler = (payload:any) => {
    if (payload.action == "CREATE") {
      this.countDevices++;
    } else if (payload.action == "DELETE") {
      this.countDevices--;
    }
  };

  subscribe(): void {
    this.rtMsgHandler = this.rt.addListener("message", this.rtMsgHandler);
    this.rtDeviceHandler = this.rt.addListener("device", this.rtDeviceHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtMsgHandler);
    this.rt.removeListener(this.rtDeviceHandler);
  }
}
