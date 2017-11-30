import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';

import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';

import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {HttpClientModule} from '@angular/common/http';
import {DirectionsComponent} from './directions.component';
import {SelectModule} from 'ng2-select';


@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    DateTimePickerModule,
    HttpClientModule,
    SelectModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    })
  ],
  providers:[
    GoogleMapsAPIWrapper
  ],
  declarations: [ TrackingComponent, DirectionsComponent ]
})
export class TrackingModule { }
