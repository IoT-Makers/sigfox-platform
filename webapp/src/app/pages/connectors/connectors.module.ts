import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectorsComponent} from './connectors.component';
import {ConnectorsRoutingModule} from './connectors-routing.module';
import {AccordionModule, ModalModule} from 'ng2-bootstrap';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from './datafilterpipe';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  imports: [
    ConnectorsRoutingModule,
    DataTableModule,
    CommonModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ToasterModule
  ],
  declarations: [
    ConnectorsComponent,
    DataFilterPipe
  ]
})
export class ConnectorsModule { }
