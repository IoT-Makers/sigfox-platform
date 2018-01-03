import {Component, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Category, Device, FireLoopRef, Message, Parser, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {DragulaService} from 'ng2-dragula';
import {Geoloc} from '../../shared/sdk/models/Geoloc';
import {AgmInfoWindow} from '@agm/core';
import {ParserApi, UserApi} from '../../shared/sdk/services/custom';


@Component({
  templateUrl: 'overview.component.html'
})
export class OverviewComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;

  private message: Message = new Message();

  private messageSub: Subscription;
  private deviceSub: Subscription;
  private parserSub: Subscription;
  private categorySub: Subscription;

  private messages: Message[] = [];
  private devices: Device[] = [];
  private parsers: Parser[] = [];
  private categories: Category[] = [];

  private countMessages = 0;
  private countDevices = 0;
  private countParsers = 0;
  private countCategories = 0;

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private isCircleVisible: boolean[] = [];

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;

  public filterQuery = '';

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private parserApi: ParserApi,
              private dragulaService: DragulaService) {

    const bag: any = this.dragulaService.find('section-bag');
    if (bag !== undefined)
      this.dragulaService.destroy('section-bag');
    this.dragulaService.setOptions('section-bag', {
      moves: function (el, container, handle) {
        return handle.className === 'card-header drag';
      }
    });
    this.dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
    });
    this.dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
    });
    this.dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    this.dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }

  ngOnInit(): void {
    console.warn('Overview: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/
  }

  setup(): void {
    // this.ngOnDestroy();
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    //console.log(this.organizations[0].id);
    this.messageSub = this.messageRef.on('change', {
      limit: 1000,
      order: 'createdAt DESC',
      include: ['Device'],
      where: {
        userId: this.user.id
      }
    }).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.userApi.countMessages(this.user.id).subscribe(result => {
          this.countMessages = result.count;
        });
      });

    // Devices
    this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
    this.deviceRef.on('change',
      {
        limit: 10,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category'],
        where: {
          userId: this.user.id
        }
      }).subscribe(
      (devices: Device[]) => {
        this.devices = devices;
        this.userApi.countDevices(this.user.id).subscribe(result => {
          this.countDevices = result.count;
        });
      });

    // Categories
    this.categoryRef = this.rt.FireLoop.ref<Category>(Category);
    this.categoryRef.on('change').subscribe(
      (categories: Category[]) => {
        this.categories = categories;
        this.userApi.countCategories(this.user.id).subscribe(result => {
          this.countCategories = result.count;
        });
      });

    // Parsers
    this.parserRef = this.rt.FireLoop.ref<Parser>(Parser);
    this.parserRef.on('change').subscribe((parsers: Parser[]) => {
      this.parsers = parsers;
      this.parserApi.count().subscribe(result => {
        this.countParsers = result.count;
      });
    });

  }

  ngOnDestroy(): void {
    console.warn('Overview: ngOnDestroy');
    if (this.messageRef) this.messageRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();

    if (this.deviceRef) this.deviceRef.dispose();
    if (this.deviceSub) this.deviceSub.unsubscribe();

    if (this.parserRef) this.parserRef.dispose();
    if (this.parserSub) this.parserSub.unsubscribe();

    if (this.categoryRef) this.categoryRef.dispose();
    if (this.categorySub) this.categorySub.unsubscribe();
  }


  // create(): void {
  //   this.messageRef.create(this.message).subscribe(() => this.message = new Message());
  // }

  // update(message: Message): void {
  //   this.messageRef.upsert(message).subscribe();
  // }

  // remove(message: Message): void {
  //   this.messageRef.remove(message).subscribe();
  // }

  setCircles() {
    for (let i = 0; i < this.devices.length; i++) {
      this.isCircleVisible.push(false);
    }
  }

  markerOut(i) {
    this.isCircleVisible[i] = false;
  }

  markerOver(i) {
    this.isCircleVisible[i] = true;
  }

  zoomOnDevice(elementId: string, geoloc: Geoloc): void {
    this.agmInfoWindow.forEach((child) => {
      // console.log(child['_el'].nativeElement.id);
      if (child['_el'].nativeElement.id === elementId)
        child.open();
      else
        child.close();
    });

    this.mapLat = geoloc.lat;
    this.mapLng = geoloc.lng;
    this.mapZoom = 12;
  }

}
