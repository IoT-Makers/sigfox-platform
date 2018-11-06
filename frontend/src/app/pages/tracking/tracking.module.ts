import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'angular2-moment';
import {AgmCoreModule} from '@agm/core';
import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {ToasterModule} from 'angular2-toaster';
import {HttpClientModule} from '@angular/common/http';
import {DataFilterPipe} from './datafilterpipe';
import {DataTableModule} from "angular2-datatable";

@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    DataTableModule,
    AgmCoreModule,
    ToasterModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    TrackingComponent,
    DataFilterPipe
  ]
})
export class TrackingModule {
}
