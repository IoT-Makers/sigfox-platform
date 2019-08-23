import {Component, OnDestroy, OnInit,HostListener, ViewChild} from '@angular/core';
import {Connector, Geoloc, Message, Organization, Reception, Role, User} from '../../shared/sdk/models';
import {MessageApi, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {OrganizationApi, ReceptionApi} from '../../shared/sdk/services/custom';
import {AgmMap} from '@agm/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import {FormControl, FormGroup} from '@angular/forms';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
  
})
export class MessagesComponent implements OnInit, OnDestroy {

  private deviceIdSub: any;
  public user: User;

  @ViewChild('mapModal') mapModal: any;
  @ViewChild('agmMap') agmMap: AgmMap;

  // Flags
  public messagesReady = false;

  public mapLat = 48.856614;
  public mapLng = 2.352222;
  public mapZoom = 10;
  public receptions: any[] = [];
  public geolocs: Geoloc[] = [];

  private organizationRouteSub: Subscription;
  public messages: Message[] = [];

  public organization: Organization;
  private organizations: Organization[] = [];

  private messageFilter: any;
  private isLimit_100 = false;
  private isLimit_500 = false;
  private isLimit_1000 = false;
  private isLimit_0 = false;
  private isLimit_Day = true;
  private isLimit_Week = false;
  private isLimit_Month = false;
  private isLimit_Range = false;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  public filterQuery = '';

  private api;
  private id;
  private admin = false;
  private rangebtn = false;
  private keepbtn = 0;

  constructor(private userApi: UserApi,
              private messageApi: MessageApi,
              private organizationApi: OrganizationApi,
              private receptionApi: ReceptionApi,
              toasterService: ToasterService,
              private route: ActivatedRoute,
              private rt: RealtimeService) {
    this.toasterService = toasterService;
  }
  myDateValueTo: Date;
  myDateValueFrom: Date;
  maxDate: Date;
  minDate: Date;
  lastDateTo : Date;
  lastDateFrom : Date;

