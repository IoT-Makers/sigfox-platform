import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {LoginComponent} from "../pages/user/login/login.component";

import {Message, Device, Category, Parser, User, Organization, FireLoopRef} from '../shared/sdk/models';
import {
  RealTime,
  MessageApi,
  DeviceApi,
  CategoryApi,
  ParserApi,
  UserApi,
  OrganizationApi
} from '../shared/sdk/services';

import {Subscription} from "rxjs/Subscription";

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  private user: User = new User();

  private message: Message = new Message();
  private device: Device = new Device();
  private parser: Parser = new Parser();
  private category: Category = new Category();

  private messageSub: Subscription;
  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;

  private messages: Message[] = new Array<Message>();
  private devices: Device[] = new Array<Device>();
  private parsers: Parser[] = new Array<Parser>();
  private categories: Category[] = new Array<Category>();

  private countMessages: number = 0;
  private countDevices: number = 0;
  private countParsers: number = 0;
  private countCategories: number = 0;

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private messageApi: MessageApi,
              private categoryApi: CategoryApi,
              private router: Router) { }

  getUser(): void {
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
  }

  ngOnInit(): void {
    // Get the logged in User object (avatar, email, ...)
    this.getUser();

    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }

    this.deviceApi.count().subscribe(result => {
      //console.log(deviceApi);
      //console.log("count: ", result);
      this.countDevices = result.count;
    });
    this.messageApi.count().subscribe(result => {
      //console.log(messageApi);
      //console.log("count: ", result);
      this.countMessages = result.count;
    });
    this.categoryApi.count().subscribe(result => {
      //console.log(messageApi);
      //console.log("count: ", result);
      this.countCategories = result.count;
    });
  }

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    //console.log(this.organizations[0].id);
    this.messageSub = this.messageRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (messages: Message[]) => {
        this.messageApi.count().subscribe(result => {
          this.countMessages = result.count;
        });
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (devices: Device[]) => {
        this.deviceApi.count().subscribe(result => {
          this.countDevices = result.count;
        });
      });

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categoryRef.on('child_added', {limit: 1, order: 'createdAt DESC'}).subscribe(
      (categories: Category[]) => {
        this.categoryApi.count().subscribe(result => {
          this.countCategories = result.count;
        });
      });


  }

  ngOnDestroy(): void {
    console.log("Dashboard: ngOnDestroy");
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();

    if (this.deviceRef)this.deviceRef.dispose();
    if (this.deviceSub)this.deviceSub.unsubscribe();

    if (this.parserRef)this.parserRef.dispose();
    if (this.parserSub)this.parserSub.unsubscribe();

    if (this.categoryRef)this.categoryRef.dispose();
    if (this.categorySub)this.categorySub.unsubscribe();
  }

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  onLogout(): void {
    this.userApi.logout().subscribe(() => {
      console.log("is authenticated: ", this.userApi.isAuthenticated());
      // some actions on logout
      this.router.navigate(['/login']);
    });
  }
}
