import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardApi, RealTime, UserApi} from '../../shared/sdk/services/index';
import {Category, Dashboard, Device, User, Widget} from '../../shared/sdk/models/index';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {FireLoopRef, Message, Parser} from '../../shared/sdk/models';
import * as _ from 'lodash';

@Component({
  selector: 'app-dashboard',
  templateUrl: './custom-dashboard.component.html'
})
export class CustomDashboardComponent implements OnInit, OnDestroy {

  private user: User;

  private device: Device;
  private devices: Array<Device> = [];
  private categories: Array<Category> = [];

  // Date
  private dateTimeSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Starting date'
  };

  // Select
  private selectedWidgetType = [];
  private selectedMapType = [];
  private selectedTableType = [];
  private selectedCategories = [];
  private selectedDevices = [];
  private selectedDateTimeBegin: Date = new Date();
  private selectedGeolocType = [];

  private selectCategories: Array<Object> = [];
  private selectDevices: Array<Object> = [];

  private selectWidgetType = [
    {id: 'map', itemName: 'Map'},
    {id: 'table of devices', itemName: 'Table of devices'},
    {id: 'tracking', itemName: 'Tracking'}
  ];
  private selectMapType = [
    {id: 'roadmap', itemName: 'Roadmap'},
    {id: 'hybrid', itemName: 'Hybrid'},
    {id: 'satellite', itemName: 'Satellite'},
    {id: 'terrain', itemName: 'Terrain'},
    {id: 'custom', itemName: 'Custom'}
  ];
  private selectTableType = [
    {id: 'default', itemName: 'Default'},
    {id: 'custom', itemName: 'Custom'},
  ];
  private selectGeolocType = [
    {id: 'GPS', itemName: 'GPS'},
    {id: 'sigfox', itemName: 'Sigfox'},
    {id: 'preferGPS', itemName: 'Prefer GPS'}
  ];

  private selectOneSettings = {
    singleSelection: true,
    text: 'Select one',
    enableSearchFilter: false
  };
  private selectCategoriesSettings = {
    singleSelection: false,
    text: 'Select categories',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-category'
  };
  private selectDevicesSettings = {
    singleSelection: false,
    text: 'Select devices',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true,
    classes: 'select-device'
  };

  private widget: any;
  private widgets: Array<any> = [];

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private dashboard: Dashboard;
  private dashboardReady = false;

  private editFlag = false;
  private newWidgetFlag = false;
  private editWidgetFlag = false;

  private fontAwesomeList = ['fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card', 'fa-address-card-o', 'fa-adjust', 'fa-adn', 'fa-align-center', 'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon', 'fa-ambulance', 'fa-american-sign-language-interpreting', 'fa-anchor', 'fa-android', 'fa-angellist', 'fa-angle-double-down', 'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up', 'fa-angle-down', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up', 'fa-arrow-circle-right', 'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-arrows', 'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v', 'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk', 'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward', 'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank', 'fa-bar-chart', 'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub', 'fa-battery', 'fa-battery-0', 'fa-battery-1', 'fa-battery-2', 'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full', 'fa-battery-half', 'fa-battery-quarter', 'fa-battery-three-quarters', 'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell', 'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle', 'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket', 'fa-bitbucket-square', 'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bluetooth-b', 'fa-bold', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o', 'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building', 'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads', 'fa-cab', 'fa-calculator', 'fa-calendar', 'fa-calendar-check-o', 'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o', 'fa-calendar-times-o', 'fa-camera', 'fa-camera-retro', 'fa-car', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-square-o-down', 'fa-caret-square-o-left', 'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up', 'fa-cart-arrow-down', 'fa-cart-plus', 'fa-cc', 'fa-cc-amex', 'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain', 'fa-chain-broken', 'fa-check', 'fa-check-circle', 'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down', 'fa-chevron-circle-left', 'fa-chevron-circle-right', 'fa-chevron-circle-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up', 'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 'fa-clipboard', 'fa-clock-o', 'fa-clone', 'fa-close', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code', 'fa-code-fork', 'fa-codepen', 'fa-codiepie', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting', 'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass', 'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy', 'fa-copyright', 'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop', 'fa-crosshairs', 'fa-css3', 'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery', 'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness', 'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond', 'fa-digg', 'fa-dollar', 'fa-dot-circle-o', 'fa-download', 'fa-dribbble', 'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal', 'fa-edge', 'fa-edit', 'fa-eercast', 'fa-eject', 'fa-ellipsis-h', 'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o', 'fa-envelope-open', 'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira', 'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange', 'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle', 'fa-expand', 'fa-expeditedssl', 'fa-external-link', 'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper', 'fa-fa', 'fa-facebook', 'fa-facebook-f', 'fa-facebook-official', 'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax', 'fa-feed', 'fa-female', 'fa-fighter-jet', 'fa-file', 'fa-file-archive-o', 'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o', 'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o', 'fa-file-picture-o', 'fa-file-powerpoint-o', 'fa-file-sound-o', 'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o', 'fa-file-zip-o', 'fa-files-o', 'fa-film', 'fa-filter', 'fa-fire', 'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag', 'fa-flag-checkered', 'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr', 'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open', 'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons', 'fa-fort-awesome', 'fa-forumbee', 'fa-forward', 'fa-foursquare', 'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel', 'fa-gbp', 'fa-ge', 'fa-gear', 'fa-gears', 'fa-genderless', 'fa-get-pocket', 'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github', 'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass', 'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google', 'fa-google-plus', 'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square', 'fa-google-wallet', 'fa-graduation-cap', 'fa-gratipay', 'fa-grav', 'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o', 'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right', 'fa-hand-o-up', 'fa-hand-paper-o', 'fa-hand-peace-o', 'fa-hand-pointer-o', 'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o', 'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o', 'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o', 'fa-heartbeat', 'fa-history', 'fa-home', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass', 'fa-hourglass-1', 'fa-hourglass-2', 'fa-hourglass-3', 'fa-hourglass-end', 'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz', 'fa-html5', 'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o', 'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent', 'fa-industry', 'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution', 'fa-internet-explorer', 'fa-intersex', 'fa-ioxhost', 'fa-italic', 'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw', 'fa-language', 'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf', 'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down', 'fa-level-up', 'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver', 'fa-lightbulb-o', 'fa-line-chart', 'fa-link', 'fa-linkedin', 'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt', 'fa-list-ol', 'fa-list-ul', 'fa-location-arrow', 'fa-lock', 'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right', 'fa-long-arrow-up', 'fa-low-vision', 'fa-magic', 'fa-magnet', 'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male', 'fa-map', 'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs', 'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h', 'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit', 'fa-meetup', 'fa-meh-o', 'fa-mercury', 'fa-microchip', 'fa-microphone', 'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square', 'fa-minus-square-o', 'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone', 'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle', 'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o', 'fa-object-group', 'fa-object-ungroup', 'fa-odnoklassniki', 'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera', 'fa-optin-monster', 'fa-outdent', 'fa-pagelines', 'fa-paint-brush', 'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph', 'fa-paste', 'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw', 'fa-paypal', 'fa-pencil', 'fa-pencil-square', 'fa-pencil-square-o', 'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o', 'fa-pie-chart', 'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp', 'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane', 'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus', 'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o', 'fa-podcast', 'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq', 'fa-qrcode', 'fa-question', 'fa-question-circle', 'fa-question-circle-o', 'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random', 'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien', 'fa-reddit-square', 'fa-refresh', 'fa-registered', 'fa-remove', 'fa-renren', 'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance', 'fa-retweet', 'fa-rmb', 'fa-road', 'fa-rocket', 'fa-rotate-left', 'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub', 'fa-ruble', 'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors', 'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus', 'fa-sellsy', 'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt', 'fa-share-alt-square', 'fa-share-square', 'fa-share-square-o', 'fa-shekel', 'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag', 'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in', 'fa-sign-language', 'fa-sign-out', 'fa-signal', 'fa-signing', 'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-sliders', 'fa-slideshare', 'fa-smile-o', 'fa-snapchat', 'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o', 'fa-soccer-ball-o', 'fa-sort', 'fa-sort-alpha-asc', 'fa-sort-alpha-desc', 'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc', 'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up', 'fa-soundcloud', 'fa-space-shuttle', 'fa-spinner', 'fa-spoon', 'fa-spotify', 'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-star', 'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full', 'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square', 'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note', 'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle', 'fa-stop-circle-o', 'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon', 'fa-stumbleupon-circle', 'fa-subscript', 'fa-subway', 'fa-suitcase', 'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table', 'fa-tablet', 'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi', 'fa-telegram', 'fa-television', 'fa-tencent-weibo', 'fa-terminal', 'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list', 'fa-themeisle', 'fa-thermometer', 'fa-thermometer-0', 'fa-thermometer-1', 'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4', 'fa-thermometer-empty', 'fa-thermometer-full', 'fa-thermometer-half', 'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack', 'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up', 'fa-ticket', 'fa-times', 'fa-times-circle', 'fa-times-circle-o', 'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down', 'fa-toggle-left', 'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right', 'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender', 'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello', 'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try', 'fa-tty', 'fa-tumblr', 'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter', 'fa-twitter-square', 'fa-umbrella', 'fa-underline', 'fa-undo', 'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock', 'fa-unlock-alt', 'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user', 'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o', 'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard', 'fa-vcard-o', 'fa-venus', 'fa-venus-double', 'fa-venus-mars', 'fa-viacoin', 'fa-viadeo', 'fa-viadeo-square', 'fa-video-camera', 'fa-vimeo', 'fa-vimeo-square', 'fa-vine', 'fa-vk', 'fa-volume-control-phone', 'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wheelchair', 'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close', 'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize', 'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress', 'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing', 'fa-xing-square', 'fa-y-combinator', 'fa-y-combinator-square', 'fa-yahoo', 'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube', 'fa-youtube-play', 'fa-youtube-square'];

  private loadingTableOptions = false;

  private newWidget: any = {
    name: '',
    icon: '',
    description: '',
    type: '',
    width: '12',
    filter: {
      where: {
        or: []
      }
    },
    options: {}
  };

  private isCircleVisible: boolean[] = [];

  // Notifications
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private dashboardApi: DashboardApi,
              private route: ActivatedRoute,
              private router: Router,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Custom Dashboard: ngOnInit');
    // Real Time
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
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.route.params.subscribe(params => {
      this.userApi.findByIdDashboards(this.user.id, params.id).subscribe(result => {
        console.log(result);
        this.dashboard = result;
        this.loadWidgets();
      });
    });

    // Categories
    this.userApi.getCategories(this.user.id).subscribe(categories => {
      this.categories = categories;
      this.categories.forEach((category: Category) => {
        const item = {
          id: category.id,
          itemName: category.name
        };
        this.selectCategories.push(item);
      });
    });
    // Devices
    this.userApi.getDevices(this.user.id).subscribe(devices => {
      this.devices = devices;
      this.devices.forEach((device: Device) => {
        const item = {
          id: device.id,
          itemName: device.name ? device.id + ' - ' + device.name : device.id
        };
        this.selectDevices.push(item);
      });
    });
  }

  ngOnDestroy(): void {
    console.log('Custom Dashboard: ngOnDestroy');
    if (this.messageRef) this.messageRef.dispose();
    //if (this.messageSub) this.messageSub.unsubscribe();

    if (this.deviceRef) this.deviceRef.dispose();
    //if (this.deviceSub) this.deviceSub.unsubscribe();

    if (this.parserRef) this.parserRef.dispose();
    //if (this.parserSub) this.parserSub.unsubscribe();

    if (this.categoryRef) this.categoryRef.dispose();
    //if (this.categorySub) this.categorySub.unsubscribe();
  }

  cancel(): void {
    this.editFlag = false;
    this.newWidgetFlag = false;
    this.editWidgetFlag = false;

    // Reset select
    this.selectedWidgetType = [];
    this.selectedMapType = [];
    this.selectedTableType = [];
    this.selectedGeolocType = [];

    // Reset widget
    this.newWidget = {
      name: '',
      icon: '',
      description: '',
      type: '',
      width: '6',
      filter: {
        where: {
          or: []
        }
      },
      options: {},
      dashboardId: this.dashboard.id
    };
  }

  editDashboard(): void {
    this.editFlag = true;
  }

  saveDashboard(): void {
    this.userApi.updateByIdDashboards(this.user.id, this.dashboard.id, this.dashboard).subscribe(result => {
      console.log(result);
      this.editFlag = false;
      this.toasterService.pop('success', 'Success', 'Successfully saved dashboard.');
    });
  }

  deleteDashboard(): void {
    this.userApi.destroyByIdDashboards(this.user.id, this.dashboard.id).subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  addNewWidget(): void {
    this.loadSelectFilters();
    this.newWidgetFlag = true;

    this.newWidget = {
      name: '',
      icon: '',
      description: '',
      type: '',
      width: '12',
      filter: {
        where: {
          or: []
        }
      },
      options: {},
      dashboardId: this.dashboard.id
    };
  }

  addTableType($event): void {
    if ($event === 'custom') {
      this.loadingTableOptions = true;
      this.newWidget.options.tableColumnOptions = [];
      this.newWidget.options.tableColumnOptions.push({ model: 'device', key: 'id', type: 'string', as: 'ID' });
      this.newWidget.options.tableColumnOptions.push({ model: 'device', key: 'name', type: 'string', as: 'Name' });
      this.newWidget.options.tableColumnOptions.push({ model: 'device', key: 'createdAt', type: 'date', as: 'Created At' });
      this.newWidget.options.tableColumnOptions.push({ model: 'device', key: 'updatedAt', type: 'date', as: 'Updated At' });
      this.newWidget.options.tableColumnOptions.push({ model: 'device', key: 'downlinkData', type: 'string', as: 'Downlink' });
      this.newWidget.options.tableColumnOptions.push({ model: 'device.Parser', key: 'name', type: 'string', as: 'Parser name' });
      this.userApi.getDevices(this.user.id, this.newWidget.filter).subscribe(devices => {
        // console.log(devices);
        if (devices[0].properties) {
          devices[0].properties.forEach(o => {
            const object: any = {
              model: 'device.properties',
              key: o.key,
              type: o.type,
              as: o.key + ' (category)'
            };

            // console.log(_.find(this.newWidget.options.tableColumnOptions, object));
            if (!_.find(this.newWidget.options.tableColumnOptions, object)) {
              this.newWidget.options.tableColumnOptions.push(object);
            }
          });
        }

        devices.forEach(device => {
          if (device.data_parsed) {
            device.data_parsed.forEach(o => {
              const object: any = {
                model: 'device.data_parsed',
                key: o.key,
                type: o.type,
                as: o.key + ' (parsed data)'
              };
              // console.log(_.find(this.newWidget.options.tableColumnOptions, object));
              if (!_.find(this.newWidget.options.tableColumnOptions, object)) {
                this.newWidget.options.tableColumnOptions.push(object);
              }
            });
          }

        });
        //console.log(this.newWidget.options.tableColumnOptions);
        if (!this.newWidget.options.columns) {
          this.newWidget.options.columns = new Array(1);
        }
        //console.log(this.newWidget.options.columns);
        this.loadingTableOptions = false;
      });

    }
  }

  addTableColumn($event): void {
    //
  }

  removeTableColumn(newWidget, index): void {
    this.newWidget.options.columns.splice(index, 1);
  }

  addEmptyTableColumn(): void {
    this.newWidget.options.columns.push(undefined);
    console.log(this.newWidget.options.columns);
  }

  setFilter(type: string): void {
    if (type === 'map' || type === 'table of devices') {
      this.newWidget.filter = {
        limit: 100,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category', {
          relation: 'Messages',
          scope: {
            skip: 0,
            limit: 1,
            order: 'createdAt DESC'
          }
        }],
        where: {
          or: [
          ]
        }
      };
    } else if (type === 'tracking') {
      this.newWidget.filter = {
        limit: 50,
        order: 'updatedAt DESC',
        include: [{
          relation: 'Messages',
          scope: {
            fields: ['geoloc', 'createdAt'],
            limit: 500,
            order: 'createdAt DESC',
            where: {
              and: [
                { geoloc: { neq: null } },
                { createdAt: {gte: this.selectedDateTimeBegin.toISOString()} }
              ]
            }
          }
        }],
        where: {
          or: [
          ]
        }
      };
    }

    this.selectedDevices.forEach( (item: any) => {
      this.newWidget.filter.where.or.push({id: item.id});
    });
    this.selectedCategories.forEach( (item: any) => {
      this.newWidget.filter.where.or.push({categoryId: item.id});
    });
    console.log('Set filter', this.newWidget.filter);
  }

  addWidget(): void {
    if (this.newWidget.filter.where.or.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select at least one category or device.');
      return;
    }
    this.dashboardApi.createWidgets(this.dashboard.id, this.newWidget).subscribe(widget => {
      console.log(widget);
      this.loadWidgets();
      this.toasterService.pop('success', 'Success', 'Successfully created widget.');

      this.newWidgetFlag = false;
    });
  }

  editWidget(widget): void {
    this.newWidget = widget;
    this.loadSelectFilters();
    this.editWidgetFlag = true;
  }

  updateWidget(): void {
    if (this.newWidget.filter.where.or.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select at least one category or device.');
      return;
    }

    delete this.newWidget.data;

    if (this.newWidget.options.style) {
      const myObject = eval(this.newWidget.options.style);
      console.log(myObject);
      this.newWidget.options.style = myObject;
    }

    this.dashboardApi.updateByIdWidgets(this.dashboard.id, this.newWidget.id, this.newWidget).subscribe(widget => {
      console.log(widget);
      this.loadWidgets();
      this.toasterService.pop('success', 'Success', 'The widget was successfully updated.');

      this.editWidgetFlag = false;
    });
  }

  deleteWidget(widget: Widget): void {
    this.dashboardApi.destroyByIdWidgets(this.dashboard.id, widget.id).subscribe(() => {
      this.loadWidgets();
      this.cancel();
      this.toasterService.pop('success', 'Success', 'Successfully deleted widget.');
    });
  }

  loadSelectFilters(): void {
    // Reset all selects
    this.selectedWidgetType = [];
    this.selectedMapType = [];
    this.selectedTableType = [];
    this.selectedCategories = [];
    this.selectedDevices = [];
    this.selectedGeolocType = [];
    this.selectedDateTimeBegin = new Date();

    if (this.newWidget.type !== '')
      this.selectedWidgetType = [{id: this.newWidget.type, itemName: this.capitalizeFirstLetter(this.newWidget.type)}];
    if (this.newWidget.options.mapTypeId)
      this.selectedMapType = [{
        id: this.newWidget.options.mapTypeId,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.mapTypeId)
      }];
    if (this.newWidget.options.tableType)
      this.selectedTableType = [{
        id: this.newWidget.options.tableType,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.tableType)
      }];
    if (this.newWidget.options.geolocType)
      this.selectedGeolocType = [{
        id: this.newWidget.options.geolocType,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.geolocType)
      }];

    this.newWidget.filter.where.or.forEach((item: any, index: number) => {
      if (item.categoryId) {
        const foundCategory = _.find(this.categories, {id: item.categoryId});
        this.selectedCategories.push({id: item.categoryId, itemName: foundCategory.name});
      } else if (item.id) {
        const foundDevice = _.find(this.devices, {id: item.id});
        this.selectedDevices.push({id: item.id, itemName: foundDevice.name ?  foundDevice.id + ' - ' + foundDevice.name : foundDevice.id});
      }
    });

    if (this.newWidget.type === 'tracking') {
      this.selectedDateTimeBegin = new Date(this.newWidget.filter.include[0].scope.where.and[1].createdAt.gte);
      this.dateTimeSettings.placeholder = this.selectedDateTimeBegin.toISOString();
    }
  }

  onMapReady($event) {
    /*this.widgets.forEach(widget => {
      if (widget.type === 'tracking')
        widget.data[0].visibility = true;
    });*/
  }

  loadWidgets(): void {
    this.dashboardApi.getWidgets(this.dashboard.id).subscribe(widgets => {
      this.widgets = widgets;
      // console.log(widgets);
      this.dashboardReady = true;
      if (this.widgets) {
        this.widgets.forEach(widget => {
          this.userApi.getDevices(this.user.id, widget.filter).subscribe((devices: any[]) => {
            devices.forEach(device => {
              device.visibility = false;
              device.directionsDisplayStore = [];
              //device.color = this.generateColor();
            });
            widget.data = devices;

            if (widget.options.tableType === 'custom') {
              widget.data = this.buildCustomTable(widget);
            }

            // Tracking
            if (widget.options.geolocType === 'GPS') {
              widget.data.forEach(device => {
                device.Messages = _.filter(device.Messages, {geoloc: [{type: 'GPS'}]});
                // Filter others
                device.Messages.forEach((message, i) => {
                  message.geoloc.forEach((geoloc, j) => {
                    if (geoloc.type !== 'GPS') {
                      device.Messages[i].geoloc.splice(j, 1);
                    }
                  });
                });
              });
            } else if (widget.options.geolocType === 'sigfox') {
              widget.data.forEach(device => {
                // Message contains Sigfox
                device.Messages = _.filter(device.Messages, {geoloc: [{type: 'sigfox'}]});
                // Filter others
                device.Messages.forEach((message, i) => {
                  message.geoloc.forEach((geoloc, j) => {
                    if (geoloc.type !== 'sigfox') {
                      device.Messages[i].geoloc.splice(j, 1);
                    }
                  });
                });
              });
            } else if (widget.options.geolocType === 'preferGPS') {
              widget.data.forEach(device => {
                device.Messages.forEach((message, i) => {
                  let hasSigfox = false;
                  if (message.geoloc.length > 1) {
                    message.geoloc.forEach((geoloc, j) => {
                      if (geoloc.type === 'sigfox')
                        hasSigfox = true;
                      if (hasSigfox)
                        device.Messages[i].geoloc.splice(j, 1);
                    });
                  }
                });
              });
            }
            console.log(this.widgets);
          });
        });
      }
    });
  }

  buildCustomTable(widget: any): any {

    const returnedArray = [];

    widget.data.forEach(row => {

      const arrayAsRow = [];
      widget.options.columns.forEach(col => {
        const obj: any = {};
        obj.key = col.key;
        if (col.model === 'device') {
          obj.value = row[col.key];
        }
        if (col.model === 'device.Parser') {
          obj.value = row.Parser[col.key];
        }
        if (col.model === 'device.properties') {
          const index = _.findIndex(row.properties, { 'key': col.key });
          if (index !== -1) {
            obj.value = row.properties[index].value;
          }
        }
        if (col.model === 'device.data_parsed') {
          const index = _.findIndex(row.data_parsed, { 'key': col.key });
          if (index !== -1) {
            obj.value = row.data_parsed[index].value;
            obj.unit = row.data_parsed[index].unit;
          }
        }

        arrayAsRow.push(obj);
      });
      returnedArray.push(arrayAsRow);

    });
    return returnedArray;
  }

// Map functions
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

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

}
