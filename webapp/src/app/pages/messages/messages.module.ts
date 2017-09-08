import { NgModule } from '@angular/core';

import { MessagesComponent } from './messages.component';
import { MessagesRoutingModule } from './messages-routing.module';
import {CommonModule} from "@angular/common";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './datafilterpipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    MessagesRoutingModule,
    CommonModule,
    DataTableModule,
    FormsModule
  ],
  declarations: [
    MessagesComponent,
    DataFilterPipe
  ]
})
export class MessagesModule { }
