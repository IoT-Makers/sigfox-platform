import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {AnalyticsRoutingModule} from './analytics-routing.module';
import {AnalyticsComponent} from './analytics.component';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {DateTimePickerModule} from 'ng-pick-datetime';
import {SelectModule} from 'ng2-select';
import {TooltipModule} from 'ng2-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    ChartsModule,
    MomentModule,
    FormsModule,
    TooltipModule.forRoot(),
    DateTimePickerModule,
    SelectModule
  ],
  declarations: [AnalyticsComponent]
})
export class AnalyticsModule {
}
