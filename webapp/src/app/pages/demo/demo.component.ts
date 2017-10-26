import {Component, OnDestroy, OnInit} from '@angular/core';

import { Message, User, FireLoopRef } from '../../shared/sdk/models';
import { RealTime, MessageApi, UserApi } from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';

@Component({
  selector: 'app-messages',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit,OnDestroy {


  private iFace: any;

  private subscriptions: Subscription[] = new Array<Subscription>();

  private message: Message = new Message();
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


  constructor(private rt: RealTime) {

    this.subscriptions.push(

      this.rt.onReady().subscribe(() => {

        this.userRef = this.rt.FireLoop.ref<User>(User);

        this.messageRef = this.rt.FireLoop.ref<Message>(Message);
        //this.messageRef = this.userRef.make(this.user).child<Message>('Messages');
        this.messageRef.on('change',
          {limit: 1, order: 'id DESC'}
        ).subscribe((messages: Message[]) => {
          this.message = messages[0];

          let parsed_data = this.message.parsed_data;
          for(let object of parsed_data){
            if(object.key == "iFace")
              this.iFace = object.value;
          }
        });

      }));
  }

  ngOnInit(): void {
    console.log("Messages: ngOnInit");
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

