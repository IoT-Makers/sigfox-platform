import { NgModule } from '@angular/core';

import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';

@NgModule({
  imports: [
    MessagesRoutingModule
  ],
  declarations: [ MessagesComponent ]
})
export class MessagesModule { }
