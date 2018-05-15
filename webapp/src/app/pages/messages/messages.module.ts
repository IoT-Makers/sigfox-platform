import {NgModule} from '@angular/core';
import {MessagesComponent} from './messages.component';
import {MessagesRoutingModule} from './messages-routing.module';
import {CommonModule} from '@angular/common';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from './datafilterpipe';
import {FormsModule} from '@angular/forms';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {ClickCopyDirective} from './click-copy.directive';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  imports: [
    MessagesRoutingModule,
    CommonModule,
    DataTableModule,
    FormsModule,
    ToasterModule.forRoot(),
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
