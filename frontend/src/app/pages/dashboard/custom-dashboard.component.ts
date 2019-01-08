import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DashboardApi, UserApi} from '../../shared/sdk/services/index';
import {Category, Dashboard, Device, User, Widget} from '../../shared/sdk/models/index';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Geoloc, Message, Organization} from '../../shared/sdk/models';
import * as _ from 'lodash';
import * as moment from 'moment';
import {MessageApi, OrganizationApi} from '../../shared/sdk/services/custom';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {AgmMap, LatLngBounds} from '@agm/core';
import {Subscription} from 'rxjs/Subscription';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {Location} from '@angular/common';
import {environment} from "../../../../environments/environment";

declare let d3: any;
declare const google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './custom-dashboard.component.html',
  styleUrls: ['./custom-dashboard.component.scss']
})
export class CustomDashboardComponent implements OnInit, OnDestroy {

  @ViewChild('addOrEditWidgetModal') addOrEditWidgetModal: any;
  @ViewChild('searchBoxInput') searchBoxInput: ElementRef;

  private user: User;

  // Map
  @ViewChildren('agmMap') agmMaps: QueryList<AgmMap>;
  private map: any;
  private searchBox: any;

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
  private selectedTimeSpan = [];
  private selectedGeolocType = [];
  private selectedKeys = [];
  private selectedBarMsgCounterPeriod = [];

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
    {id: 'text', itemName: 'Text'},
    {id: 'value', itemName: 'Value'},
    {id: 'image', itemName: 'Image'},
    {id: 'divider', itemName: 'Divider'},
    {id: 'table', itemName: 'Table'},
    {id: 'map', itemName: 'Map (latest location)'},
    {id: 'tracking', itemName: 'Tracking'},
    {id: 'gauge', itemName: 'Gauge'},
    {id: 'line', itemName: 'Line graph'},
    {id: 'bar', itemName: 'Bar graph'},
    {id: 'bar-custom', itemName: 'Bar custom graph'},
    {id: 'bar-custom-stats', itemName: 'Bar custom stats'},
    {id: 'bar-exact', itemName: 'Bar graph with value assertion'},
    {id: 'stats', itemName: 'Message counter'}
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
    {id: 'beacon', itemName: 'Beacon'},
    {id: 'wifi', itemName: 'WiFi'},
    {id: 'preferBestAccuracy', itemName: 'Prefer best accuracy'},
    {id: 'all', itemName: 'All kinds'}
  ];
  private selectBarMsgCounterPeriod = [
    {id: 'hourly', itemName: 'Hourly'},
    {id: 'daily', itemName: 'Daily'},
    {id: 'weekly', itemName: 'Weekly'},
    {id: 'monthly', itemName: 'Monthly'},
    {id: 'yearly', itemName: 'Yearly'}
  ];
  private selectTimeSpan = [
    {id: 'ten-minutes', itemName: 'Last ten minutes'},
    {id: 'hour', itemName: 'Last hour'},
    {id: 'day', itemName: 'Last day'},
    {id: 'three-days', itemName: 'Last three day'},
    {id: 'one-week', itemName: 'Last week'},
    {id: 'two-weeks', itemName: 'Last two weeks'},
    {id: 'three-weeks', itemName: 'Last three weeks'},
    {id: 'month', itemName: 'Last month'},
    {id: 'year', itemName: 'Last year'}
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
  public widgets: Array<any> = [];

  private subscriptions: Subscription[] = [];

  private dashboard: Dashboard;
  public dashboardReady = false;
  private dashboardId = '';

  public editFlag = false;
  public newWidgetFlag = false;
  public editWidgetFlag = false;

  private fontAwesomeList: any[] = ['fa-500px', 'fa-address-book', 'fa-address-book-o', 'fa-address-card', 'fa-address-card-o', 'fa-adjust', 'fa-adn', 'fa-align-center', 'fa-align-justify', 'fa-align-left', 'fa-align-right', 'fa-amazon', 'fa-ambulance', 'fa-american-sign-language-interpreting', 'fa-anchor', 'fa-android', 'fa-angellist', 'fa-angle-double-down', 'fa-angle-double-left', 'fa-angle-double-right', 'fa-angle-double-up', 'fa-angle-down', 'fa-angle-left', 'fa-angle-right', 'fa-angle-up', 'fa-apple', 'fa-archive', 'fa-area-chart', 'fa-arrow-circle-down', 'fa-arrow-circle-left', 'fa-arrow-circle-o-down', 'fa-arrow-circle-o-left', 'fa-arrow-circle-o-right', 'fa-arrow-circle-o-up', 'fa-arrow-circle-right', 'fa-arrow-circle-up', 'fa-arrow-down', 'fa-arrow-left', 'fa-arrow-right', 'fa-arrow-up', 'fa-arrows', 'fa-arrows-alt', 'fa-arrows-h', 'fa-arrows-v', 'fa-asl-interpreting', 'fa-assistive-listening-systems', 'fa-asterisk', 'fa-at', 'fa-audio-description', 'fa-automobile', 'fa-backward', 'fa-balance-scale', 'fa-ban', 'fa-bandcamp', 'fa-bank', 'fa-bar-chart', 'fa-bar-chart-o', 'fa-barcode', 'fa-bars', 'fa-bath', 'fa-bathtub', 'fa-battery', 'fa-battery-0', 'fa-battery-1', 'fa-battery-2', 'fa-battery-3', 'fa-battery-4', 'fa-battery-empty', 'fa-battery-full', 'fa-battery-half', 'fa-battery-quarter', 'fa-battery-three-quarters', 'fa-bed', 'fa-beer', 'fa-behance', 'fa-behance-square', 'fa-bell', 'fa-bell-o', 'fa-bell-slash', 'fa-bell-slash-o', 'fa-bicycle', 'fa-binoculars', 'fa-birthday-cake', 'fa-bitbucket', 'fa-bitbucket-square', 'fa-bitcoin', 'fa-black-tie', 'fa-blind', 'fa-bluetooth', 'fa-bluetooth-b', 'fa-bold', 'fa-bolt', 'fa-bomb', 'fa-book', 'fa-bookmark', 'fa-bookmark-o', 'fa-braille', 'fa-briefcase', 'fa-btc', 'fa-bug', 'fa-building', 'fa-building-o', 'fa-bullhorn', 'fa-bullseye', 'fa-bus', 'fa-buysellads', 'fa-cab', 'fa-calculator', 'fa-calendar', 'fa-calendar-check-o', 'fa-calendar-minus-o', 'fa-calendar-o', 'fa-calendar-plus-o', 'fa-calendar-times-o', 'fa-camera', 'fa-camera-retro', 'fa-car', 'fa-caret-down', 'fa-caret-left', 'fa-caret-right', 'fa-caret-square-o-down', 'fa-caret-square-o-left', 'fa-caret-square-o-right', 'fa-caret-square-o-up', 'fa-caret-up', 'fa-cart-arrow-down', 'fa-cart-plus', 'fa-cc', 'fa-cc-amex', 'fa-cc-diners-club', 'fa-cc-discover', 'fa-cc-jcb', 'fa-cc-mastercard', 'fa-cc-paypal', 'fa-cc-stripe', 'fa-cc-visa', 'fa-certificate', 'fa-chain', 'fa-chain-broken', 'fa-check', 'fa-check-circle', 'fa-check-circle-o', 'fa-check-square', 'fa-check-square-o', 'fa-chevron-circle-down', 'fa-chevron-circle-left', 'fa-chevron-circle-right', 'fa-chevron-circle-up', 'fa-chevron-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-chevron-up', 'fa-child', 'fa-chrome', 'fa-circle', 'fa-circle-o', 'fa-circle-o-notch', 'fa-circle-thin', 'fa-clipboard', 'fa-clock-o', 'fa-clone', 'fa-close', 'fa-cloud', 'fa-cloud-download', 'fa-cloud-upload', 'fa-cny', 'fa-code', 'fa-code-fork', 'fa-codepen', 'fa-codiepie', 'fa-coffee', 'fa-cog', 'fa-cogs', 'fa-columns', 'fa-comment', 'fa-comment-o', 'fa-commenting', 'fa-commenting-o', 'fa-comments', 'fa-comments-o', 'fa-compass', 'fa-compress', 'fa-connectdevelop', 'fa-contao', 'fa-copy', 'fa-copyright', 'fa-creative-commons', 'fa-credit-card', 'fa-credit-card-alt', 'fa-crop', 'fa-crosshairs', 'fa-css3', 'fa-cube', 'fa-cubes', 'fa-cut', 'fa-cutlery', 'fa-dashboard', 'fa-dashcube', 'fa-database', 'fa-deaf', 'fa-deafness', 'fa-dedent', 'fa-delicious', 'fa-desktop', 'fa-deviantart', 'fa-diamond', 'fa-digg', 'fa-dollar', 'fa-dot-circle-o', 'fa-download', 'fa-dribbble', 'fa-drivers-license', 'fa-drivers-license-o', 'fa-dropbox', 'fa-drupal', 'fa-edge', 'fa-edit', 'fa-eercast', 'fa-eject', 'fa-ellipsis-h', 'fa-ellipsis-v', 'fa-empire', 'fa-envelope', 'fa-envelope-o', 'fa-envelope-open', 'fa-envelope-open-o', 'fa-envelope-square', 'fa-envira', 'fa-eraser', 'fa-etsy', 'fa-eur', 'fa-euro', 'fa-exchange', 'fa-exclamation', 'fa-exclamation-circle', 'fa-exclamation-triangle', 'fa-expand', 'fa-expeditedssl', 'fa-external-link', 'fa-external-link-square', 'fa-eye', 'fa-eye-slash', 'fa-eyedropper', 'fa-fa', 'fa-facebook', 'fa-facebook-f', 'fa-facebook-official', 'fa-facebook-square', 'fa-fast-backward', 'fa-fast-forward', 'fa-fax', 'fa-feed', 'fa-female', 'fa-fighter-jet', 'fa-file', 'fa-file-archive-o', 'fa-file-audio-o', 'fa-file-code-o', 'fa-file-excel-o', 'fa-file-image-o', 'fa-file-movie-o', 'fa-file-o', 'fa-file-pdf-o', 'fa-file-photo-o', 'fa-file-picture-o', 'fa-file-powerpoint-o', 'fa-file-sound-o', 'fa-file-text', 'fa-file-text-o', 'fa-file-video-o', 'fa-file-word-o', 'fa-file-zip-o', 'fa-files-o', 'fa-film', 'fa-filter', 'fa-fire', 'fa-fire-extinguisher', 'fa-firefox', 'fa-first-order', 'fa-flag', 'fa-flag-checkered', 'fa-flag-o', 'fa-flash', 'fa-flask', 'fa-flickr', 'fa-floppy-o', 'fa-folder', 'fa-folder-o', 'fa-folder-open', 'fa-folder-open-o', 'fa-font', 'fa-font-awesome', 'fa-fonticons', 'fa-fort-awesome', 'fa-forumbee', 'fa-forward', 'fa-foursquare', 'fa-free-code-camp', 'fa-frown-o', 'fa-futbol-o', 'fa-gamepad', 'fa-gavel', 'fa-gbp', 'fa-ge', 'fa-gear', 'fa-gears', 'fa-genderless', 'fa-get-pocket', 'fa-gg', 'fa-gg-circle', 'fa-gift', 'fa-git', 'fa-git-square', 'fa-github', 'fa-github-alt', 'fa-github-square', 'fa-gitlab', 'fa-gittip', 'fa-glass', 'fa-glide', 'fa-glide-g', 'fa-globe', 'fa-google', 'fa-google-plus', 'fa-google-plus-circle', 'fa-google-plus-official', 'fa-google-plus-square', 'fa-google-wallet', 'fa-graduation-cap', 'fa-gratipay', 'fa-grav', 'fa-group', 'fa-h-square', 'fa-hacker-news', 'fa-hand-grab-o', 'fa-hand-lizard-o', 'fa-hand-o-down', 'fa-hand-o-left', 'fa-hand-o-right', 'fa-hand-o-up', 'fa-hand-paper-o', 'fa-hand-peace-o', 'fa-hand-pointer-o', 'fa-hand-rock-o', 'fa-hand-scissors-o', 'fa-hand-spock-o', 'fa-hand-stop-o', 'fa-handshake-o', 'fa-hard-of-hearing', 'fa-hashtag', 'fa-hdd-o', 'fa-header', 'fa-headphones', 'fa-heart', 'fa-heart-o', 'fa-heartbeat', 'fa-history', 'fa-overview', 'fa-hospital-o', 'fa-hotel', 'fa-hourglass', 'fa-hourglass-1', 'fa-hourglass-2', 'fa-hourglass-3', 'fa-hourglass-end', 'fa-hourglass-half', 'fa-hourglass-o', 'fa-hourglass-start', 'fa-houzz', 'fa-html5', 'fa-i-cursor', 'fa-id-badge', 'fa-id-card', 'fa-id-card-o', 'fa-ils', 'fa-image', 'fa-imdb', 'fa-inbox', 'fa-indent', 'fa-industry', 'fa-info', 'fa-info-circle', 'fa-inr', 'fa-instagram', 'fa-institution', 'fa-internet-explorer', 'fa-intersex', 'fa-ioxhost', 'fa-italic', 'fa-joomla', 'fa-jpy', 'fa-jsfiddle', 'fa-key', 'fa-keyboard-o', 'fa-krw', 'fa-language', 'fa-laptop', 'fa-lastfm', 'fa-lastfm-square', 'fa-leaf', 'fa-leanpub', 'fa-legal', 'fa-lemon-o', 'fa-level-down', 'fa-level-up', 'fa-life-bouy', 'fa-life-buoy', 'fa-life-ring', 'fa-life-saver', 'fa-lightbulb-o', 'fa-line-chart', 'fa-link', 'fa-linkedin', 'fa-linkedin-square', 'fa-linode', 'fa-linux', 'fa-list', 'fa-list-alt', 'fa-list-ol', 'fa-list-ul', 'fa-location-arrow', 'fa-lock', 'fa-long-arrow-down', 'fa-long-arrow-left', 'fa-long-arrow-right', 'fa-long-arrow-up', 'fa-low-vision', 'fa-magic', 'fa-magnet', 'fa-mail-forward', 'fa-mail-reply', 'fa-mail-reply-all', 'fa-male', 'fa-map', 'fa-map-marker', 'fa-map-o', 'fa-map-pin', 'fa-map-signs', 'fa-mars', 'fa-mars-double', 'fa-mars-stroke', 'fa-mars-stroke-h', 'fa-mars-stroke-v', 'fa-maxcdn', 'fa-meanpath', 'fa-medium', 'fa-medkit', 'fa-meetup', 'fa-meh-o', 'fa-mercury', 'fa-microchip', 'fa-microphone', 'fa-microphone-slash', 'fa-minus', 'fa-minus-circle', 'fa-minus-square', 'fa-minus-square-o', 'fa-mixcloud', 'fa-mobile', 'fa-mobile-phone', 'fa-modx', 'fa-money', 'fa-moon-o', 'fa-mortar-board', 'fa-motorcycle', 'fa-mouse-pointer', 'fa-music', 'fa-navicon', 'fa-neuter', 'fa-newspaper-o', 'fa-object-group', 'fa-object-ungroup', 'fa-odnoklassniki', 'fa-odnoklassniki-square', 'fa-opencart', 'fa-openid', 'fa-opera', 'fa-optin-monster', 'fa-outdent', 'fa-pagelines', 'fa-paint-brush', 'fa-paper-plane', 'fa-paper-plane-o', 'fa-paperclip', 'fa-paragraph', 'fa-paste', 'fa-pause', 'fa-pause-circle', 'fa-pause-circle-o', 'fa-paw', 'fa-paypal', 'fa-pencil', 'fa-pencil-square', 'fa-pencil-square-o', 'fa-percent', 'fa-phone', 'fa-phone-square', 'fa-photo', 'fa-picture-o', 'fa-pie-chart', 'fa-pied-piper', 'fa-pied-piper-alt', 'fa-pied-piper-pp', 'fa-pinterest', 'fa-pinterest-p', 'fa-pinterest-square', 'fa-plane', 'fa-play', 'fa-play-circle', 'fa-play-circle-o', 'fa-plug', 'fa-plus', 'fa-plus-circle', 'fa-plus-square', 'fa-plus-square-o', 'fa-podcast', 'fa-power-off', 'fa-print', 'fa-product-hunt', 'fa-puzzle-piece', 'fa-qq', 'fa-qrcode', 'fa-question', 'fa-question-circle', 'fa-question-circle-o', 'fa-quora', 'fa-quote-left', 'fa-quote-right', 'fa-ra', 'fa-random', 'fa-ravelry', 'fa-rebel', 'fa-recycle', 'fa-reddit', 'fa-reddit-alien', 'fa-reddit-square', 'fa-refresh', 'fa-registered', 'fa-remove', 'fa-renren', 'fa-reorder', 'fa-repeat', 'fa-reply', 'fa-reply-all', 'fa-resistance', 'fa-retweet', 'fa-rmb', 'fa-road', 'fa-rocket', 'fa-rotate-left', 'fa-rotate-right', 'fa-rouble', 'fa-rss', 'fa-rss-square', 'fa-rub', 'fa-ruble', 'fa-rupee', 'fa-s15', 'fa-safari', 'fa-save', 'fa-scissors', 'fa-scribd', 'fa-search', 'fa-search-minus', 'fa-search-plus', 'fa-sellsy', 'fa-send', 'fa-send-o', 'fa-server', 'fa-share', 'fa-share-alt', 'fa-share-alt-square', 'fa-share-square', 'fa-share-square-o', 'fa-shekel', 'fa-sheqel', 'fa-shield', 'fa-ship', 'fa-shirtsinbulk', 'fa-shopping-bag', 'fa-shopping-basket', 'fa-shopping-cart', 'fa-shower', 'fa-sign-in', 'fa-sign-language', 'fa-sign-out', 'fa-signal', 'fa-signing', 'fa-simplybuilt', 'fa-sitemap', 'fa-skyatlas', 'fa-skype', 'fa-slack', 'fa-sliders', 'fa-slideshare', 'fa-smile-o', 'fa-snapchat', 'fa-snapchat-ghost', 'fa-snapchat-square', 'fa-snowflake-o', 'fa-soccer-ball-o', 'fa-sort', 'fa-sort-alpha-asc', 'fa-sort-alpha-desc', 'fa-sort-amount-asc', 'fa-sort-amount-desc', 'fa-sort-asc', 'fa-sort-desc', 'fa-sort-down', 'fa-sort-numeric-asc', 'fa-sort-numeric-desc', 'fa-sort-up', 'fa-soundcloud', 'fa-space-shuttle', 'fa-spinner', 'fa-spoon', 'fa-spotify', 'fa-square', 'fa-square-o', 'fa-stack-exchange', 'fa-stack-overflow', 'fa-star', 'fa-star-half', 'fa-star-half-empty', 'fa-star-half-full', 'fa-star-half-o', 'fa-star-o', 'fa-steam', 'fa-steam-square', 'fa-step-backward', 'fa-step-forward', 'fa-stethoscope', 'fa-sticky-note', 'fa-sticky-note-o', 'fa-stop', 'fa-stop-circle', 'fa-stop-circle-o', 'fa-street-view', 'fa-strikethrough', 'fa-stumbleupon', 'fa-stumbleupon-circle', 'fa-subscript', 'fa-subway', 'fa-suitcase', 'fa-sun-o', 'fa-superpowers', 'fa-superscript', 'fa-support', 'fa-table', 'fa-tablet', 'fa-tachometer', 'fa-tag', 'fa-tags', 'fa-tasks', 'fa-taxi', 'fa-telegram', 'fa-television', 'fa-tencent-weibo', 'fa-terminal', 'fa-text-height', 'fa-text-width', 'fa-th', 'fa-th-large', 'fa-th-list', 'fa-themeisle', 'fa-thermometer', 'fa-thermometer-0', 'fa-thermometer-1', 'fa-thermometer-2', 'fa-thermometer-3', 'fa-thermometer-4', 'fa-thermometer-empty', 'fa-thermometer-full', 'fa-thermometer-half', 'fa-thermometer-quarter', 'fa-thermometer-three-quarters', 'fa-thumb-tack', 'fa-thumbs-down', 'fa-thumbs-o-down', 'fa-thumbs-o-up', 'fa-thumbs-up', 'fa-ticket', 'fa-times', 'fa-times-circle', 'fa-times-circle-o', 'fa-times-rectangle', 'fa-times-rectangle-o', 'fa-tint', 'fa-toggle-down', 'fa-toggle-left', 'fa-toggle-off', 'fa-toggle-on', 'fa-toggle-right', 'fa-toggle-up', 'fa-trademark', 'fa-train', 'fa-transgender', 'fa-transgender-alt', 'fa-trash', 'fa-trash-o', 'fa-tree', 'fa-trello', 'fa-tripadvisor', 'fa-trophy', 'fa-truck', 'fa-try', 'fa-tty', 'fa-tumblr', 'fa-tumblr-square', 'fa-turkish-lira', 'fa-tv', 'fa-twitch', 'fa-twitter', 'fa-twitter-square', 'fa-umbrella', 'fa-underline', 'fa-undo', 'fa-universal-access', 'fa-university', 'fa-unlink', 'fa-unlock', 'fa-unlock-alt', 'fa-unsorted', 'fa-upload', 'fa-usb', 'fa-usd', 'fa-user', 'fa-user-circle', 'fa-user-circle-o', 'fa-user-md', 'fa-user-o', 'fa-user-plus', 'fa-user-secret', 'fa-user-times', 'fa-users', 'fa-vcard', 'fa-vcard-o', 'fa-venus', 'fa-venus-double', 'fa-venus-mars', 'fa-viacoin', 'fa-viadeo', 'fa-viadeo-square', 'fa-video-camera', 'fa-vimeo', 'fa-vimeo-square', 'fa-vine', 'fa-vk', 'fa-volume-control-phone', 'fa-volume-down', 'fa-volume-off', 'fa-volume-up', 'fa-warning', 'fa-wechat', 'fa-weibo', 'fa-weixin', 'fa-whatsapp', 'fa-wheelchair', 'fa-wheelchair-alt', 'fa-wifi', 'fa-wikipedia-w', 'fa-window-close', 'fa-window-close-o', 'fa-window-maximize', 'fa-window-minimize', 'fa-window-restore', 'fa-windows', 'fa-won', 'fa-wordpress', 'fa-wpbeginner', 'fa-wpexplorer', 'fa-wpforms', 'fa-wrench', 'fa-xing', 'fa-xing-square', 'fa-y-combinator', 'fa-y-combinator-square', 'fa-yahoo', 'fa-yc', 'fa-yc-square', 'fa-yelp', 'fa-yen', 'fa-yoast', 'fa-youtube', 'fa-youtube-play', 'fa-youtube-square'];

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

  private mobile = false;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  private api;
  private id;

  constructor(private rt: RealtimeService,
              private userApi: UserApi,
              private messageApi: MessageApi,
              private dashboardApi: DashboardApi,
              private organizationApi: OrganizationApi,
              private route: ActivatedRoute,
              private router: Router,
              toasterService: ToasterService,
              private _location: Location,
              private http: HttpClient) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Custom Dashboard: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    if (window.screen.width <= 425) { // 768px portrait
      this.mobile = true;
    }

    this.subscriptions.push(this.route.parent.parent.params.subscribe(parentParams => {
      if (parentParams.id) {
        this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.setup();
        });
      } else {
        this.setup();
      }
    }));

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

  setup(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.api = this.organization ? this.organizationApi : this.userApi;
      this.id = this.organization ? this.organization.id : this.user.id;
      this.unsubscribe();
      this.subscribe(this.id);
      // Load dashboard
      this.api.findByIdDashboards(this.id, params.id).subscribe((dashboard: Dashboard) => {
        this.dashboard = dashboard;
        this.loadWidgets();
      });

      // Categories
      this.api.getCategories(this.id).subscribe((categories: Category[]) => {
        this.selectCategories = [];
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
      this.api.getDevices(this.id, {order: 'messagedAt DESC'}).subscribe((devices: Device[]) => {
        this.selectDevices = [];
        this.devices = devices;
        this.devices.forEach((device: Device) => {
          const item = {
            id: device.id,
            itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
          };
          this.selectDevices.push(item);
        });
      });
    }));
  }

  ngOnDestroy(): void {
    console.log('Custom Dashboard: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.unsubscribe();
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
      options: {},
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
    this.api.updateByIdDashboards(this.id, this.dashboard.id, this.dashboard).subscribe((dashboard: Dashboard) => {
      this.editFlag = false;
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toasterService.pop('success', 'Success', 'Successfully saved dashboard.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error);
    });
  }

  deleteDashboard(): void {
    this.api.destroyByIdDashboards(this.id, this.dashboard.id).subscribe((dashboard: Dashboard) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toasterService.pop('success', 'Success', 'Successfully deleted dashboard.');
      this._location.back();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error);
    });
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
      options: {},
      dashboardId: this.dashboard.id
    };

    this.loadSelects();

    this.newWidgetFlag = true;
    this.addOrEditWidgetModal.show();
  }

  fileUpload(event): void {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('file', file, file.name);

      let headers = {
        Accept: 'application/json',
        filename: file.name,
        enctype: 'multipart/form-data'
      };
      this.http.post(`${environment.apiUrl}/${environment.apiVersion}/assets/upload`, formData, { headers: headers })
        .map(res => (<any>res).url)
        .catch(error => Observable.throw(error))
        .subscribe(
          url => this.newWidget.image = url,
          error => console.error(error)
        )
    }
  }

  addTableType($event): void {
    if ($event === 'exact') {
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

      this.api.getDevices(this.id, this.newWidget.filter).subscribe(devices => {
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

  setWidgetFilter(): void {
    console.log('setFilter: START', this.newWidget);
    // Value
    if (this.newWidget.type === 'value') {
      this.newWidget.filter = {
        limit: 1,
        order: 'messagedAt DESC',
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
    // Image and divider
    if (this.newWidget.type === 'image' || this.newWidget.type === 'divider') this.newWidget.filter = {};

    // Map
    else if (this.newWidget.type === 'map') {
      this.newWidget.filter = {
        limit: 100,
        order: 'messagedAt DESC',
        include: [
          {
            relation: 'Messages',
            scope: {
              limit: 1,
              order: 'createdAt DESC',
              include: [{
                relation: 'Geolocs',
                scope: {
                  order: 'accuracy ASC',
                  limit: 1
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
    else if (this.newWidget.type === 'table') {
      this.newWidget.filter = {
        limit: 100,
        order: 'messagedAt DESC',
        include: ['Parser', 'Category', 'Geolocs', {
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
    else if (this.newWidget.type === 'gauge') {
      this.newWidget.filter = {
        limit: 1,
        order: 'messagedAt DESC',
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
    else if (this.newWidget.type === 'tracking') {
      if (this.newWidget.options.geolocType === 'preferBestAccuracy') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          order: 'messagedAt DESC',
          limit: 300,
          include: [{
            relation: 'Messages',
            scope: {
              order: 'createdAt ASC',
              limit: 1,
              fields: ['id'],
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}}
                ]
              },
              include: [{
                relation: 'Geolocs',
                scope: {
                  where: {
                    accuracy: {lte: this.newWidget.options.minAcc ? this.newWidget.options.minAcc : 99999999}
                  },
                  order: 'accuracy ASC',
                  limit: 1
                }
              }]
            }
          }]
        };
      } else if (this.newWidget.options.geolocType === 'gps' || this.newWidget.options.geolocType === 'sigfox' || this.newWidget.options.geolocType === 'beacon' || this.newWidget.options.geolocType === 'wifi') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          limit: 300,
          order: 'messagedAt DESC',
          include: [{
            relation: 'Geolocs',
            scope: {
              order: 'createdAt ASC',
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}},
                  {accuracy: {lte: this.newWidget.options.minAcc ? this.newWidget.options.minAcc : 999999}},
                  {type: this.newWidget.options.geolocType},
                ]
              }
            }
          }]
        };
      } else if (this.newWidget.options.geolocType === 'all') {
        this.newWidget.filter = {
          where: {
            or: []
          },
          limit: 300,
          order: 'messagedAt DESC',
          include: [{
            order: 'createdAt ASC',
            relation: 'Geolocs',
            scope: {
              where: {
                and: [
                  {createdAt: {gte: this.selectedDateTimeBegin.toISOString()}},
                  {accuracy: {lte: this.newWidget.options.minAcc ? this.newWidget.options.minAcc : 999999}}
                ]
              }
            }
          }]
        };
      }
    }
    // Line & Bar
    else if (this.newWidget.type === 'line' || this.newWidget.type === 'bar') {
      this.newWidget.filter = {
        limit: 20,
        order: 'messagedAt DESC',
        include: [{
          relation: 'Messages',
          scope: {
            fields: ['data_parsed', 'createdAt'],
            limit: 1000,
            order: 'createdAt ASC',
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
    // Bar
    else if (this.newWidget.type === 'bar-exact' || this.newWidget.type === 'bar-custom' || this.newWidget.type === 'bar-custom-stats') {
      this.newWidget.filter = {
        limit: 20,
        order: 'messagedAt DESC',
        include: [{
          relation: 'Messages',
          scope: {
            fields: ['data_parsed', 'createdAt'],
            limit: 1000,
            order: 'createdAt ASC',
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
    // Bar message counter
    else if (this.newWidget.type === 'stats') {
      this.newWidget.filter = {
        limit: 20,
        order: 'messagedAt DESC',
        fields: ['id'],
        where: {
          or: []
        }
      };
    }

    // Reset filters arrays
    if (this.newWidget.options.keys) {
      this.newWidget.options.keys = [];
      // Set keys
      this.selectedKeys.forEach((item: any) => {
        this.newWidget.options.keys.push(item.id);
      });
    }
    if (this.newWidget.filter.where && this.newWidget.filter.where.or) {
      this.newWidget.filter.where.or = [];
      // Set devices
      this.selectedDevices.forEach((item: any) => {
        this.newWidget.filter.where.or.push({id: item.id});
      });
      // Set categories
      this.selectedCategories.forEach((item: any) => {
        this.newWidget.filter.where.or.push({categoryId: item.id});
      });
    }

    // Set time span
    delete this.newWidget.options.timeSpan;
    if (this.newWidget.filter &&
      this.newWidget.filter.include &&
      this.newWidget.filter.include[0] &&
      this.newWidget.filter.include[0].scope &&
      this.newWidget.filter.include[0].scope.where &&
      this.newWidget.filter.include[0].scope.where.and &&
      this.newWidget.filter.include[0].scope.where.and[0] &&
      this.newWidget.filter.include[0].scope.where.and[0].createdAt &&
      this.selectedTimeSpan[0]) this.newWidget.options.timeSpan = this.selectedTimeSpan[0].id;

    if (this.newWidget.options.timeSpan) {
      this.setTimeSpan(this.newWidget);
    } else if (this.newWidget.options.timeWindow) {
      // widget.filter.include[0].scope.where.and[0].createdAt.lte = widget.options.timeWindow.lte;
      // widget.filter.include[0].scope.where.and[0].createdAt.gte = widget.options.timeWindow.gte;
    }
    console.log('Set filter: END', this.newWidget);
  }

  setTimeSpan(widget): void {
    switch (widget.options.timeSpan) {
      case 'ten-minutes':
        const TEN_MINUTES = 10 * 60 * 1000;  // Hour in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - TEN_MINUTES;
        break;
      case 'hour':
        const ONE_HOUR = 60 * 60 * 1000;  // Hour in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - ONE_HOUR;
        break;
      case 'day':
        const ONE_DAY = 24 * 60 * 60 * 1000;  // Day in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - ONE_DAY;
        break;
      case 'three-days':
        const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;  // Day in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - THREE_DAYS;
        break;
      case 'one-week':
        const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;  // Week in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - ONE_WEEK;
        break;
      case 'two-weeks':
        const TWO_WEEK = 2 * 7 * 24 * 60 * 60 * 1000;  // Week in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - TWO_WEEK;
        break;
      case 'three-weeks':
        const THREE_WEEK = 3 * 7 * 24 * 60 * 60 * 1000;  // Week in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - THREE_WEEK;
        break;
      case 'month':
        const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;  // Month in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - ONE_MONTH;
        break;
      case 'year':
        const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;  // Year in milliseconds
        widget.filter.include[0].scope.where.and[0].createdAt.gte = Date.now() - ONE_YEAR;
        break;
    }
  }

  setWidgetType($event): void {
    this.newWidget.type = $event.id;
    delete this.newWidget.data;

    this.loadSelects();

    switch (this.newWidget.type) {
      case 'map':
        delete this.newWidget.options.timeSpan;
        this.newWidget.options.zoom = 6;
        this.newWidget.options.lat = 48.864716;
        this.newWidget.options.lng = 2.349014;
        break;
      case 'tracking':
        this.newWidget.options.zoom = 6;
        this.newWidget.options.lat = 48.864716;
        this.newWidget.options.lng = 2.349014;
        break;
      default:
        delete this.newWidget.options.timeSpan;
        delete this.newWidget.options.zoom;
        delete this.newWidget.options.lat;
        delete this.newWidget.options.lng;
        delete this.newWidget.options.minAcc;
        break;
    }
  }

  loadSelectableKeys(): void {
    this.setWidgetFilter();
    // Reset the selected keys
    this.selectedKeys = [];
    // Reset the selectable keys
    this.selectKeys = [];
    // Prepare widget keys object
    this.newWidget.options.keys = [];
    // Fetch all the keys belonging to selected devices
    const filter = this.newWidget.filter;
    if (this.newWidget.filter.include[0].scope.where) {
      filter.include[0].scope.limit = 1;
      if (this.newWidget.filter.include[0].scope.where.and[0].createdAt && this.newWidget.filter.include[0].scope.where.and[0].createdAt.gte) {
        filter.include[0].scope.where.and[0] = {};
      }
    }
    this.api.getDevices(this.id, filter).subscribe((devices: any[]) => {
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
    if (this.newWidget.type !== 'text' && this.newWidget.type !== 'image' && this.newWidget.type !== 'divider' && this.newWidget.filter.where.or.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select at least one category or device.');
      return;
    }

    this.setWidgetFilter();
    // Sanitize
    delete this.newWidget.ready;
    delete this.newWidget.data;
    delete this.newWidget.options.chartLabels;
    delete this.newWidget.gaugeThresholdConfig;

    this.newWidget.userId = this.user.id;
    this.dashboardApi.createWidgets(this.dashboard.id, this.newWidget).subscribe(widget => {
      this.loadWidgets();
      this.toasterService.pop('success', 'Success', 'Successfully created widget.');

      this.newWidgetFlag = false;

      this.addOrEditWidgetModal.hide();
    });
  }

  editWidget(widget): void {
    this.newWidgetFlag = false;
    this.newWidget = widget;
    this.loadSelects();
    this.editWidgetFlag = true;
  }

  updateWidget(): void {
    if (this.newWidget.type !== 'text' && this.newWidget.type !== 'image' && this.newWidget.type !== 'divider' && this.newWidget.filter.where.or.length === 0) {
      this.toasterService.pop('error', 'Error', 'Please select at least one category or device.');
      return;
    }
    this.setWidgetFilter();
    // Sanitize
    delete this.newWidget.ready;
    delete this.newWidget.data;
    delete this.newWidget.options.chartLabels;
    delete this.newWidget.gaugeThresholdConfig;

    if (this.newWidget.options.style) {
      const myObject = eval(this.newWidget.options.style);
      this.newWidget.options.style = myObject;
    }

    this.dashboardApi.updateByIdWidgets(this.dashboard.id, this.newWidget.id, this.newWidget).subscribe(widget => {
      this.loadWidget(widget);
      this.toasterService.pop('success', 'Success', 'The widget was successfully updated.');
      this.editWidgetFlag = false;
      this.addOrEditWidgetModal.hide();
    });
  }

  deleteWidget(widget: Widget): void {
    this.dashboardApi.destroyByIdWidgets(this.dashboard.id, widget.id).subscribe(() => {
      this.loadWidgets();
      this.cancel();
      this.toasterService.pop('success', 'Success', 'Successfully deleted widget.');
    });
  }

  loadSelects(): void {
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
    this.selectedBarMsgCounterPeriod = [];
    this.selectedTimeSpan = [];

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
    if (this.newWidget.options.period) {
      this.selectedBarMsgCounterPeriod = [{
        id: this.newWidget.options.period,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.period)
      }];
    }
    if (this.newWidget.options.timeSpan) {
      this.selectedTimeSpan = [{
        id: this.newWidget.options.timeSpan,
        itemName: this.capitalizeFirstLetter(this.newWidget.options.timeSpan)
      }];
    }
    if (this.newWidget.filter.where && this.newWidget.filter.where.or) {
      this.newWidget.filter.where.or.forEach((item: any, index: number) => {
        if (item.categoryId) {
          const foundCategory: any = _.find(this.categories, {id: item.categoryId});
          this.selectedCategories.push({id: item.categoryId, itemName: foundCategory.name});
        } else if (item.id) {
          const foundDevice: any = _.find(this.devices, {id: item.id});
          this.selectedDevices.push({
            id: item.id,
            itemName: foundDevice.name ? foundDevice.id + ' - ' + foundDevice.name : foundDevice.id
          });
        }
      });
    }

    if (this.newWidget.type === 'tracking' || this.newWidget.type === 'bar-exact') this.dateTimeSettings.placeholder = moment(this.selectedDateTimeBegin).format('MMM-DD-YYYY hh:mm A');
    else if (this.newWidget.type === 'line') this.dateTimeSettings.placeholder = moment(this.selectedDateTimeBegin).format('MMM-DD-YYYY hh:mm A');
  }

  onMapLocationReady(event: any, devices: any, zoom: any) {
    this.map = event;
    if (!this.mobile) {
      const input = this.searchBoxInput.nativeElement;
      this.searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      this.searchBox.addListener('places_changed', () => this.goToSearchedPlace());
    }
    const bounds: LatLngBounds = new google.maps.LatLngBounds();
    if (devices) {
      devices.forEach((device: any) => {
        if (device.Messages && device.Messages[0] && device.Messages[0].Geolocs[0]) {
          bounds.extend(new google.maps.LatLng(device.Messages[0].Geolocs[0].location.lat, device.Messages[0].Geolocs[0].location.lng));
        }
      });
    }
    const zoomChangeBoundsListener =
      google.maps.event.addListenerOnce(this.map, 'bounds_changed', function (event) {
        this.setZoom(zoom);
      });
    setTimeout(function () {
      google.maps.event.removeListener(zoomChangeBoundsListener)
    }, 2000);
    this.map.fitBounds(bounds);
  }

  onMapTrackingReady(event: any, devices: any) {
    this.map = event;
    if (!this.mobile) {
      const input = this.searchBoxInput.nativeElement;
      this.searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
      this.searchBox.addListener('places_changed', () => this.goToSearchedPlace());
    }
  }

  goToSearchedPlace() {
    const places = this.searchBox.getPlaces();
    if (places.length === 0) {
      return;
    }
    const bounds: LatLngBounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (place.geometry.viewport) bounds.union(place.geometry.viewport);
      else bounds.extend(place.geometry.location);
    });
    this.map.fitBounds(bounds);
  }

  getRandomColor() {
    const color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  lineBreakText(text: string): string {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
  }

  loadWidgets(): void {
    this.dashboardApi.getWidgets(this.dashboard.id, {order: 'createdAt ASC'}).subscribe((widgets: any[]) => {
      this.widgets = widgets;
      console.log(this.widgets);
      if (this.widgets) {
        this.dashboardReady = false;
        // Build widgets
        this.widgets.forEach((widget: any, countWidgets: number) => {
          widget.ready = false;
          // Load widgets
          this.setWidgetData(widget);
        });
        this.dashboardReady = true;
      }
    });
  }

  loadWidget(widget: any): void {
    this.dashboardApi.findByIdWidgets(this.dashboard.id, widget.id).subscribe((widget: any) => {
      this.widgets.forEach((w: any, i: any) => {
        if (w.id === widget.id) {
          this.widgets[i] = widget;
          this.widgets[i].ready = false;
          // Load widgets
          this.setWidgetData(widget);
        }
      });
    });
  }

  setWidgetData(widget: any): void {
    // Load widgets
    if (widget.type === 'text' || widget.type === 'image' || widget.type === 'divider') widget.ready = true;
    else {
      // Get devices data
      this.getDevicesWithFilter(widget).subscribe((devices: any[]) => {
        // Value
        if (widget.type === 'value') {
          widget.data = _.filter(devices[0].Messages[0].data_parsed, {key: widget.options.keys[0]})[0];

          widget.ready = true;
        }

        // Table
        else if (widget.type === 'table') {
          widget.data = devices;
          if (widget.options.tableType === 'custom') {
            widget.data = this.buildCustomTable(widget);
            widget.extraData = devices;
          }

          widget.ready = true;
        }

        // Map
        else if (widget.type === 'map') {
          widget.data = devices;
          widget.ready = true;
        }

        // Tracking
        else if (widget.type === 'tracking') {
          widget.data = devices;
          // Default parameters
          widget.data.forEach(device => {
            device.visibility = false;
            device.directionsDisplayStore = [];
            device.color = this.getRandomColor();
          });

          widget.ready = true;
        }

        // Gauge
        else if (widget.type === 'gauge') {
          widget.data = devices;
          const lastData_parsed: any = _.filter(widget.data[0].Messages[0].data_parsed, {key: widget.options.keys[0]})[0];
          widget.value = lastData_parsed.value;
          widget.unit = lastData_parsed.unit;
          widget.label = this.capitalizeFirstLetter(lastData_parsed.key);
          widget.gaugeThresholdConfig = {
            [widget.options.min]: {color: '#13b22b'},
            [(widget.options.min + widget.options.max) / 2]: {color: '#fc7d28'},
            [widget.options.max]: {color: '#db2b2a'}
          };

          widget.ready = true;
        }

        // Line
        else if (widget.type === 'line') {
          const chartData = [];
          const keys_units = [];

          let w = 0;

          // Loop each device for this widget
          devices.forEach((device: Device) => {
            if (device.Messages[0]) {
              const data_parsed: any = device.Messages[0].data_parsed;
              // Loop each keys chosen for this widget
              widget.options.keys.forEach((key: any) => {
                const o: any = _.filter(device.Messages[0].data_parsed, {key: key})[0];
                //console.log(device.id, o);
                if (o) {
                  keys_units.push(o);
                  // Check if the device has this key and set the format to display
                  data_parsed.forEach((line: any, k) => {
                    if (line.key === key) {
                      chartData[w] = {};
                      // Set key
                      if (widget.options.keys.length > 1) {
                        if (line.unit !== '') {
                          chartData[w].key = (line.key + ' (' + line.unit + ')' + ' - ' + device.id) + (device.name ? ' - ' + device.name : '');
                        } else {
                          chartData[w].key = (line.key + ' - ' + device.id) + (device.name ? ' - ' + device.name : '');
                        }
                      } else {
                        chartData[w].key = device.id + (device.name ? ' - ' + device.name : '');
                      }
                      // Set values
                      chartData[w].values = [];
                      device.Messages.forEach((message: Message) => {
                        const item: any = {
                          label: new Date(message.createdAt),
                          value: Number(_.filter(message.data_parsed,
                            {key: key})[0].value)
                        };
                        chartData[w].values.push(item);
                      });
                    }
                  });
                  w++;
                }
              });
            }
          });
          // Replace data with chart data
          widget.data = chartData;

          widget.options.chartOptions = {
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
            widget.options.chartOptions.chart.color.push(this.getRandomColor());
            if (keys_units.length === 1) {
              widget.options.chartOptions.chart['yAxis'] = {
                axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                axisLabelDistance: -10
              };
            }
            /*if (i === 0) {
              widget.options.chartOptions.chart['yAxis'] = {
                axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                axisLabelDistance: -10
              };
            } else {
              widget.options.chartOptions.chart['y' + i + 'Axis'] = {
                axisLabel: this.formatTableColumn(key_unit.key) + ' (' + key_unit.unit + ')',
                axisLabelDistance: -10
              };
            }*/
            widget.options.chartOptions.chart.tooltip = {
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

          widget.ready = true;
        }

        // Bar
        else if (widget.type === 'bar') {
          // Loop each device for this widget
          widget.data = [];
          devices.forEach((device: Device) => {
            widget.options.chartLabels = [];
            widget.options.chartOptions = {
              responsive: true,
              scaleShowVerticalLines: false,
              maintainAspectRatio: false,
              legend: {
                display: true,
              },
              scales: {
                xAxes: [{
                  gridLines: {},
                  ticks: {}
                }],
                yAxes: [{
                  gridLines: {},
                  ticks: {}
                }]
              }
            };
            // for (const [keyIndex, key] of widget.options.keys) {
            widget.options.keys.forEach((key: any) => {
              const values = [];
              device.Messages.forEach((message: Message) => {
                const p = _.filter(message.data_parsed, {key: key})[0];
                values.push(p.value);
                widget.options.chartLabels.push(moment(message.createdAt).format('MMM-DD h:mm a'));
              });
              const label = this.capitalizeFirstLetter(key) + ' - ' + (device.name ? device.name : device.id);
              if (values.length > 0) widget.data.push({
                data: values,
                label: label,
                borderWidth: 1,
                backgroundColor: this.getRandomColor()
              });
            });
          });
          widget.options.chartLabels.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          widget.options.chartLabels = widget.options.chartLabels.filter((item: any, pos: any) => {
            return widget.options.chartLabels.indexOf(item) == pos;
          });
          widget.ready = true;
        }

        // Bar graph with exact key value
        else if (widget.type === 'bar-exact') {
          // Loop each device for this widget
          widget.data = [];
          devices.forEach((device: Device) => {
            widget.options.chartLabels = [];
            widget.options.chartOptions = {
              responsive: true,
              scaleShowVerticalLines: false,
              maintainAspectRatio: false,
              legend: {
                display: true,
              },
              scales: {
                xAxes: [{
                  gridLines: {},
                  ticks: {}
                }],
                yAxes: [{
                  gridLines: {},
                  ticks: {
                    max: 1,
                    stepSize: 1
                  }
                }]
              }
            };

            widget.options.keys.forEach((key: any) => {
              const values = [];
              device.Messages.forEach((message: Message) => {
                const p = _.filter(message.data_parsed, {key: widget.options.keys[0]})[0];
                if (p && p.key === key && p.value.toString() === widget.options.exact_value.toString()) {
                  values.push(1);
                  return;
                }
                widget.options.chartLabels.push(moment(message.createdAt).format('MMM-DD h:mm a'));
              });
              const label = this.capitalizeFirstLetter(key) + ' - ' + (device.name ? device.name : device.id);
              if (values.length > 0) widget.data.push({
                data: values,
                label: label,
                borderWidth: 1,
                backgroundColor: this.getRandomColor()
              });
            });
          });
          widget.options.chartLabels.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          widget.options.chartLabels = widget.options.chartLabels.filter((item: any, pos: any) => {
            return widget.options.chartLabels.indexOf(item) == pos;
          });
          widget.ready = true;
        }

        // Bar graph with custom array
        else if (widget.type === 'bar-custom') {
          // Loop each device for this widget
          widget.data = [];
          widget.options.chartColor = [];
          const dynamicColors = function () {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return ["rgb(" + r + "," + g + "," + b + ")", "rgb(" + r + "," + g + "," + b + ", .5)", "rgb(" + r + "," + g + "," + b + ", .8)", "rgb(" + r + "," + g + "," + b + ", .4)"];
          };
          devices.forEach((device: Device) => {
            const rColor = dynamicColors();
            widget.options.chartColor.push({
              backgroundColor: rColor[1],
              hoverBackgroundColor: rColor[3],
              borderColor: rColor[0],
              pointBackgroundColor: rColor[0],
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: rColor[2]
            });
            widget.options.chartLabels = [];
            widget.options.chartOptions = {
              responsive: true,
              scaleShowVerticalLines: false,
              maintainAspectRatio: false,
              legend: {
                display: true,
              },
              scales: {
                xAxes: [{
                  gridLines: {},
                  ticks: {}
                }],
                yAxes: [{
                  gridLines: {},
                  ticks: {
                    max: 1,
                    stepSize: 1
                  }
                }]
              }
            };

            widget.options.keys.forEach((key: any) => {
              const values = [];
              device.Messages.forEach((message: Message) => {
                const p = _.filter(message.data_parsed, {key: key})[0];
                if (p && p.key === key && p.value && typeof p.value === 'string') {
                  p.value.replace(/\s/g, '');
                  for (let i = p.value.length; i--;) {
                    const bit = p.value.charAt(i);
                    if (bit === "0") {
                      values.push(0);
                      widget.options.chartLabels.push(moment(message.createdAt).subtract(i * 7.5, 'seconds').format('MMM-DD h:mm:ss a'));
                    } else {
                      values.push(1);
                      widget.options.chartLabels.push(moment(message.createdAt).subtract(i * 7.5, 'seconds').format('MMM-DD h:mm:ss a'));
                    }
                  }
                }
              });
              const label = this.capitalizeFirstLetter(key) + ' - ' + (device.name ? device.name : device.id);
              if (values.length > 0) widget.data.push({
                data: values,
                label: label,
                borderWidth: 1
              });
            });
          });
          widget.options.chartLabels.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          widget.options.chartLabels = widget.options.chartLabels.filter((item: any, pos: any) => {
            return widget.options.chartLabels.indexOf(item) == pos;
          });
          widget.ready = true;
        }

        // Bar graph with custom array
        else if (widget.type === 'bar-custom-stats') {
          // Loop each device for this widget
          widget.data = [];
          devices.forEach((device: Device) => {
            widget.options.chartColor = [
              {
                backgroundColor: 'rgba(103, 58, 183, .1)',
                hoverBackgroundColor: 'rgba(103, 58, 183, 0.4)',
                borderColor: 'rgb(103, 58, 183)',
                pointBackgroundColor: 'rgb(103, 58, 183)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(103, 58, 183, 0.8)'
              }];
            widget.options.chartLabels = [];
            widget.options.chartOptions = {
              responsive: true,
              scaleShowVerticalLines: false,
              maintainAspectRatio: false,
              legend: {
                display: true,
              },
              scales: {
                xAxes: [{
                  gridLines: {},
                  ticks: {
                    beginAtZero: true
                  }
                }],
                yAxes: [{
                  gridLines: {},
                  ticks: {
                    beginAtZero: true
                  }
                }]
              }
            };

            widget.options.keys.forEach((key: any) => {
              const bits_0 = [];
              const bits_1 = [];
              device.Messages.forEach((message: Message) => {
                const p = _.filter(message.data_parsed, {key: key})[0];
                if (p && p.key === key && p.value && typeof p.value === 'string') {
                  p.value.replace(/\s/g, '');
                  for (let i = p.value.length; i--;) {
                    const bit = p.value.charAt(i);
                    if (bit === "0") {
                      bits_0.push(0);
                      widget.options.chartLabels.push('No detections (%)');
                    } else {
                      bits_1.push(1);
                      widget.options.chartLabels.push('Detections (%)');
                    }
                  }
                }
              });
              const label = this.capitalizeFirstLetter(key) + ' - ' + (device.name ? device.name : device.id);
              widget.data.push({
                data: [(bits_0.length / (bits_0.length + bits_1.length) * 100).toFixed(2), (bits_1.length / (bits_0.length + bits_1.length) * 100).toFixed(2)],
                label: label,
                borderWidth: 1
              });
            });
          });
          widget.options.chartLabels.sort((a: any, b: any) => {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
          });
          widget.options.chartLabels = widget.options.chartLabels.filter((item: any, pos: any) => {
            return widget.options.chartLabels.indexOf(item) == pos;
          });
          widget.ready = true;
        }

        // Stats
        else if (widget.type === 'stats') {
          devices.forEach((device: any) => {

            widget.options.chartLabels = [];

            // Messages
            this.messageApi.stats(widget.options.period, null, {deviceId: device.id}, null, null).subscribe((stats: any) => {
              widget.options.chartLabels = [];
              widget.options.chartOptions = {
                responsive: true,
                scaleShowVerticalLines: false,
                maintainAspectRatio: false,
                legend: {
                  display: true,
                }
              };
              widget.options.chartColor = [{backgroundColor: '#5b9bd3'}];
              widget.data = [];
              const data = [];

              console.log('Stats: ', stats);

              stats.forEach((stat: any) => {
                data.push(stat.count);
                if (widget.options.period === 'hourly')
                  widget.options.chartLabels.push(moment(stat.universal).format('h:mm a'));
                if (widget.options.period === 'daily')
                  widget.options.chartLabels.push(moment(stat.universal).format('ddd MMM YY'));
                if (widget.options.period === 'weekly')
                  widget.options.chartLabels.push(moment(stat.universal).format('DD MMM YY'));
                if (widget.options.period === 'monthly')
                  widget.options.chartLabels.push(moment(stat.universal).format('DD MMM YY'));
                if (widget.options.period === 'yearly')
                  widget.options.chartLabels.push(moment(stat.universal).format('MMM YYYY'));
              });
              // console.log('Data:', this.data);
              // console.log('Labels:', widget.options.chartLabels);
              widget.data.push({data: data, label: 'Messages'});

              /*widget.options.hasNoMessageChartData = data.every(value => {
                return value === 0;
              });*/
            });
            widget.ready = true;
          });
        }
      });
    }
  }

  onDeviceVisibility(devicePosition: number, widgetPosition: number): any {
    const widget = this.widgets[widgetPosition];
    const device = this.widgets[widgetPosition].data[devicePosition];
    device.Geolocs = [];
    device.Messages = [];

    if (device.visibility) {
      const widgetFilter = Object.assign({}, widget.filter);
      widgetFilter.where = {id: device.id};
      widgetFilter.include[0].scope.limit = 5000;

      this.getDevicesWithFilter(widget, widgetFilter).subscribe((devices: any[]) => {
        device.Messages = devices[0].Messages;
        const bounds: LatLngBounds = new google.maps.LatLngBounds();

        if (widget.options.geolocType === 'preferBestAccuracy') {
          devices[0].Messages.forEach((message: any) => {
            message.Geolocs.forEach((geoloc: Geoloc) => {
              device.Geolocs.push(geoloc);
              /* if (message.Geolocs.length > 1 && geoloc.type !== 'gps') {
                 device.Geolocs.splice(geoloc, 1);
               }*/
            });
          });
        } else {
          device.Geolocs = devices[0].Geolocs;
        }
        for (const geoloc of device.Geolocs) {
          bounds.extend(new google.maps.LatLng(geoloc.location.lat, geoloc.location.lng));
        }
        if (device.Geolocs.length > 0 && !widget.options.directions) {
          this.agmMaps.forEach((agmMap: any) => {
            //agmMap._mapsWrapper.setCenter(device.Geolocs[device.Geolocs.length - 1].location);
            if (agmMap._elem.nativeElement.id === widget.id) {
              agmMap._mapsWrapper.fitBounds(bounds);
            }
          });
        }
      });
    }
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

  private getDevicesWithFilter(widget: any, newFilter?: any): Observable<any[]> {
    if (widget.options.timeSpan) {
      this.setTimeSpan(widget);
    }
    if (newFilter) return this.api.getDevices(this.id, newFilter);
    else return this.api.getDevices(this.id, widget.filter);
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

  rtWidgetHandler = (payload: any) => {
    if (payload.action == "CREATE" || payload.action == "UPDATE") {
      this.loadWidgets();
    } else if (payload.action == "DELETE") {
      this.widgets = this.widgets.filter(function (obj) {
        return obj.id !== payload.content.id;
      });
    }
  };

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['widget']);
    this.rtWidgetHandler = this.rt.addListener("widget", this.rtWidgetHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtWidgetHandler);
  }
}
