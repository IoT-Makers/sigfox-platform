import {Component, OnDestroy, OnInit} from '@angular/core';

import { Message, User, FireLoopRef } from '../../shared/sdk/models';
import { RealTime, MessageApi, UserApi } from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit,OnDestroy {

  private message: Message = new Message();
  private messageSub: Subscription;
  private messages: Message[] = new Array<Message>();
  private countMessages: number = 0;
  private messageRef: FireLoopRef<Message>;

  public filterQuery = '';

  public toInt(num:string) {
    return +num;
  }

  public sortByWordLength = (a:any) => {
    return a.name.length;
  };


  constructor(private rt: RealTime, private messageApi: MessageApi, private userApi: UserApi) {

  }

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
    //this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
    this.messageSub = this.messageRef.on('change',
      {limit: 1000, order: 'id DESC', include: ['Device']}
    ).subscribe((messages: Message[]) => {
      this.messages = messages;
      console.log(this.messages);
    });
  }

  ngOnDestroy(): void {
    console.log("Messages: ngOnDestroy");
    if (this.messageRef)this.messageRef.dispose();
    if (this.messageSub)this.messageSub.unsubscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
  }

}

