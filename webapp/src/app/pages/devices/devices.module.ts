import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {DevicesComponent} from './devices.component';
import {DevicesRoutingModule} from './devices-routing.module';
import {ModalModule, TabsModule, TooltipModule} from 'ngx-bootstrap';
import {ToasterModule} from 'angular2-toaster';
import {LaddaModule} from 'angular2-ladda';
import {DataTableModule} from 'angular2-datatable';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {HttpClientModule} from '@angular/common/http';
import {DataFilterPipe} from './datafilterpipe';

@NgModule({
  imports: [
    DevicesRoutingModule,
    CommonModule,
    MomentModule,
    DataTableModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    LaddaModule,
    ToasterModule.forRoot(),
    AngularMultiSelectModule,
    HttpClientModule
  ],
  declarations: [
    DevicesComponent,
    DataFilterPipe
  ]
})
export class DevicesModule {
}
