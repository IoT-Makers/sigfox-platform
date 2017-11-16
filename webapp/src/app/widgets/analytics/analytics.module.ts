import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule,
    MomentModule
  ],
  declarations: [ AnalyticsComponent ]
})
export class AnalyticsModule { }
