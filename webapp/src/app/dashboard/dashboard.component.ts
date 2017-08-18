import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { Message, FireLoopRef } from '../shared/sdk/models';
import { RealTime, MessageApi } from '../shared/sdk/services';
import {count} from "rxjs/operator/count";

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private message    : Message   = new Message();
  private messages   : Message[] = new Array<Message>();
  private messageRef : FireLoopRef<Message>;
  private countMessages:number = 0;


  constructor(private rt: RealTime, private messageApi: MessageApi) {

    this.rt.onReady().subscribe(() => {
      this.messageRef = this.rt.FireLoop.ref<Message>(Message);
      this.messageRef.on('change',
        { limit: 100, order: 'id DESC' }
      ).subscribe((messages: Message[]) => {
        this.messages = messages;
        console.log(this.messages);
        this.messageApi.count().subscribe(result => {
          console.log(messageApi);
          console.log("count: ", result);
          this.countMessages = result.count;
        });
      });
    });


  }

  create(): void {
    this.messageRef.create(this.message).subscribe(() => this.message = new Message());
  }

  update(message: Message): void {
    this.messageRef.upsert(message).subscribe();
  }

  remove(message: Message): void {
    this.messageRef.remove(message).subscribe();
  }

  ngOnInit(): void {
    //console.log(this.messages);
  }
}
