import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Connector, FireLoopRef, Message, User} from '../../shared/sdk/models';
import {RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Reception} from '../../shared/sdk/models/Reception';
import {ReceptionApi} from '../../shared/sdk/services/custom/Reception';
import {AgmMap} from '@agm/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private sub: any;
  private user: User;

  @ViewChild('baseStationMap') baseStationMap: any;
  @ViewChild(AgmMap) agmMap: AgmMap;

  private receptions: any[] = [];

  private messageSub: Subscription;
  private messages: Message[] = [];
  private messageRef: FireLoopRef<Message>;
  private messageFilter = { };

  private mapStyle = [{
    "featureType": "administrative.locality",
    "elementType": "all",
    "stylers": [{"saturation": "50"}, {"lightness": "25"}, {"visibility": "on"}, {"hue": "#00ff94"}, {"weight": "1"}, {"gamma": "1"}]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "simplified"}]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{"hue": "#ffffff"}, {"saturation": -100}, {"lightness": 100}, {"visibility": "off"}]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": 31}, {"visibility": "simplified"}]
  }, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": 31}, {"visibility": "on"}]
  }, {
    "featureType": "road.arterial",
    "elementType": "labels",
    "stylers": [{"hue": "#bbc0c4"}, {"saturation": -93}, {"lightness": -2}, {"visibility": "simplified"}]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{"hue": "#e9ebed"}, {"saturation": -90}, {"lightness": -8}, {"visibility": "simplified"}]
  }, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{"hue": "#e9ebed"}, {"saturation": 10}, {"lightness": 69}, {"visibility": "on"}]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{"hue": "#e9ebed"}, {"saturation": -78}, {"lightness": 67}, {"visibility": "simplified"}]
  }];
  public filterQuery = '';

  public toInt(num: string) {
    return +num;
  }

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private receptionApi: ReceptionApi,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Messages: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    this.messageFilter = {
      limit: 1000,
      order: 'createdAt DESC',
      include: ['Device'],
      where: {
        userId: this.user.id
      }
    };
    this.sub = this.route.params.subscribe(params => {
      this.filterQuery = params['id'];
      this.messageFilter = {
        limit: 1000,
        order: 'createdAt DESC',
        include: ['Device'],
        where: {
          userId: this.user.id,
          deviceId: this.filterQuery
        }
      };
    });

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
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    // this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
    this.messageSub = this.messageRef.on('change',
      this.messageFilter
    ).subscribe((messages: Message[]) => {
      this.messages = messages;
      // console.log(this.messages);
    });
  }

  ngOnDestroy(): void {
    console.log('Messages: ngOnDestroy');
    this.sub.unsubscribe();
    if (this.messageRef) this.messageRef.dispose();
    if (this.messageSub) this.messageSub.unsubscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
  }

  showBaseStations(deviceId: string, time: number): void {
    this.receptions = [];
    const user = this.userApi.getCachedCurrent();

    this.userApi.getConnectors(this.user.id, {where: {name: 'sigfox-api'}}).subscribe((connectors: Connector[]) => {
      if (connectors.length > 0) {

        this.baseStationMap.show();

        this.receptionApi.getBaseStationsByDeviceId(deviceId, time).subscribe((receptionsResult: Reception[]) => {
            this.receptions = receptionsResult;
            console.log(this.receptions);
            if (this.receptions.length > 0)
              this.agmMap.triggerResize();
          }, error => {
            console.log(error);
          }
        );
      } else {
        console.log('No Sigfox API connector');
      }
    });
  }

  download(): void {

  }
}
