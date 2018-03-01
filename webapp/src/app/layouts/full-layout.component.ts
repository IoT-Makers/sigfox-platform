import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category, Dashboard, Device, FireLoopRef, Message, Parser, User} from '../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {ParserApi, UserApi} from '../shared/sdk/services/custom';
import {RealTime} from '../shared/sdk/services/core';
import * as _ from 'lodash';

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  private user: User;

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

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private parserApi: ParserApi,
              private router: Router) {
  }


  ngOnInit(): void {
    console.log('Full Layout: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    console.log(this.user);

    this.userApi.getRoles(this.user.id).subscribe(roles => {
      console.log('Roles: ', roles);
      this.user.roles = roles;
      if (_.filter(this.user.roles, {name: 'admin'}).length !== 0) {
        this.admin = true;
        console.log(this.admin);
      }
    });
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

  setup(): void {
    console.log('Setup Full layout');
    //this.ngOnDestroy();

    // Counts
    this.userApi.getDashboards(this.user.id).subscribe((dashboards: Dashboard[]) => {
      this.dashboards = dashboards;
    });
    this.userApi.countCategories(this.user.id).subscribe(result => {
      this.countCategories = result.count;
    });
    this.userApi.countDevices(this.user.id).subscribe(result => {
      this.countDevices = result.count;
    });
    this.userApi.countMessages(this.user.id).subscribe(result => {
      this.countMessages = result.count;
    });
    this.userApi.countAlerts(this.user.id).subscribe(result => {
      this.countAlerts = result.count;
    });
    this.parserApi.count().subscribe(result => {
      this.countParsers = result.count;
    });
    this.userApi.countConnectors(this.user.id).subscribe(result => {
      this.countConnectors = result.count;
    });

    // Dashboards
    this.dashboardRef = this.rt.FireLoop.ref<Dashboard>(Dashboard);
    this.dashboardSub = this.dashboardRef.on('change', {
      where: {userId: this.user.id},
      order: 'createdAt DESC'
    }).subscribe(
      (dashboards: Dashboard[]) => {
        console.log('Dashboard changed');
        this.dashboards = dashboards;
      });

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categoryRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (categories: Category[]) => {
        this.userApi.countCategories(this.user.id).subscribe(result => {
          this.countCategories = result.count;
        });
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (devices: Device[]) => {
        this.userApi.countDevices(this.user.id).subscribe(result => {
          this.countDevices = result.count;
        });
      });

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageSub = this.messageRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (messages: Message[]) => {
        this.userApi.countMessages(this.user.id).subscribe(result => {
          this.countMessages = result.count;
        });
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

  newDashboard(): void {
    const dashboard = {
      name: 'New dashboard'
    };
    this.userApi.createDashboards(this.user.id, dashboard).subscribe(dashboard => {
      console.log(dashboard);
      this.setup();
    });
  }
}
