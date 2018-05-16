import {NgModule} from '@angular/core';
import {AlertsComponent} from './alerts.component';
import {AlertsRoutingModule} from './alerts-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {ToasterModule} from 'angular2-toaster';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TooltipModule} from 'ngx-bootstrap';
import {DataTableModule} from 'angular2-datatable';
import {MomentModule} from 'angular2-moment';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {ModalModule} from 'ngx-bootstrap';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {LeafletDrawModule} from '@asymmetrik/ngx-leaflet-draw';

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
    ToasterModule.forRoot(),
    ReactiveFormsModule,
    LeafletModule,
    LeafletDrawModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  declarations: [
    AlertsComponent,
    DataFilterPipe
  ]
})
export class AlertsModule {
}
