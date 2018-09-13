import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Connector, Device, FireLoopRef, Geoloc, Message, Organization, User} from '../../shared/sdk/models';
import {RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Reception} from '../../shared/sdk/models/Reception';
import {ReceptionApi} from '../../shared/sdk/services/custom/Reception';
import {AgmMap} from '@agm/core';
import {ActivatedRoute} from '@angular/router';
import {OrganizationApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private deviceSub: any;
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

  private userRef: FireLoopRef<User>;
  private organizationRef: FireLoopRef<Organization>;

  private organizationRouteSub: Subscription;
  private messageRef: FireLoopRef<Message>;
  private messageReadRef: FireLoopRef<Message>;
  private messageSub: Subscription;
  private messageReadSub: Subscription;
  public messages: Message[] = [];

  public organization: Organization;
  private organizations: Organization[] = [];

  private messageFilter: any;
  private isLimit_100 = false;
  private isLimit_500 = false;
  private isLimit_1000 = false;
  private isLimit_0 = false;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  private mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ];

  private filterQuery = '';

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              private receptionApi: ReceptionApi,
              toasterService: ToasterService,
              private route: ActivatedRoute) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Messages: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Check if organization view
    this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
      if (parentParams.id) {
        this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
          this.organization = organization;

          // Check if real time and setup
          if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
            this.setup();
          else
            this.rt.onAuthenticated().subscribe(() => this.setup());
        });
      } else {
        // Check if real time and setup
        if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
          this.setup();
        else
          this.rt.onAuthenticated().subscribe(() => this.setup());
      }
    });
  }

  setup(): void {
    this.cleanSetup();

    // Get and listen messages
    this.deviceSub = this.route.params.subscribe(params => {
      this.filterQuery = params['id'];
      if (this.filterQuery) {
        this.messageFilter = {
          order: 'createdAt DESC',
          limit: 100,
          include: ['Device', 'Geolocs'],
          where: {
            and: [{deviceId: this.filterQuery}]
          }
        };
      } else {
        this.messageFilter = {
          order: 'createdAt DESC',
          limit: 100,
          include: ['Device', 'Geolocs']
        };
      }

      this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);

      if (this.organization) {

        this.organizationApi.getFilteredMessages(this.organization.id, this.messageFilter).subscribe((messages: Message[]) => {
          this.messages = messages;
          this.messagesReady = true;
        });

        this.organizationApi.countMessages(this.organization.id).subscribe(result => {
          this.organizationRef = this.rt.FireLoop.ref<Organization>(Organization).make(this.organization);
          this.messageRef = this.organizationRef.child<Message>('Messages');
          if (result.count < 1000) {
            this.messageSub = this.messageRef.on('change', this.messageFilter).subscribe((messages: Message[]) => {
              this.messages = messages;
            });
          }
        });

      } else {

        this.userApi.countMessages(this.user.id).subscribe((result: any) => {
          if (result.count < 1000) {
            if (!this.messageFilter.where) {
              this.messageFilter.where = {userId: this.user.id};
            } else {
              this.messageFilter.where.and.push({userId: this.user.id});
            }
            this.messageReadRef = this.rt.FireLoop.ref<Message>(Message);
            this.messageReadSub = this.messageReadRef.on('change', this.messageFilter).subscribe((messages: Message[]) => {
              this.messages = messages;
              this.messagesReady = true;
            });
            console.log('Real-time global activated!');
          } else {
            this.messageRef = this.userRef.child<Message>('Messages');
            this.messageSub = this.messageRef.on('change', this.messageFilter).subscribe((messages: Message[]) => {
              this.messages = messages;
              this.messagesReady = true;
            });
            console.log('Real-time global deactivated!');
          }
        });

        /*this.userApi.getMessages(this.user.id, this.messageFilter).subscribe((messages: Message[]) => {
          this.messages = messages;
          this.messagesReady = true;
        });

        this.userApi.countMessages(this.user.id).subscribe(result => {
          this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
          this.messageRef = this.userRef.child<Message>('Messages');
          if (result.count < 1000) {
            this.messageSub = this.messageRef.on('change', this.messageFilter).subscribe((messages: Message[]) => {
              this.messages = messages;
            });
          }
        });*/

        /*
          this.messageFilter.where.and.push({userId: this.user.id});
          this.messageReadRef = this.rt.FireLoop.ref<Message>(Message);
          this.messageReadSub = this.messageReadRef.on('change', this.messageFilter).subscribe((messages: Message[]) => {
          console.error(message);
          const tempMessages = this.messages;
          this.messages = [];
          tempMessages.push(message);
          this.messages = messages;
          this.userApi.getMessages(this.user.id, this.messageFilter).subscribe((messages: Message[]) => {
            this.messages = messages;
            });
          });
        */
      }
    });
  }

  ngOnDestroy(): void {
    console.log('Messages: ngOnDestroy');
// Unsubscribe from query parameters
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();

    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.deviceSub) this.deviceSub.unsubscribe();
    if (this.organizationRef) this.organizationRef.dispose();
    if (this.userRef) this.userRef.dispose();
    if (this.messageRef) this.messageRef.dispose();
    if (this.messageReadRef) this.messageReadRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();
    if (this.messageReadSub) this.messageReadSub.unsubscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe(value => {
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

  searchFilter(limit: number) {
    this.messages = [];
    this.messagesReady = false;
    // Reset buttons
    this.isLimit_100 = false;
    this.isLimit_500 = false;
    this.isLimit_1000 = false;
    this.isLimit_0 = false;

    this.messageFilter.limit = limit;

    console.log(this.messageFilter);
    if (this.messageSub) this.messageSub.unsubscribe();

    if (this.organization) {
      this.organizationApi.getFilteredMessages(this.organization.id, this.messageFilter).subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messagesReady = true;
      });
    } else {
      this.userApi.getMessages(this.user.id, this.messageFilter).subscribe((messages: Message[]) => {
        this.messages = messages;
        this.messagesReady = true;
      });
    }
  }

  download(): void {

  }
}
