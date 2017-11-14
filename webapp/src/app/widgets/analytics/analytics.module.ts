import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule
  ],
  declarations: [ AnalyticsComponent ]
})
export class AnalyticsModule { }
