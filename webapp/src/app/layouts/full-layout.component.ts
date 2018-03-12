import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Category, Dashboard, Device, FireLoopRef, Message, Organization, Parser, User} from '../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {OrganizationApi, ParserApi, UserApi} from '../shared/sdk/services/custom';
import {RealTime} from '../shared/sdk/services/core';
import * as _ from 'lodash';

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  @ViewChild('createOrganizationModal') createOrganizationModal: any;

  private user: User;
  private users: User[] = [];
  private selectedUsers: Array<Object> = [];
  private selectUsers: Array<Object> = [];
  private organization: Organization;
  private filter: any;

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

  private dashboardRef: FireLoopRef<Dashboard>;
  private categoryRef: FireLoopRef<Category>;
  private deviceRef: FireLoopRef<Device>;
  private messageRef: FireLoopRef<Message>;
  private alertRef: FireLoopRef<Parser>;
  private parserRef: FireLoopRef<Parser>;
  private connectorRef: FireLoopRef<Parser>;

  private admin = false;

  public disabled = false;
  public status: { isopen: boolean } = {isopen: false};

  private selectUsersSettings = {
    singleSelection: false,
    text: 'Select users',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-category'
  };

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private parserApi: ParserApi,
              private organizationApi: OrganizationApi,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    console.log('Full Layout: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    console.log(this.user);

    this.userApi.getRoles(this.user.id).subscribe(roles => {
      //console.log('Roles: ', roles);
      this.user.roles = roles;
      if (_.filter(this.user.roles, {name: 'admin'}).length !== 0) {
        this.admin = true;
        console.log('Admin: ', this.admin);
      }
    });

    //Check if organization view
    this.route.params.subscribe(params => {

      if (params.id) {
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          //console.log('Organization:', organization);

          //Set filter for API calls
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
      }else{

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
          this.rt.onReady().subscribe(() => this.setup());
        }
      }
      //console.log('Router', params);
    });

  }

  setup(): void {
    console.log('Setup Full layout');
    //this.ngOnDestroy();

    this.getDashboards();
    this.getOrganizations();

    if(!this.organization){

      //Count
      this.userApi.countAlerts(this.user.id).subscribe(result => {
        this.countAlerts = result.count;
      });
      this.parserApi.count().subscribe(result => {
        this.countParsers = result.count;
      });
      this.userApi.countConnectors(this.user.id).subscribe(result => {
        this.countConnectors = result.count;
      });
    }

    // Dashboards
    this.dashboardRef = this.rt.FireLoop.ref<Dashboard>(Dashboard);
    this.dashboardSub = this.dashboardRef.on('value', {
      where: {userId: this.user.id},
      order: 'createdAt DESC'
    }).subscribe(
      (dashboards: Dashboard[]) => {
        console.log('Dashboard changed');
        this.dashboards = dashboards;
      });

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categorySub = this.categoryRef.on('value', {where: this.user.id}).subscribe(
      (categories: Category[]) => {

        if (!this.organization) {
          this.userApi.countCategories(this.user.id).subscribe(result => {
            this.countCategories = result.count;
          });
        } else {
          this.organizationApi.countCategories(this.organization.id).subscribe(result => {
            this.countCategories = result.count;
          });
        }
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceSub = this.deviceRef.on('value',
      {
        limit: 10,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category', {
          relation: 'Messages',
          scope: {
            skip: 0,
            limit: 1,
            order: 'createdAt DESC'
          }
        }],
        where: this.user.id
      }).subscribe(
      (devices: Device[]) => {
        //console.log(devices);

        if (!this.organization) {
          this.userApi.countDevices(this.user.id).subscribe(result => {
            this.countDevices = result.count;
          });
        } else {
          this.organizationApi.countDevices(this.organization.id).subscribe(result => {
            this.countDevices = result.count;
          });
        }

      });

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageSub = this.messageRef.on('value', {
      limit: 1,
      order: 'createdAt DESC',
      where: this.user.id
    }).subscribe(
      (messages: Message[]) => {

        if (!this.organization) {
          this.userApi.countMessages(this.user.id).subscribe(result => {
            this.countMessages = result.count;
          });
        } else {
          this.organizationApi.countMessages(this.organization.id).subscribe(result => {
            this.countMessages = result.count;
          });
        }
      });

  }

  ngOnDestroy(): void {
    console.log('Full Layout: ngOnDestroy');
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

  getOrganizations(): void {
    this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      //console.log(organizations);
    });
  }

  getDashboards(): void {
    this.userApi.getDashboards(this.user.id).subscribe((dashboards: Dashboard[]) => {
      this.dashboards = dashboards;
    });
  }

  newDashboard(): void {
    const dashboard = {
      name: 'New dashboard'
    };
    this.userApi.createDashboards(this.user.id, dashboard).subscribe(dashboard => {
      console.log(dashboard);
      this.setup();
    });
  }

  newOrganisation(): void {

    if(this.admin){
      this.userApi.find({fields:{email:true, id:true}}).subscribe((results: User[]) => {
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
    const myself = {
      id: this.user.id,
      itemName: this.user.email
    };
    this.selectedUsers.push(myself);
    this.createOrganizationModal.show();
  }

  createOrganization(orga:any): void {

    orga.ownerId = this.user.id;

    console.log(orga);
    console.log(this.selectedUsers);
    this.organizationApi.create(orga).subscribe((organization: Organization)=>{
      console.log('Organization created', organization);

      this.selectedUsers.forEach((user: any, index, array) => {
        this.organizationApi.linkMembers(organization.id, user.id).subscribe((result) =>{
          console.log('result after linking member: ', result);
          if (index === array.length - 1) {
            this.getOrganizations();
            this.createOrganizationModal.hide();
          }
        });
      });

    });
  }

  // setAdminView():void {
  //   localStorage.setItem('adminView', 'true');
  //   this.filter = {};
  //   this.setup();
  // }

}
