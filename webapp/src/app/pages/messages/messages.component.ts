import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {FireLoopRef, Message} from '../../shared/sdk/models';
import {MessageApi, RealTime, UserApi} from '../../shared/sdk/services';
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

  @ViewChild('baseStationMap') baseStationMap: any;
  @ViewChild(AgmMap) agmMap: AgmMap;

  private receptions: any[] = new Array<any>();

  private message: Message = new Message();
  private messageSub: Subscription;
  private messages: Message[] = new Array<Message>();
  private countMessages: number = 0;
  private messageRef: FireLoopRef<Message>;

  public filterQuery = '';

  public toInt(num: string) {
    return +num;
  }

  public sortByWordLength = (a: any) => {
    return a.name.length;
  }

  constructor(private rt: RealTime,
              private messageApi: MessageApi,
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
    // Messages
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    // this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
    this.messageSub = this.messageRef.on('change',
      {limit: 1000, order: 'id DESC', include: ['Device']}
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

  showBaseStations(deviceId: string): void {
    this.baseStationMap.show();

    const user = this.userApi.getCachedCurrent();

    if (user.sigfoxBackendApiLogin && user.sigfoxBackendApiPassword) {
      const data = {
        userId: this.userApi.getCachedCurrent().id,
        deviceId: deviceId
      };

      this.receptionApi.getBaseStationsByDeviceId(data).subscribe((receptionsResult: Reception[]) => {
        this.receptions = receptionsResult;
        console.log(this.receptions);
        if (this.receptions.length > 0)
          this.agmMap.triggerResize();
      });
    }
  }
}
