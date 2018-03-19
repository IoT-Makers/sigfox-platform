import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardApi, RealTime, UserApi} from '../../shared/sdk/services/index';
import {Category, Dashboard, Device, User, Widget} from '../../shared/sdk/models/index';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {FireLoopRef, Geoloc, Message, Organization, Parser} from '../../shared/sdk/models';
import * as _ from 'lodash';
import * as moment from 'moment';
import {OrganizationApi} from "../../shared/sdk/services/custom";
import {Observable} from "rxjs/Rx";

declare let d3: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './custom-dashboard.component.html'
})
export class CustomDashboardComponent implements OnInit, OnDestroy {

  @ViewChild('updateWidgetModal') updateWidgetModal: any;

  private user: User;

  private organization: Organization;
  private organizations: Organization[] = [];

  private device: Device;
  private devices: Array<Device> = [];
  private categories: Array<Category> = [];

  // Charts
  private optionsLineChart;
  private dataLineChart;

  // Map
  private clusterStyles = [
    {
      textSize: 13,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m1.png',
      height: 37,
      width: 37
    },
    {
      textSize: 14,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m2.png',
      height: 40,
      width: 40
    },
    {
      textSize: 15,
      textColor: '#F1F1F1',
      url: 'assets/img/markers/clusters/m3.png',
      height: 53,
      width: 53
    }
  ];

