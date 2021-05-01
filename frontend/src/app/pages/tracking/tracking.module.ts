import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import {AgmCoreModule} from '@agm/core';
import {TrackingComponent} from './tracking.component';
import {TrackingRoutingModule} from './tracking-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule} from '@angular/common/http';
import {DataFilterPipe} from './datafilterpipe';

@NgModule({
  imports: [
    TrackingRoutingModule,
    CommonModule,
    MomentModule,
    AgmCoreModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    TrackingComponent,
    DataFilterPipe
  ]
})
export class TrackingModule {
}
