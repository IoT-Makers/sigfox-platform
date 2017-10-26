import {Component, OnDestroy, OnInit} from '@angular/core';

import { Message, User, FireLoopRef } from '../../shared/sdk/models';
import { RealTime } from '../../shared/sdk/services';
import {Subscription} from "rxjs/Subscription";
import * as _ from 'lodash';
import {MessageApi} from "../../shared/sdk/services/custom/Message";

@Component({
  selector: 'app-messages',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit,OnDestroy {

  private iFace: any;
  private frameType: any;

  private subscriptions: Subscription[] = new Array<Subscription>();

  private message: Message = new Message();
  private messageRef: FireLoopRef<Message>;

  public filterQuery = '';

  constructor(private rt: RealTime, private messageApi: MessageApi) {

    this.subscriptions.push(

      this.rt.onReady().subscribe(() => {

        this.messageRef = this.rt.FireLoop.ref<Message>(Message);
        this.messageRef.on('change',
          {limit: 1, order: 'createdAt DESC'}
        ).subscribe((messages: Message[]) => {
          this.message = messages[0];

          /* if(!this.message.hasOwnProperty('parsed_data'))
             this.message = messages[1];*/

          let parsed_data = this.message.parsed_data;
          console.log(parsed_data);
          if(parsed_data !== null){
            for(let object of parsed_data){
              if(object.key == "iFace")
                this.iFace = object.value;
              else if(object.key == "frameType")
                this.frameType = object.value;
            }
          }
        });

      }));
  }

  ngOnInit(): void {
    console.log("Messages: ngOnInit");
    this.messageApi.findOne().subscribe((message) => {
      let parsed_data = this.message.parsed_data;
      console.log(parsed_data);
      if(parsed_data !== null) {
        for (let object of parsed_data) {
          if (object.key == "iFace")
            this.iFace = object.value;
          else if (object.key == "frameType")
            this.frameType = object.value;
        }
      }
    });
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

