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

  private subscriptions: Subscription[] = new Array<Subscription>();

  private message: Message = new Message();
  private messages: Message[] = new Array<Message>();
  private messageRef: FireLoopRef<Message>;
  private countMessages: number = 0;

  private user: User = new User();
  private userRef: FireLoopRef<User>

  public filterQuery = '';

  public toInt(num:string) {
    return +num;
  }

  public sortByWordLength = (a:any) => {
    return a.name.length;
  };


  constructor(private rt: RealTime, private messageApi: MessageApi, private userApi: UserApi) {

    this.subscriptions.push(



      this.rt.onReady().subscribe(() => {

        this.userRef = this.rt.FireLoop.ref<User>(User);

        this.messageRef = this.rt.FireLoop.ref<Message>(Message);
        //this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
        this.messageRef.on('change',
          {limit: 1000, order: 'id DESC'}
        ).subscribe((messages: Message[]) => {
          this.messages = messages;
          console.log(this.messages);
        });

      }));
  }

  ngOnInit(): void {
    console.log("Messages: ngOnInit");
    this.user = this.userApi.getCachedCurrent();
  }

  ngOnDestroy(): void {
    console.log("Messages: ngOnDestroy");
    this.messageRef.dispose();
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
  }

}

