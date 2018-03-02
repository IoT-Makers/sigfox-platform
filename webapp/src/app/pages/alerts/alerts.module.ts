import {NgModule} from '@angular/core';
import {AlertsComponent} from './alerts.component';
import {AlertsRoutingModule} from './alerts-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {ToasterModule} from 'angular2-toaster';
import {FormsModule} from '@angular/forms';
import {TooltipModule} from 'ng2-bootstrap';
import {DataTableModule} from 'angular2-datatable';
import {MomentModule} from 'angular2-moment';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ModalModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    AlertsRoutingModule,
    CommonModule,
    DataTableModule,
    FormsModule,
    MomentModule,
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    ModalModule.forRoot(),
    ToasterModule.forRoot()
  ],
  declarations: [
    AlertsComponent,
    DataFilterPipe
  ]
})
export class AlertsModule {
}
