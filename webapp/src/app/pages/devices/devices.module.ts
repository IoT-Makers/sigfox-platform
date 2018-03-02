import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule} from '@agm/core';
import {DevicesComponent} from './devices.component';
import {DevicesRoutingModule} from './devices-routing.module';
import {ModalModule, TabsModule, TooltipModule} from 'ng2-bootstrap';
import {ToasterModule} from 'angular2-toaster';
import {LaddaModule} from 'angular2-ladda';
import {DataTableModule} from 'angular2-datatable';

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
    AgmCoreModule,
    LaddaModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    DevicesComponent
  ]
})
export class DevicesModule {
}
