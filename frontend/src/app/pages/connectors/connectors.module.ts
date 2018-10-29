import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectorsComponent} from './connectors.component';
import {ConnectorsRoutingModule} from './connectors-routing.module';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from './datafilterpipe';
import {ToasterModule} from 'angular2-toaster';
import {SelectModule} from 'ng2-select';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    ConnectorsRoutingModule,
    DataTableModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ToasterModule.forRoot(),
    SelectModule,
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    MomentModule
  ],
  declarations: [
    ConnectorsComponent,
    DataFilterPipe
  ]
})
export class ConnectorsModule {
}
