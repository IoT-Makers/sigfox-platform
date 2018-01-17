import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {HttpClientModule} from '@angular/common/http';
import {SelectModule} from 'ng2-select';
import {AccordionModule} from 'ng2-bootstrap';
import {DirectionsDirective} from './directions.directive';

@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    DateTimePickerModule,
    HttpClientModule,
    SelectModule,
    AccordionModule.forRoot(),
    AgmCoreModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  declarations: [TrackingComponent, DirectionsDirective]
})
export class TrackingModule {
}
