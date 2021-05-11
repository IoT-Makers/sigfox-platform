import {NgModule} from '@angular/core';
import {MessagesComponent} from './messages.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {DataFilterPipe} from './datafilterpipe';
import {FormsModule} from '@angular/forms';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AgmCoreModule} from '@agm/core';
import {ClickCopyDirective} from './click-copy.directive';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    MessagesRoutingModule,
    CommonModule,
    DataTablesModule,
    FormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AgmCoreModule
  ],
  declarations: [
    MessagesComponent,
    DataFilterPipe,
    ClickCopyDirective
  ]
})
export class MessagesModule {
}
