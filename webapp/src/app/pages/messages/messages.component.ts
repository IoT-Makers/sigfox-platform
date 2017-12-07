import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FireLoopRef, Message, User} from '../../shared/sdk/models';
import {RealTime, UserApi} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Reception} from '../../shared/sdk/models/Reception';
import {ReceptionApi} from '../../shared/sdk/services/custom/Reception';
import {AgmMap} from '@agm/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('baseStationMap') baseStationMap: any;
  @ViewChild(AgmMap) agmMap: AgmMap;

  private receptions: any[] = new Array<any>();

  private messageSub: Subscription;
  private messages: Message[] = new Array<Message>();
  private messageRef: FireLoopRef<Message>;

  public filterQuery = '';

  public toInt(num: string) {
    return +num;
  }

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private receptionApi: ReceptionApi) { }

  ngOnInit(): void {
    if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }
  }

  setup(): void {
    console.log(this.rt.connection);
    this.ngOnDestroy();

    this.user = this.userApi.getCachedCurrent();

    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    // this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
    this.messageSub = this.messageRef.on('change',
      {
        limit: 1000,
        order: 'updatedAt DESC',
        include: ['Device'],
        where: {
          userId: this.user.id
        }
      }
    ).subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    });
  }

  ngOnDestroy(): void {
    console.log('Messages: ngOnDestroy');
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
  }

  showBaseStations(deviceId: string, time: number): void {
    this.receptions = [];
    const user = this.userApi.getCachedCurrent();

    if (user.sigfoxBackendApiLogin && user.sigfoxBackendApiPassword) {
      this.baseStationMap.show();
      const data = {
        userId: this.userApi.getCachedCurrent().id,
        deviceId: deviceId,
        time: time
      };

      this.receptionApi.getBaseStationsByDeviceId(data).subscribe((receptionsResult: Reception[]) => {
        this.receptions = receptionsResult;
        console.log(this.receptions);
        if (this.receptions.length > 0)
          this.agmMap.triggerResize();
      });
    }
  }

  // download(): void{
  //
  // }
}