  // Date
  private dateTimeSettings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MMM-yyyy hh:mm a',
    to: new Date(),
    defaultOpen: false,
    placeholder: 'Beginning date'
  };

  // Select
  private selectedDashboardIcon = [];
  private selectedWidgetIcon = [];
  private selectedWidgetType = [];
  private selectedMapType = [];
  private selectedTableType = [];
  private selectedCategories = [];
  private selectedDevices = [];
  private selectedDateTimeBegin: Date = new Date();
  private selectedGeolocType = [];
  private selectedKeys = [];

  private selectCategories: Array<Object> = [];
  private selectDevices: Array<Object> = [];
  private selectKeys: Array<Object> = [];

  private selectIconSettings = {
    singleSelection: true,
    text: 'Select an icon',
    enableSearchFilter: true,
    classes: 'select-one'
  };
  private selectWidgetType = [
    {id: 'map', itemName: 'Map'},
    {id: 'table', itemName: 'Table'},
    {id: 'tracking', itemName: 'Tracking'},
    {id: 'alert', itemName: 'Alert'},
    {id: 'gauge', itemName: 'Gauge'},
    {id: 'line', itemName: 'Line graph'},
    {id: 'bar', itemName: 'Bar graph'}
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
    {id: 'gps', itemName: 'GPS'},
    {id: 'sigfox', itemName: 'Sigfox'},
    {id: 'preferGps', itemName: 'Prefer GPS'},
    {id: 'all', itemName: 'All kinds'}
  ];
  private selectOneSettings = {
    singleSelection: true,
    text: 'Select one',
    enableSearchFilter: false,
    classes: 'select-one'
  };
  private selectKeysSettings = {
    singleSelection: false,
    text: 'Select keys',
    selectAllText: 'Select all',
    unSelectAllText: 'Unselect all',
    enableSearchFilter: true
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
  private selectOneDeviceSettings = {
    singleSelection: true,
    text: 'Select one device',
    enableSearchFilter: true,
    classes: 'select-one-device'
  };

  private widget: any;
  private widgets: Array<any> = [];

  private messageRef: FireLoopRef<Message>;
  private deviceRef: FireLoopRef<Device>;
  private parserRef: FireLoopRef<Parser>;
  private categoryRef: FireLoopRef<Category>;

  private dashboard: Dashboard;
  private dashboardReady = false;
  private dashboardId: string = "";

  private editFlag = false;
  private newWidgetFlag = false;
  private editWidgetFlag = false;

  private fontAwesomeList: any[] = ['fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card', 'fa-address-card-o', 'fa-adjust', 'fa-adn', 'fa-align-center', 'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon', 'fa-ambulance', 'fa-american-sign-language-interpreting', 'fa-anchor', 'fa-android', 'fa-angellist', 'fa-angle-double-down', 'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up', 'fa-angle-down', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up', 'fa-arrow-circle-right', 'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-arrows', 'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v', 'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk', 'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward', 'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank', 'fa-bar-chart', 'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub', 'fa-battery', 'fa-battery-0', 'fa-battery-1', 'fa-battery-2', 'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full', 'fa-battery-half', 'fa-battery-quarter', 'fa-battery-three-quarters', 'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell', 'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle', 'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket', 'fa-bitbucket-square', 'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bluetooth-b', 'fa-bold', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o', 'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building', 'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads', 'fa-cab', 'fa-calculator', 'fa-calendar', 'fa-calendar-check-o', 'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o', 'fa-calendar-times-o', 'fa-camera', 'fa-camera-retro', 'fa-car', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-square-o-down', 'fa-caret-square-o-left', 'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up', 'fa-cart-arrow-down', 'fa-cart-plus', 'fa-cc', 'fa-cc-amex', 'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain', 'fa-chain-broken', 'fa-check', 'fa-check-circle', 'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down', 'fa-chevron-circle-left', 'fa-chevron-circle-right', 'fa-chevron-circle-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up', 'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 'fa-clipboard', 'fa-clock-o', 'fa-clone', 'fa-close', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code', 'fa-code-fork', 'fa-codepen', 'fa-codiepie', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting', 'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass', 'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy', 'fa-copyright', 'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop', 'fa-crosshairs', 'fa-css3', 'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery', 'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness', 'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond', 'fa-digg', 'fa-dollar', 'fa-dot-circle-o', 'fa-download', 'fa-dribbble', 'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal', 'fa-edge', 'fa-edit', 'fa-eercast', 'fa-eject', 'fa-ellipsis-h', 'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o', 'fa-envelope-open', 'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira', 'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange', 'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle', 'fa-expand', 'fa-expeditedssl', 'fa-external-link', 'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper', 'fa-fa', 'fa-facebook', 'fa-facebook-f', 'fa-facebook-official', 'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax', 'fa-feed', 'fa-female', 'fa-fighter-jet', 'fa-file', 'fa-file-archive-o', 'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o', 'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o', 'fa-file-picture-o', 'fa-file-powerpoint-o', 'fa-file-sound-o', 'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o', 'fa-file-zip-o', 'fa-files-o', 'fa-film', 'fa-filter', 'fa-fire', 'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag', 'fa-flag-checkered', 'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr', 'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open', 'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons', 'fa-fort-awesome', 'fa-forumbee', 'fa-forward', 'fa-foursquare', 'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel', 'fa-gbp', 'fa-ge', 'fa-gear', 'fa-gears', 'fa-genderless', 'fa-get-pocket', 'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github', 'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass', 'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google', 'fa-google-plus', 'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square', 'fa-google-wallet', 'fa-graduation-cap', 'fa-gratipay', 'fa-grav', 'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o', 'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right', 'fa-hand-o-up', 'fa-hand-paper-o', 'fa-hand-peace-o', 'fa-hand-pointer-o', 'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o', 'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o', 'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o', 'fa-heartbeat', 'fa-history', 'fa-home', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass', 'fa-hourglass-1', 'fa-hourglass-2', 'fa-hourglass-3', 'fa-hourglass-end', 'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz', 'fa-html5', 'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o', 'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent', 'fa-industry', 'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution', 'fa-internet-explorer', 'fa-intersex', 'fa-ioxhost', 'fa-italic', 'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw', 'fa-language', 'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf', 'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down', 'fa-level-up', 'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver', 'fa-lightbulb-o', 'fa-line-chart', 'fa-link', 'fa-linkedin', 'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt', 'fa-list-ol', 'fa-list-ul', 'fa-location-arrow', 'fa-lock', 'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right', 'fa-long-arrow-up', 'fa-low-vision', 'fa-magic', 'fa-magnet', 'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male', 'fa-map', 'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs', 'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h', 'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit', 'fa-meetup', 'fa-meh-o', 'fa-mercury', 'fa-microchip', 'fa-microphone', 'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square', 'fa-minus-square-o', 'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone', 'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle', 'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o', 'fa-object-group', 'fa-object-ungroup', 'fa-odnoklassniki', 'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera', 'fa-optin-monster', 'fa-outdent', 'fa-pagelines', 'fa-paint-brush', 'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph', 'fa-paste', 'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw', 'fa-paypal', 'fa-pencil', 'fa-pencil-square', 'fa-pencil-square-o', 'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o', 'fa-pie-chart', 'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp', 'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane', 'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus', 'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o', 'fa-podcast', 'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq', 'fa-qrcode', 'fa-question', 'fa-question-circle', 'fa-question-circle-o', 'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random', 'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien', 'fa-reddit-square', 'fa-refresh', 'fa-registered', 'fa-remove', 'fa-renren', 'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance', 'fa-retweet', 'fa-rmb', 'fa-road', 'fa-rocket', 'fa-rotate-left', 'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub', 'fa-ruble', 'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors', 'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus', 'fa-sellsy', 'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt', 'fa-share-alt-square', 'fa-share-square', 'fa-share-square-o', 'fa-shekel', 'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag', 'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in', 'fa-sign-language', 'fa-sign-out', 'fa-signal', 'fa-signing', 'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-sliders', 'fa-slideshare', 'fa-smile-o', 'fa-snapchat', 'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o', 'fa-soccer-ball-o', 'fa-sort', 'fa-sort-alpha-asc', 'fa-sort-alpha-desc', 'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc', 'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up', 'fa-soundcloud', 'fa-space-shuttle', 'fa-spinner', 'fa-spoon', 'fa-spotify', 'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-star', 'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full', 'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square', 'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note', 'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle', 'fa-stop-circle-o', 'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon', 'fa-stumbleupon-circle', 'fa-subscript', 'fa-subway', 'fa-suitcase', 'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table', 'fa-tablet', 'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi', 'fa-telegram', 'fa-television', 'fa-tencent-weibo', 'fa-terminal', 'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list', 'fa-themeisle', 'fa-thermometer', 'fa-thermometer-0', 'fa-thermometer-1', 'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4', 'fa-thermometer-empty', 'fa-thermometer-full', 'fa-thermometer-half', 'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack', 'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up', 'fa-ticket', 'fa-times', 'fa-times-circle', 'fa-times-circle-o', 'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down', 'fa-toggle-left', 'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right', 'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender', 'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello', 'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try', 'fa-tty', 'fa-tumblr', 'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter', 'fa-twitter-square', 'fa-umbrella', 'fa-underline', 'fa-undo', 'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock', 'fa-unlock-alt', 'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user', 'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o', 'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard', 'fa-vcard-o', 'fa-venus', 'fa-venus-double', 'fa-venus-mars', 'fa-viacoin', 'fa-viadeo', 'fa-viadeo-square', 'fa-video-camera', 'fa-vimeo', 'fa-vimeo-square', 'fa-vine', 'fa-vk', 'fa-volume-control-phone', 'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wheelchair', 'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close', 'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize', 'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress', 'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing', 'fa-xing-square', 'fa-y-combinator', 'fa-y-combinator-square', 'fa-yahoo', 'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube', 'fa-youtube-play', 'fa-youtube-square'];

  private loadingTableOptions = false;

  private newWidget: any = {
    name: '',
    icon: '',
    description: '',
    type: '',
    width: '12',
    options: {
      zoom: 6,
      lat: 48.864716,
      lng: 2.349014
    },
    filter: {
      where: {
        or: []
      }
    }
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
              private organizationApi: OrganizationApi,
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
    // Prepare icon list
    if (typeof this.fontAwesomeList[0] === 'string') {
      this.fontAwesomeList.forEach((icon, i) => {
        this.fontAwesomeList[i] = {
          id: icon,
          itemName: icon.substr(3)
        };
      });
    }
  }

  log($event) {
    console.log($event);
  }

  setup(): void {
    // this.ngOnDestroy();
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    this.route.params.subscribe(params => {
      console.log(params);

      this.dashboardId = params.id;

      this.route.parent.parent.params.subscribe(parentParams => {
        console.log('Parent param', parentParams);

        if (parentParams.id) {
          this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
            this.organization = organization;
            console.log(organization);


            // Categories
            this.organizationApi.getCategories(this.organization.id).subscribe((categories: Category[]) => {
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
            this.organizationApi.getDevices(this.organization.id).subscribe((devices: Device[]) => {
              this.devices = devices;
              this.devices.forEach((device: Device) => {
                const item = {
                  id: device.id,
                  itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
                };
                this.selectDevices.push(item);
              });
            });
          });


        } else {

          // Categories
          this.userApi.getCategories(this.user.id).subscribe((categories: Category[]) => {
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
          this.userApi.getDevices(this.user.id).subscribe((devices: Device[]) => {
            this.devices = devices;
            this.devices.forEach((device: Device) => {
              const item = {
                id: device.id,
                itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
              };
              this.selectDevices.push(item);
            });
          });



        }
      });
      this.dashboardApi.findById(params.id).subscribe((result: Dashboard) => {
        console.log(result);
        this.dashboard = result;
        this.loadWidgets();
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

    // Reset widget
    this.newWidget = {
      name: '',
      icon: '',
      description: '',
      type: '',
      width: '6',
      options: {
        zoom: 6,
        lat: 48.864716,
        lng: 2.349014
      },
      filter: {
        where: {
          or: []
        }
      },
      dashboardId: this.dashboard.id
    };
  }

  editDashboard(): void {
    this.editFlag = true;
    // Retrieve selected icon
    this.selectedDashboardIcon[0] = {id: this.dashboard.icon, itemName: this.dashboard.icon.substr(3)};
  }

  saveDashboard(): void {
    if (!this.organization) {
      this.userApi.updateByIdDashboards(this.user.id, this.dashboard.id, this.dashboard).subscribe(result => {
        console.log(result);
        this.editFlag = false;
        this.toasterService.pop('success', 'Success', 'Successfully saved dashboard.');
        this.rt.onReady().subscribe();
      });
    } else {
      this.organizationApi.updateByIdDashboards(this.organization.id, this.dashboard.id, this.dashboard).subscribe(result => {
        console.log(result);
        this.editFlag = false;
        this.toasterService.pop('success', 'Success', 'Successfully saved dashboard.');
        this.rt.onReady().subscribe();
      });
    }

  }

  deleteDashboard(): void {
    if (!this.organization) {
      this.userApi.destroyByIdDashboards(this.user.id, this.dashboard.id).subscribe(result => {
        this.router.navigate(['/']);
      });
    } else {
      this.organizationApi.destroyByIdDashboards(this.organization.id, this.dashboard.id).subscribe(result => {
        this.router.navigate(['/organization/' + this.organization.id]);
      });
    }

  }

  addNewWidget(): void {
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
      options: {
        zoom: 6,
        lat: 48.864716,
        lng: 2.349014
      },
      dashboardId: this.dashboard.id
    };

    this.loadSelectFilters();

    this.newWidgetFlag = true;
    this.updateWidgetModal.show();
  }

  addTableType($event): void {
    if ($event === 'custom') {
      this.loadingTableOptions = true;
      this.newWidget.options.tableColumnOptions = [];
      this.newWidget.options.tableColumnOptions.push({model: 'device', key: 'id', type: 'string', as: 'ID'});
      this.newWidget.options.tableColumnOptions.push({model: 'device', key: 'name', type: 'string', as: 'Name'});
      this.newWidget.options.tableColumnOptions.push({
        model: 'device',
        key: 'createdAt',
        type: 'date',
        as: 'Created At'
      });
      this.newWidget.options.tableColumnOptions.push({
        model: 'device',
        key: 'updatedAt',
        type: 'date',
        as: 'Updated At'
      });
      this.newWidget.options.tableColumnOptions.push({
        model: 'device',
        key: 'data_downlink',
        type: 'string',
        as: 'Downlink'
      });
      this.newWidget.options.tableColumnOptions.push({
        model: 'device.Parser',
        key: 'name',
        type: 'string',
        as: 'Parser name'
      });
      if (!this.organization) {
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
            if (device.Messages[0].data_parsed) {
              device.Messages[0].data_parsed.forEach(o => {
                const object: any = {
                  model: 'device.Messages[0].data_parsed',
                  key: o.key,
                  type: o.type,
                  as: o.key + ' (' + device.id + ')'
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
      } else {
        this.organizationApi.getDevices(this.organization.id, this.newWidget.filter).subscribe(devices => {
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
            if (device.Messages[0].data_parsed) {
              device.Messages[0].data_parsed.forEach(o => {
                const object: any = {
                  model: 'device.Messages[0].data_parsed',
                  key: o.key,
                  type: o.type,
                  as: o.key + ' (' + device.id + ')'
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
  }

  formatTableColumn(str: string): string {
    /*if (str.indexOf(' (') !== -1)
      str = str.substring(0, str.indexOf(' ('));*/
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
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
    console.log('setFilter: START', this.newWidget);
    // Map
    if (type === 'map') {
      this.newWidget.filter = {
        limit: 100,
        order: 'updatedAt DESC',
        include: [
          {
            relation: 'Messages',
            scope: {
              limit: 1,
              order: 'createdAt DESC',
              include: [{
                relation: 'Geolocs',
                scope: {
                  limit: 5
                }
              }]
            }
          }],
        where: {
          or: []
        }
      };
    }

    // Table
    else if (type === 'table') {
      this.newWidget.filter = {
        limit: 100,
        order: 'updatedAt DESC',
        include: ['Parser', 'Category', {
          relation: 'Messages',
          scope: {
            limit: 1,
            order: 'createdAt DESC'
          }
        }],
        where: {
          or: []
        }
      };
    }

    // Alert & Gauge
    else if (type === 'alert' || type === 'gauge') {
      this.newWidget.filter = {
        limit: 1,
        order: 'updatedAt DESC',
        include: [{
          relation: 'Messages',
          scope: {
            fields: ['data_parsed', 'createdAt'],
            limit: 1,
            order: 'createdAt DESC',
            where: {
              and: [
                {data_parsed: {neq: null}}
              ]
            }
          }
        }],
        where: {
          or: []
        }
      };
    }

    // Tracking
    else if (type === 'tracking') {
      /*****
       *
       * TODO: periode glissante
       *
       */
        // Month in milliseconds
      const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

      if (this.newWidget.options.geolocType === 'preferGps') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          limit: 10,
          include: [{
            relation: 'Messages',
            order: 'createdAt DESC',
            scope: {
              limit: 1000,
              fields: ['id'],
              order: 'createdAt DESC',
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}}
                ]
              },
              include: [{
                relation: 'Geolocs',
                scope: {
                  limit: 5
                }
              }]
            }
          }]
        };
      } else if (this.newWidget.options.geolocType === 'gps' || this.newWidget.options.geolocType === 'sigfox') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          limit: 10,
          order: 'updatedAt DESC',
          include: [{
            relation: 'Geolocs',
            scope: {
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}},
                  {type: this.newWidget.options.geolocType},
                ]
              },
              limit: 1000
            }
          }]
        };
      } else if (this.newWidget.options.geolocType === 'all') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          limit: 10,
          order: 'updatedAt DESC',
          include: [{
            relation: 'Geolocs',
            scope: {
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}}
                ]
              },
              limit: 1000
            }
          }]
        };
      }
    }

    // Line & Bar
    else if (type === 'line' || type === 'bar') {
      this.newWidget.filter = {
        limit: 10,
        order: 'updatedAt DESC',
        include: [{
          relation: 'Messages',
          scope: {
            fields: ['data_parsed', 'createdAt'],
            limit: 3000,
            order: 'createdAt DESC',
            where: {
              and: [
                {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}},
                {data_parsed: {neq: null}}
              ]
            }
          }
        }],
        where: {
          or: []
        }
      };
    }

    // Reset filters arrays
    this.newWidget.options.keys = [];
    this.newWidget.filter.where.or = [];
    // Set filter arrays by looping on selected data
    this.selectedKeys.forEach((item: any) => {
      this.newWidget.options.keys.push(item.id);
    });
    this.selectedDevices.forEach((item: any) => {
      this.newWidget.filter.where.or.push({id: item.id});
    });
    this.selectedCategories.forEach((item: any) => {
      this.newWidget.filter.where.or.push({categoryId: item.id});
    });
    console.log('Set filter: END', this.newWidget);
    console.log(this.selectedKeys.length, this.selectedKeys);
  }

  loadKeys(): void {
    // Reset the selected keys
    this.selectedKeys = [];
    // Reset the selectable keys
    this.selectKeys = [];
    // Prepare widget keys object
    this.newWidget.options.keys = [];
    // Fetch all the keys belonging to selected devices
    const filter = this.newWidget.filter;
    if (this.newWidget.filter.include[0].scope.where.and[0].createdAt.gte) {
      filter.include[0].scope.where.and[0] = {};
      filter.include[0].scope.limit = 1;
    }
    this.getDevicesWithFilter(filter).subscribe((devices: any[]) => {
      console.log(devices);
      devices.forEach((device: Device) => {
        if (device.Messages[0].data_parsed) {
          device.Messages[0].data_parsed.forEach(o => {
            const item = {
              id: o.key,
              itemName: o.key + ' (' + device.id + ')'
            };
            // console.log(_.find(this.newWidget.options.tableColumnOptions, object));
            //if (!_.find(this.selectKeys, item))
            this.selectKeys.push(item);
          });
        }
      });
    });

  }

  addWidget(): void {
    if (this.newWidget.filter.where.or.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select at least one category or device.');
      return;
    }
    this.newWidget.userId = this.user.id;
    this.dashboardApi.createWidgets(this.dashboard.id, this.newWidget).subscribe(widget => {
      console.log(widget);
      this.loadWidgets();
      this.toasterService.pop('success', 'Success', 'Successfully created widget.');

      this.newWidgetFlag = false;

      this.updateWidgetModal.hide();
    });
  }

  editWidget(widget): void {
    this.newWidgetFlag = false;
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
      this.updateWidgetModal.hide();
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
    this.selectedWidgetIcon = [];
    this.selectedWidgetType = [];
    this.selectedMapType = [];
    this.selectedTableType = [];
    this.selectedCategories = [];
    this.selectedDevices = [];
    this.selectedGeolocType = [];
    this.selectedDateTimeBegin = new Date();
    this.selectedKeys = [];

    if (this.newWidget.icon) {
      this.selectedWidgetIcon = [{id: this.newWidget.icon, itemName: this.newWidget.icon.substr(3)}];
    }
    if (this.newWidget.type !== '') {
      this.selectedWidgetType = [{id: this.newWidget.type, itemName: this.capitalizeFirstLetter(this.newWidget.type)}];
    }
    if (this.newWidget.options.mapTypeId) {
      this.selectedMapType = [{
        id: this.newWidget.options.mapTypeId,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.mapTypeId)
      }];
    }
    if (this.newWidget.options.tableType) {
      this.selectedTableType = [{
        id: this.newWidget.options.tableType,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.tableType)
      }];
    }
    if (this.newWidget.options.geolocType) {
      this.selectedGeolocType = [{
        id: this.newWidget.options.geolocType,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.geolocType)
      }];
    }
    if (this.newWidget.options.keys) {
      this.newWidget.options.keys.forEach((key, i) => {
        this.selectedKeys.push({
          id: this.newWidget.options.keys[i],
          itemName: this.newWidget.options.keys[i]
        });
      });
    }

    this.newWidget.filter.where.or.forEach((item: any, index: number) => {
      if (item.categoryId) {
        const foundCategory = _.find(this.categories, {id: item.categoryId});
        this.selectedCategories.push({id: item.categoryId, itemName: foundCategory.name});
      } else if (item.id) {
        const foundDevice = _.find(this.devices, {id: item.id});
        this.selectedDevices.push({
          id: item.id,
          itemName: foundDevice.name ? foundDevice.id + ' - ' + foundDevice.name : foundDevice.id
        });
      }
    });

    if (this.newWidget.type === 'tracking' || this.newWidget.type === 'line' || this.newWidget.type === 'bar') {
      this.selectedDateTimeBegin = new Date(this.newWidget.filter.include[0].scope.where.and[0].createdAt.gte);
      this.dateTimeSettings.placeholder = moment(this.selectedDateTimeBegin).format('MMM-DD-YYYY hh:mm A');
    }
  }

  onMapReady($event) {
    /*this.widgets.forEach(widget => {
      if (widget.type === 'tracking')
        widget.data[0].visibility = true;
    });*/
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  loadWidgets(): void {
    this.dashboardApi.getWidgets(this.dashboard.id).subscribe((widgets: any[]) => {
      this.dashboardReady = false;
      this.widgets = widgets;
      if (this.widgets) {
        // Build widgets
        this.widgets.forEach((widget: any) => {
          // Devices
          /*this.deviceRef = this.rt.FireLoop.ref<Device>(Device);
          this.deviceRef.on('change', widget.filter).subscribe((devices: any[]) => {*/

          this.getDevicesWithFilter(widget.filter).subscribe((devices: any[]) => {
            // Default data
            widget.data = devices;

            // Table
            if (widget.type === 'table') {
              if (widget.options.tableType === 'custom') {
                widget.data = this.buildCustomTable(widget);
                widget.extraData = devices;
              }
            }

            // Map
            else if (widget.type === 'map') {

            }

            // Tracking
            else if (widget.type === 'tracking') {
              // Default parameters
              widget.data.forEach(device => {
                device.visibility = false;
                device.directionsDisplayStore = [];
                device.color = this.getRandomColor();
              });

              if (widget.options.geolocType === 'preferGps') {
                widget.data.forEach((device: any) => {
                  device.directionsDisplayStore = [];
                  device.Geolocs = [];
                  device.Messages.forEach((message: any) => {
                    message.Geolocs.forEach((geoloc: Geoloc, i) => {
                      device.Geolocs.push(geoloc);
                      if (message.Geolocs.length > 1) {
                        message.Geolocs.forEach((g: Geoloc) => {
                          if (g.messageId === geoloc.messageId && g.type === 'sigfox') {
                            device.Geolocs.splice(g, 1);
                          }
                        });
                      }
                    });
                  });
                });
              }
            }

            // Gauge
            else if (widget.type === 'gauge') {
              const lastData_parsed = _.filter(widget.data[0].Messages[0].data_parsed, {key: widget.options.keys[0]})[0];
              widget.value = lastData_parsed.value;
              widget.unit = lastData_parsed.unit;
              widget.label = this.formatTableColumn(lastData_parsed.key);
            }

            // Line
            else if (widget.type === 'line') {
              widget.chartData = [];
              const keys_units = [];

              let w = 0;

              // Loop each device for this widget
              widget.data.forEach((device: Device) => {
                const data_parsed = device.Messages[0].data_parsed;
                // Loop each keys chosen for this widget
                widget.options.keys.forEach((key) => {
                  const o = _.filter(device.Messages[0].data_parsed, {key: key})[0];
                  console.log(device.id, o);
                  if (o) {
                    keys_units.push(o);
                    // Check if the device has this key
                    data_parsed.forEach((line, k) => {
                      if (line.key === key) {
                        widget.chartData[w] = {};
                        // Set key
                        if (line.unit !== '') {
                          widget.chartData[w].key = line.key + ' (' + line.unit + ')' + ' - ' + device.id;
                        } else {
                          widget.chartData[w].key = line.key + ' - ' + device.id;
                        }
                        // Set values
                        widget.chartData[w].values = [];
                        device.Messages.forEach((message) => {
                          const item = {
                            label: new Date(message.createdAt),
                            value: Number(_.filter(message.data_parsed,
                              {key: key})[0].value)
                          };
                          widget.chartData[w].values.push(item);
                        });
                        data_parsed.splice(k, 1);
                      }
                    });
                    w++;
                  }
                });
              });
              widget.chartOptions = {
                chart: {
                  type: 'lineWithFocusChart',
                  height: 450,
                  margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                  },
                  x: function (d) {
                    return d.label;
                  },
                  y: function (d) {
                    return d.value;
                  },
                  color: [],
                  useVoronoi: true,
                  isArea: true,
                  noData: 'There is no data to display yet',
                  xAxis: {
                    axisLabel: 'Date',
                    tickFormat: function (d) {
                      return d3.time.format('%d %b %y')(new Date(d));
                    }
                  },
                  x2Axis: {
                    tickFormat: function (d) {
                      return d3.time.format('%d %b %y')(new Date(d));
                    }
                  }
                }
              };
              // Dynamically add Y axis to chart
              keys_units.forEach((key_unit: any) => {
                widget.chartOptions.chart.color.push(this.getRandomColor());
                if (keys_units.length === 1) {
                  widget.chartOptions.chart['yAxis'] = {
                    axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                    axisLabelDistance: -10
                  };
                }
                /*if (i === 0) {
                  widget.chartOptions.chart['yAxis'] = {
                    axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                    axisLabelDistance: -10
                  };
                } else {
                  widget.chartOptions.chart['y' + i + 'Axis'] = {
                    axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                    axisLabelDistance: -10
                  };
                }*/
                widget.chartOptions.chart.tooltip = {
                  contentGenerator: function (e) {
                    const series = e.series[0];
                    if (series.value === null) return;

                    const rows =
                      '<tr>' +
                      '<td class="key">' + 'Date: ' + '</td>' +
                      '<td class="x-value">' + d3.time.format('%d %b %y - %I:%M %p')(new Date(e.value)) + '</td>' +
                      '</tr>' +
                      '<tr>' +
                      '<td class="key">' + 'Value: ' + '</td>' +
                      '<td class="x-value"><strong>' + (series.value ? series.value.toFixed(2) : 0) + '</strong></td>' +
                      '</tr>';

                    const header =
                      '<thead>' +
                      '<tr>' +
                      '<td class="legend-color-guide"><div style="background-color: ' + series.color + ';"></div></td>' +
                      '<td class="key"><strong>' + series.key + '</strong></td>' +
                      '</tr>' +
                      '</thead>';

                    return '<table>' +
                      header +
                      '<tbody>' +
                      rows +
                      '</tbody>' +
                      '</table>';
                  }
                };
              });
            }

            // Bar
            else if (widget.type === 'bar') {
              widget.chartData = [];
              const keys_units = [];

              let w = 0;

              // Loop each device for this widget
              widget.data.forEach((device: Device) => {
                const data_parsed = device.Messages[0].data_parsed;
                // Loop each keys chosen for this widget
                widget.options.keys.forEach((key) => {
                  const o = _.filter(device.Messages[0].data_parsed, {key: key})[0];
                  console.log(device.id, o);
                  if (o) {
                    keys_units.push(o);
                    // Check if the device has this key
                    data_parsed.forEach((line, k) => {
                      if (line.key === key) {
                        widget.chartData[w] = {};
                        // Set key
                        if (line.unit !== '') {
                          widget.chartData[w].key = line.key + ' (' + line.unit + ')' + ' - ' + device.id;
                        } else {
                          widget.chartData[w].key = line.key + ' - ' + device.id;
                        }
                        // Set values
                        widget.chartData[w].values = [];
                        device.Messages.forEach((message) => {
                          const item = {
                            label: new Date(message.createdAt),
                            value: Number(_.filter(message.data_parsed,
                              {key: key})[0].value)
                          };
                          widget.chartData[w].values.push(item);
                        });
                        data_parsed.splice(k, 1);
                      }
                    });
                    w++;
                  }
                });
              });
              widget.chartOptions = {
                chart: {
                  type: 'discreteBarChart',
                  height: 450,
                  margin: {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 55
                  },
                  x: function (d) {
                    return d.label;
                  },
                  y: function (d) {
                    return d.value;
                  },
                  color: [],
                  useVoronoi: true,
                  showXAxis: false,
                  noData: 'There is no data to display yet',
                }
              };
              // Dynamically add Y axis to chart
              keys_units.forEach((key_unit: any) => {
                widget.chartOptions.chart.color.push(this.getRandomColor());
                if (keys_units.length === 1) {
                  widget.chartOptions.chart['yAxis'] = {
                    ticks: 5,
                    axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                    axisLabelDistance: -10
                  };
                }
                widget.chartOptions.chart.tooltip = {
                  contentGenerator: function (e) {
                    const series = e.series[0];
                    if (series.value === null) return;

                    const rows =
                      '<tr>' +
                      '<td class="key">' + 'Date: ' + '</td>' +
                      '<td class="x-value">' + d3.time.format('%d %b %y - %I:%M %p')(new Date(e.value)) + '</td>' +
                      '</tr>' +
                      '<tr>' +
                      '<td class="key">' + 'Value: ' + '</td>' +
                      '<td class="x-value"><strong>' + (series.value ? series.value.toFixed(2) : 0) + '</strong></td>' +
                      '</tr>';

                    const header =
                      '<thead>' +
                      '<tr>' +
                      '<td class="legend-color-guide"><div style="background-color: ' + series.color + ';"></div></td>' +
                      '<td class="key"><strong>' + series.key + '</strong></td>' +
                      '</tr>' +
                      '</thead>';

                    return '<table>' +
                      header +
                      '<tbody>' +
                      rows +
                      '</tbody>' +
                      '</table>';
                  }
                };
              });
            }

            console.log('Widget loaded', widget);
          });

        });
      }
      this.dashboardReady = true;
    });
  }

  /*markAlertProcess(widget, i): void {
    const updateMessage = widget.extraData[i].Messages[0];
    updateMessage.data_parsed = [{key: 'alert', value: 'processing', type: 'boolean', unit: ''}];
    this.userApi.updateByIdMessages(this.user.id, widget.extraData[i].Messages[0].id, updateMessage).subscribe( (message: Message) => {
      widget.extraData[i].Messages[0] = message;
    });
  }
  markAlertDone(widget, i): void {
    const updateMessage = widget.extraData[i].Messages[0];
    updateMessage.data_parsed = [{key: 'alert', value: 'treated', type: 'boolean', unit: ''}];
    this.userApi.updateByIdMessages(this.user.id, widget.extraData[i].Messages[0].id, updateMessage).subscribe( (message: Message) => {
      widget.extraData[i].Messages[0] = message;
    });
  }*/

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
          const index = _.findIndex(row.properties, {'key': col.key});
          if (index !== -1) {
            obj.value = row.properties[index].value;
          }
        }
        if (col.model === 'device.data_parsed') {
          const index = _.findIndex(row.data_parsed, {'key': col.key});
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

  private getDevicesWithFilter(filter: any): Observable<any[]> {

    if (!this.organization) {
      return this.userApi.getDevices(this.user.id, filter);
    } else {
      return this.organizationApi.getDevices(this.organization.id, filter);
    }

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