  ngOnInit(): void {
    console.log('Messages: ngOnInit');
    // Get the logged in User object
    this.myDateValueTo= new Date("2019-06-15T23:59:59");
    console.log("INIT DATE TO", this.myDateValueTo);
    this.myDateValueFrom = new Date("2019-06-15T23:59:59");

    this.myDateValueFrom.setDate(this.myDateValueTo.getDate() - 30);
    console.log("INIT DATE FROM", this.myDateValueTo.getDate());

    this.maxDate= new Date();
    this.maxDate.setDate(this.maxDate.getDate())
    this.minDate= new Date("2016-08-12T00:00:00");
    console.log("INIT VALUE FROM :", this.myDateValueFrom,"  TO:", this.myDateValueTo);
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
      this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
        if (parentParams.id) {
          this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
            this.organization = organization;
            this.setup();
          });
        } else this.setup();
      });
    });
  }

  onDateChange(newDate: Date){
    console.log(newDate);
  }

  setup(): void {
    // Get and listen messages
    var range = 1;
    var setupDateTo = new Date();//remove string to take the actual date "2019-06-19T23:59:59"
    var setupDateFrom = new Date();//remove string to take the actual date "2019-06-19T23:59:59"
    setupDateFrom.setDate(setupDateTo.getDate() - range);//choose a range by defaut when display all messages
    setupDateFrom.setHours(0,0,0);
    this.deviceIdSub = this.route.params.subscribe(params => {
      this.filterQuery = params['id'];
      if (this.filterQuery) {
        this.isLimit_Day = this.isLimit_Week = this.isLimit_Month = this.isLimit_0 = this.isLimit_Range = false;
        this.isLimit_0 = true;
        this.myDateValueFrom.setFullYear(2016,7,12 );
        this.myDateValueFrom.setHours(0,0,0);
        this.messageFilter = {
          order: 'createdAt DESC',
          include: ['Device', 'Geolocs'],
          where: {deviceId: this.filterQuery}
        };
      } else {
        this.isLimit_Day = this.isLimit_0 = this.isLimit_Month = this.isLimit_Week = this.isLimit_Range = false;
        this.isLimit_Day = true;
        this.myDateValueTo = setupDateTo;
        this.myDateValueFrom = setupDateFrom;
        this.messageFilter = {
          order: 'createdAt DESC',
          include: ['Device', 'Geolocs'],
          where: { and :[ {createdAt: {lte: setupDateTo}},{createdAt: {gte: setupDateFrom}} ]}
        };
      }
      this.api = this.organization ? this.organizationApi : this.userApi;
      this.id = this.organization ? this.organization.id : this.user.id;
      this.unsubscribe();
      this.subscribe(this.id);
      if (this.organization) {
        this.organizationApi.getFilteredMessages(this.organization.id, this.messageFilter).subscribe((messages: Message[]) => {
          this.messages = messages;
          this.messagesReady = true;
        });
      } else if (this.admin && this.filterQuery) {
        this.messageApi.find(this.messageFilter).subscribe((messages: Message[]) => {
          this.messages = messages;
          this.messagesReady = true;
        });
      } else {
        this.userApi.getMessages(this.user.id, this.messageFilter).subscribe((messages: Message[]) => {
          this.messages = messages;
          this.messagesReady = true;
        });
      } 
    });
  }

  ngOnDestroy(): void {
    console.log('Messages: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
    if (this.deviceIdSub) this.deviceIdSub.unsubscribe();
    this.unsubscribe();
  }

  deleteMessage(message: Message): void {
    this.userApi.destroyByIdMessages(this.user.id, message.id).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'The message has been deleted.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error);
    });
  }

  showMarkers(message: Message): void {
    this.geolocs = [];
    this.receptions = [];
    this.mapZoom = 10;

    // Message geoloc
    if (message.Geolocs && message.Geolocs.length > 0) {
      this.geolocs = message.Geolocs;
      this.mapLat = message.Geolocs[0].location.lat;
      this.mapLng = message.Geolocs[0].location.lng;
      // Show map
      this.mapModal.show();
      this.mapModal.onShown.subscribe((reason: string) => {
        this.agmMap.triggerResize();
      });
    }

    // Coverage
    this.userApi.getConnectors(this.user.id, {where: {type: 'sigfox-api'}}).subscribe((connectors: Connector[]) => {
      if (connectors.length > 0) {
        // Show map
        this.mapModal.show();
        // Get receptions
        this.receptionApi.getBaseStationsByDeviceId(message.deviceId, message.time).subscribe((receptionsResult: Reception[]) => {
            this.receptions = receptionsResult;
            console.log(this.receptions);
            if (this.receptions.length > 0) {
              this.receptions.forEach((reception, i) => {
                this.receptions[i].lat = Number(reception.lat);
                this.receptions[i].lng = Number(reception.lng);
              });
              if (!message.Geolocs) {
                this.mapLat = this.receptions[0].location.lat;
                this.mapLng = this.receptions[0].location.lng;
              }
              this.mapModal.onShown.subscribe((reason: string) => {
                this.agmMap.triggerResize();
              });
            }
          }, error => {
            console.log(error);
          }
        );
      } else {
        console.log('No Sigfox API connector');
      }
    });
  }

  showSelectRange(){
    this.rangebtn = !this.rangebtn;
    
    if(this.rangebtn){
      this.lastDateFrom = this.myDateValueFrom;
      this.lastDateTo = this.myDateValueTo;
      this.isLimit_Range = true;
      if(this.isLimit_Day) this.keepbtn = 1;
      else if(this.isLimit_Week) this.keepbtn = 2;
      else if(this.isLimit_Month) this.keepbtn = 3;
      else if(this.isLimit_0) this.keepbtn = 4;
      else this.keepbtn = 0;
      this.isLimit_Day = this.isLimit_Week = this.isLimit_Month = this.isLimit_0 = false;

      console.log("keep btn value",this.keepbtn);
    }else{
      this.myDateValueFrom = this.lastDateFrom;
      this.myDateValueTo = this.lastDateTo;
      console.log("keep btn value",this.keepbtn);

      this.isLimit_Range = false;
      switch (this.keepbtn) {
        case 1:
          this.isLimit_Day= true;
          break;
        case 2:
          this.isLimit_Week= true;
          break;
        case 3:
          this.isLimit_Week= true;
          break;
        case 4:
          this.isLimit_Week= true;
          break;
        default:
            this.isLimit_Day = this.isLimit_Week = this.isLimit_Month = this.isLimit_0 = false;

      }
    }
    
  }
  searchRangeFilter(){
    console.log("SEARCH RANGE FILTER");
    console.log("INIT VALUE FROM :", this.myDateValueFrom,"  TO:", this.myDateValueTo);
    this.isLimit_Day = this.isLimit_Week = this.isLimit_Month = this.isLimit_0 = false;
    this.messages = [];
    this.messagesReady = false;
    // Reset buttons
    this.myDateValueFrom.setHours(0,0,0);
    this.myDateValueTo.setHours(23,59,59);
    //Make sure the reset prec date and prec button
    this.lastDateFrom = this.myDateValueFrom;
    this.lastDateTo = this.myDateValueTo;
    this.keepbtn = 0;

    console.log("filter query value",this.filterQuery);
    if(this.filterQuery){
      console.log("filter query exists");
      this.messageFilter = {
        order: 'createdAt DESC',
        include: ['Device', 'Geolocs'],
        where: {deviceId: this.filterQuery, and :[ {createdAt: {lte: this.myDateValueTo}},{createdAt: {gte: this.myDateValueFrom}} ]}
  
      };
    }else{
      console.log("filter query is empty");
      this.messageFilter = {
        order: 'createdAt DESC',
        include: ['Device', 'Geolocs'],
        where: { and :[ {createdAt: {lte: this.myDateValueTo}},{createdAt: {gte: this.myDateValueFrom}} ]}
  
      };
    }
    

    console.log(this.messageFilter);
    console.log(this.id);
    this.api.getMessages(this.id, this.messageFilter).subscribe((messages: Message[]) => {
      console.log("GETMESSAGES");
      this.messages = messages;
      this.messagesReady = true;
    });

    console.log("MYDATEVALUETO",this.myDateValueTo);
    console.log("MYDATEVALUEFROM",this.myDateValueFrom);
  }

  searchLastFilter(period: string){
    console.log("SEARCH LAST FILTER");
    this.messages = [];
    this.messagesReady = false;
    this.isLimit_Day = period == "lastday";
    this.isLimit_Week = period == "lastweek";
    this.isLimit_Month = period == "lastmonth";
    this.isLimit_0 = period == "all";
    //Make sure to hide the select "Range" display
    this.isLimit_Range = false;
    this.rangebtn = false;

    var toActualDate = new Date();//remove string to take the actual date "2019-06-20T23:59:59"
    var fromDate = new Date();//remove string to take the actual date "2019-06-20T23:59:59"

    console.log("DATE INIT TO", this.myDateValueTo);

    //this.myDateValueFrom = this.toActualDate;
    // Reset buttons

    switch (period) {
      case 'lastday':
        fromDate.setDate(fromDate.getDate() - 1)
        fromDate.setHours(0,0,0);
        console.log("LAST DAY FROM", fromDate);
        console.log("LAST DAY TO", toActualDate);

        break;
      case 'lastweek':
        fromDate.setDate(fromDate.getDate() - 7)
        fromDate.setHours(0,0,0);
        console.log("LAST WEEK FROM", fromDate);
        console.log("LAST WEEK TO", toActualDate);

        break;
      case 'lastmonth':
        fromDate.setDate(fromDate.getDate() - 31)
        fromDate.setHours(0,0,0);
        console.log("LAST MONTH FROM", fromDate);
        console.log("LAST MONTH TO", toActualDate);

        break;
      
      case 'all':
        fromDate.setFullYear(2016,7,12 );
        fromDate.setHours(0,0,0);
        console.log("LAST MONTH FROM", fromDate);
        console.log("LAST MONTH TO", toActualDate);

        break;

      default:
        fromDate = null;
    }
    this.messageFilter = {
      order: 'createdAt DESC',
      include: ['Device', 'Geolocs'],
      where: { and :[ {createdAt: {lte: toActualDate}},{createdAt: {gte: fromDate}} ]}

    };

    console.log(this.messageFilter);
    console.log(this.id);
    this.api.getMessages(this.id, this.messageFilter).subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messagesReady = true;
    });
    this.myDateValueTo = toActualDate;
    this.myDateValueFrom = fromDate;

  }

  searchFilter(limit: number) {
    console.log("SEARCH FILTER");
    console.log("INIT VALUE FROM :", this.myDateValueFrom,"  TO:", this.myDateValueTo);

    this.messages = [];
    this.messagesReady = false;
    // Reset buttons
    this.isLimit_100 = limit == 100;
    this.isLimit_500 = limit == 500;
    this.isLimit_1000 = limit == 1000;
    this.isLimit_0 = limit == 10000;

    this.messageFilter = {
      order: 'createdAt DESC',
      limit: 100,
      include: ['Device', 'Geolocs'],
    };
    this.messageFilter.limit = limit;

    console.log(this.messageFilter);
    console.log(this.id);
    this.api.getMessages(this.id, this.messageFilter).subscribe((messages: Message[]) => {
      this.messages = messages;
      this.messagesReady = true;
    });
  }

  download(): void {

  }

  rtHandler = (payload: any) => {
    const msg = payload.content;
    if (msg.userId == this.user.id || (this.organization && msg.Device.Organizations.map(x => x.id).includes(this.organization.id))) {
      if (payload.action == "CREATE") {
        for (const geoloc of this.geolocBuffer) {
          if (geoloc.content.messageId === msg.id) {
            msg.Geolocs.push(geoloc.content);
            let index = this.geolocBuffer.indexOf(geoloc);
            if (index > -1) this.geolocBuffer.splice(index, 1);
            break;
          }
        }
        console.log(msg);
        this.messages.unshift(msg);
      } else if (payload.action == "DELETE") {
        this.messages = this.messages.filter((msg) => {
          return msg.id !== payload.content.id;
        });
      }
    }
  };

  private geolocBuffer = [];
  geolocHandler = (payload: any) => {
    if (payload.action === "CREATE") {
      for (let msg of this.messages) {
        if (msg.id === payload.content.messageId) {
          msg.Geolocs ? msg.Geolocs.push(payload.content) : msg.Geolocs = [payload.content];
          return;
        }
      }
      this.geolocBuffer.push(payload);
    }
  };

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['message', 'geoloc']);
    this.rtHandler = this.rt.addListener('message', this.rtHandler);
    this.geolocHandler = this.rt.addListener('geoloc', this.geolocHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
    this.rt.removeListener(this.geolocHandler);
  }
}
