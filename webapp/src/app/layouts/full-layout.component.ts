import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Alert, Category, Connector, Dashboard, Device, FireLoopRef, Message, Organization, Parser, Role, User} from '../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {OrganizationApi, ParserApi, UserApi} from '../shared/sdk/services/custom';
import {RealTime} from '../shared/sdk/services/core';

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('createOrganizationModal') createOrganizationModal: any;

  private user: User;
  private selectedUsers: Array<Object> = [];
  private selectUsers: Array<Object> = [];
  private organization: Organization;
  private filter: any;
  private params: any = {};

  private newOrganization = new Organization();
  private organizations: Organization[] = [];

  private dashboardSub: Subscription;
  private categorySub: Subscription;
  private deviceSub: Subscription;
  private messageSub: Subscription;
  private alertSub: Subscription;
  private parserSub: Subscription;
  private connectorSub: Subscription;

  private dashboards: Dashboard[] = [];

  private countCategories = 0;
  private countDevices = 0;
  private countMessages = 0;
  private countAlerts = 0;
  private countParsers = 0;
  private countConnectors = 0;
  private countOrganizationUsers = 0;

  private userRef: FireLoopRef<User>;
  private organizationRef: FireLoopRef<Organization>;
  private dashboardRef: FireLoopRef<Dashboard>;
  private categoryRef: FireLoopRef<Category>;
  private deviceRef: FireLoopRef<Device>;
  private messageRef: FireLoopRef<Message>;
  private alertRef: FireLoopRef<Alert>;
  private parserRef: FireLoopRef<Parser>;
  private connectorRef: FireLoopRef<Connector>;

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

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private parserApi: ParserApi,
              private organizationApi: OrganizationApi,
              private route: ActivatedRoute,
              private router: Router) {
  }

  redirectToUserView(): void {
    this.router.navigate(['/' + this.route.snapshot.firstChild.routeConfig.path]);
  }

  redirectToOgranizationView(orgId: string): void {
    if (
      this.route.snapshot.firstChild.routeConfig.path === 'categories'
      || this.route.snapshot.firstChild.routeConfig.path === 'devices'
      || this.route.snapshot.firstChild.routeConfig.path === 'messages') {
      this.router.navigate(['/organization/' + orgId + '/' + this.route.snapshot.firstChild.routeConfig.path]);
    } else {
      this.router.navigate(['/organization/' + orgId]);
    }
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
    });

    // Get organizations
    this.userApi.getOrganizations(this.user.id, {include: ['Members']}).subscribe((organizations: Organization[]) => {
      console.log(organizations);
      this.organizations = organizations;
    });

    // Check if organization view
    this.route.params.subscribe(params => {

      console.log('params full layout', params);
      if (params.id) {
        this.params = params;
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          // console.log('Organization:', organization);

          // Set filter for API calls
          this.filter = {'organizationId': this.organization.id};

          // Real Time
          if (
            this.rt.connection.isConnected() &&
            this.rt.connection.authenticated
          ) {
            this.rt.onReady().subscribe(() => this.setup());
          } else {
            this.rt.onAuthenticated().subscribe(() => this.setup());
            this.rt.onReady().subscribe(() => this.setup());
          }
        });
      } else {
        //Set filter for API calls
        this.filter = {'userId': this.user.id};

        //Check if real time and setup
        // Real Time
        if (
          this.rt.connection.isConnected() &&
          this.rt.connection.authenticated
        ) {
          this.rt.onReady().subscribe(() => this.setup());
        } else {
          this.rt.onAuthenticated().subscribe(() => this.setup());
          this.rt.onReady().subscribe( () => this.setup());
        }
      }
      //console.log('Router', params);
    });

  }

  setup(): void {
    console.log('Setup Full layout');
    //this.ngOnDestroy();

    if (this.organization) {

      this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);

      // Dashboards
      this.dashboardRef = this.organizationRef.child<Dashboard>('Dashboards');
      this.dashboardSub = this.dashboardRef.on('change').subscribe((dashboards: Dashboard[]) => {
        this.dashboards = dashboards;
      });

      /**
       * Count real time methods below
       */
      // Categories
      this.categoryRef = this.organizationRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change', {limit: 1}).subscribe((categories: Category[]) => {
        this.organizationApi.countCategories(this.organization.id).subscribe(result => {
          this.countCategories = result.count;
        });
      });

      // Devices
      /*this.deviceRef = this.organizationRef.child<Device>('Devices');
      this.deviceSub = this.deviceRef.on('change', {limit: 1}).subscribe((devices: Device[]) => {
        this.organizationApi.countDevices(this.organization.id).subscribe(result => {
          this.countDevices = result.count;
        });
      });*/
      this.organizationApi.countDevices(this.organization.id).subscribe(result => {
        this.countDevices = result.count;
      });

      // Messages
      /*this.messageRef = this.organizationRef.child<Message>('Messages');
      this.messageSub = this.messageRef.on('change', {limit: 1}).subscribe((messages: Message[]) => {
        this.organizationApi.countMessages(this.organization.id).subscribe(result => {
          this.countMessages = result.count;
        });
      });*/
      this.organizationApi.countMessages(this.organization.id).subscribe(result => {
        this.countMessages = result.count;
      });

    } else {

      this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);

      this.dashboardRef = this.userRef.child<Dashboard>('Dashboards');
      this.dashboardSub = this.dashboardRef.on('change').subscribe((dashboards: Dashboard[]) => {
        this.dashboards = dashboards;
      });

      /**
       * Count real time methods below
       */
      // Categories
      this.categoryRef = this.userRef.child<Category>('Categories');
      this.categorySub = this.categoryRef.on('change', {limit: 1}).subscribe((categories: Category[]) => {
        this.userApi.countCategories(this.user.id).subscribe(result => {
          this.countCategories = result.count;
        });
      });

      // Devices
      /*this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
      this.deviceSub = this.deviceRef.on('change',
        {
          limit: 1,
          where: {userId: this.user.id}
        }).subscribe((devices: Device[]) => {
        if (devices.length > 0) {
          this.userApi.countDevices(this.user.id).subscribe(result => {
            this.countDevices = result.count;
          });
        }
      });*/
      this.userApi.countDevices(this.user.id).subscribe(result => {
        this.countDevices = result.count;
      });

      // Messages
      /*this.messageRef = this.rt.FireLoop.ref<Message>(Message);
      this.messageSub = this.messageRef.on('change', {
          limit: 1,
          where: {userId: this.user.id}
        }).subscribe((messages: Message[]) => {
          this.userApi.countMessages(this.user.id).subscribe(result => {
            this.countMessages = result.count;
          });
      });*/
      this.userApi.countMessages(this.user.id).subscribe(result => {
        this.countMessages = result.count;
      });

      // Alerts
      this.alertRef = this.userRef.child<Alert>('Alerts');
      this.alertSub = this.alertRef.on('change', {limit: 1}).subscribe((alerts: Alert[]) => {
        this.userApi.countAlerts(this.user.id).subscribe(result => {
          this.countAlerts = result.count;
        });
      });

      // Parsers
      this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
      this.parserSub = this.parserRef.on('change', {limit: 1}).subscribe((parsers: Parser[]) => {
        this.parserApi.count().subscribe(result => {
          this.countParsers = result.count;
        });
      });

      // Connectors
      this.connectorRef = this.userRef.child<Connector>('Connectors');
      this.connectorSub = this.connectorRef.on('change', {limit: 1}).subscribe((connectors: Connector[]) => {
        this.userApi.countConnectors(this.user.id).subscribe(result => {
          this.countConnectors = result.count;
        });
      });
    }
  }

  ngOnDestroy(): void {
    console.log('Full Layout: ngOnDestroy');
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();

    if (this.dashboardRef) this.dashboardRef.dispose();
    if (this.dashboardSub) this.dashboardSub.unsubscribe();

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();

    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();

    if (this.messageRef) this.messageRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();

    if (this.alertRef) this.alertRef.dispose();
    if (this.alertSub) this.alertSub.unsubscribe();

    if (this.parserRef) this.parserRef.dispose();
    if (this.parserSub) this.parserSub.unsubscribe();

    if (this.connectorRef) this.connectorRef.dispose();
    if (this.connectorSub) this.connectorSub.unsubscribe();
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
    this.rt.connection.disconnect();
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

    const dashboard = {
      name: 'New dashboard'
    };

    if (this.organization) {
      dashboard.name = 'Shared dashboard';
    }

    if (!this.organization) {
      this.userApi.createDashboards(this.user.id, dashboard).subscribe(dashboard => {
        console.log(dashboard);
        this.setup();
        this.router.navigate(['/dashboard/' + dashboard.id]);
      });
    } else {
      this.organizationApi.createDashboards(this.organization.id, dashboard).subscribe(dashboard => {
        console.log(dashboard);
        this.setup();
        this.router.navigate(['/organization/' + this.organization.id + '/dashboard/' + dashboard.id]);
      });
    }
  }

  newOrganisation(orga): void {
    this.selectedUsers = [];
    this.selectUsers = [];

    if (orga) {
      console.log(orga);
      this.newOrganization = orga;
      this.organizationApi.getMembers(orga.id).subscribe(members => {
        members.forEach(member => {
          const user = {
            id: member.id,
            itemName: member.email
          };
          this.selectedUsers.push(user);
        });
      });
    } else {
      this.newOrganization = new Organization();
      const myself = {
        id: this.user.id,
        itemName: this.user.email
      };
      this.selectedUsers.push(myself);
    }

    if (this.admin) {
      this.userApi.find({fields: {email: true, id: true}}).subscribe((results: User[]) => {
        //console.log(results);
        results.forEach((result: any) => {
          const item = {
            id: result.id,
            itemName: result.email
          };
          this.selectUsers.push(item);
        });

      });
    }

    this.createOrganizationModal.show();
  }

  createOrganization(orga: any): void {

    orga.ownerId = this.user.id;

    console.log(orga);
    console.log(this.selectedUsers);
    this.organizationApi.upsert(orga).subscribe((organization: Organization) => {
      console.log('Organization created', organization);

      this.selectedUsers.forEach((user: any, index, array) => {
        this.organizationApi.linkMembers(organization.id, user.id).subscribe((result) => {
          console.log('result after linking member: ', result);
          if (index === array.length - 1) {
            this.userApi.getOrganizations(this.user.id, {include: ['Members']}).subscribe((organizations: Organization[]) => {
              console.log(organizations);
              this.organizations = organizations;
              this.createOrganizationModal.hide();
            });
          }
        });
      });
    });
  }

  unlinkMember(organization: any, user: any): void {
    this.organizationApi.unlinkMembers(organization.id, user.id).subscribe((result) => {
      console.log('Result after unlinking member: ', result);
    });
  }

  // setAdminView():void {
  //   localStorage.setItem('adminView', 'true');
  //   this.filter = {};
  //   this.setup();
  // }

}
