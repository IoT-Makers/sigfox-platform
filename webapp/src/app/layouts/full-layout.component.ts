import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Category, Dashboard, Device, FireLoopRef, Message, Parser, User} from '../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {ParserApi, UserApi} from '../shared/sdk/services/custom';
import {RealTime} from '../shared/sdk/services/core';

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  private user: User;

  private message: Message = new Message();
  private device: Device = new Device();
  private parser: Parser = new Parser();
  private category: Category = new Category();
  private dashboard: Dashboard = new Dashboard();

  private messageSub: Subscription;
  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;
  private dashboardSub: Subscription;

  private messages: Message[] = new Array<Message>();
  private devices: Device[] = new Array<Device>();
  private parsers: Parser[] = new Array<Parser>();
  private categories: Category[] = new Array<Category>();
  private dashboards: Dashboard[] = new Array<Dashboard>();

  private countMessages = 0;
  private countDevices = 0;
  private countParsers = 0;
  private countCategories = 0;

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;
  private dashboardRef: FireLoopRef<Dashboard>;


  public disabled = false;
  public status: {isopen: boolean} = {isopen: false};

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private parserApi: ParserApi,
              private router: Router) { }


  ngOnInit(): void {
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
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
    console.log(this.rt.connection);
    this.ngOnDestroy();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);

    // Counts
    this.userApi.countDevices(this.user.id).subscribe(result => {
      this.countDevices = result.count;
    });
    this.userApi.countMessages(this.user.id).subscribe(result => {
      this.countMessages = result.count;
    });
    this.userApi.countCategories(this.user.id).subscribe(result => {
      this.countCategories = result.count;
    });
    this.parserApi.count().subscribe(result => {
      this.countParsers = result.count;
    });
    this.userApi.getDashboards(this.user.id).subscribe(result => {
      this.dashboards = result;
    });

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    //console.log(this.organizations[0].id);
    this.messageSub = this.messageRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (messages: Message[]) => {
        this.userApi.countMessages(this.user.id).subscribe(result => {
          this.countMessages = result.count;
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

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categoryRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (categories: Category[]) => {
        this.userApi.countCategories(this.user.id).subscribe(result => {
          this.countCategories = result.count;
        });
      });

    // Dashboards
    this.dashboardRef = this.rt.FireLoop.ref<Dashboard>(Dashboard);
    this.dashboardSub = this.dashboardRef.on('change', {where: {userId: this.user.id}, order: 'createdAt DESC'}).subscribe(
      (dashboards: Dashboard[]) => {
        console.log("dashboard changed");
        this.dashboards = dashboards;

      });
  }

  ngOnDestroy(): void {
    console.log('Full Layout: ngOnDestroy');
    // if (this.messageRef)this.messageRef.dispose();
    // if (this.messageSub)this.messageSub.unsubscribe();
    //
    // if (this.deviceRef)this.deviceRef.dispose();
    // if (this.deviceSub)this.deviceSub.unsubscribe();
    //
    // if (this.parserRef)this.parserRef.dispose();
    // if (this.parserSub)this.parserSub.unsubscribe();
    //
    // if (this.categoryRef)this.categoryRef.dispose();
    // if (this.categorySub)this.categorySub.unsubscribe();
    //
    // if (this.dashboardRef)this.dashboardRef.dispose();
    // if (this.dashboardSub)this.dashboardSub.unsubscribe();
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
      name:"New Dashboard"
    };
    this.userApi.createDashboards(this.user.id, dashboard).subscribe(dashboard=>{
      console.log(dashboard);
      this.setup();
    })
  }
}
