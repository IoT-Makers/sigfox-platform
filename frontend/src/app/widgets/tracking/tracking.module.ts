import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {SelectModule} from 'ng2-select';
import {AccordionModule} from 'ngx-bootstrap';
import {DirectionsDirective} from './directions.directive';
import {AngularDateTimePickerModule} from 'vk-custom-angular2-datetimepicker';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';

@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    HttpClientModule,
    SelectModule,
    AccordionModule.forRoot(),
    AgmCoreModule,
    AgmJsMarkerClustererModule,
    AngularDateTimePickerModule,
    MomentModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  declarations: [TrackingComponent, DirectionsDirective]
})
export class TrackingModule {
}
