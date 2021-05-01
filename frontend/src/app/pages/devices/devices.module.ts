import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import {AgmCoreModule} from '@agm/core';
import {DevicesComponent} from './devices.component';
import {DevicesRoutingModule} from './devices-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ToastrModule} from 'ngx-toastr';
import {LaddaModule} from 'angular2-ladda';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {HttpClientModule} from '@angular/common/http';
import {DataFilterPipe} from './datafilterpipe';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    DevicesRoutingModule,
    CommonModule,
    MomentModule,
    NgxPaginationModule,
    DataTablesModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AgmCoreModule,
    LaddaModule,
    ToastrModule.forRoot(),
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
