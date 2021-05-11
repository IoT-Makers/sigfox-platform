import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {FormsModule} from '@angular/forms';
import {DataFilterPipe} from './datafilterpipe';
import {OverviewRoutingModule} from './overview-routing.module';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'ngx-moment';
import {AlertModule} from 'ngx-bootstrap/alert';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {NgxGaugeModule} from 'ngx-gauge';

@NgModule({
  imports: [
    OverviewRoutingModule,
    CommonModule,
    ChartsModule,
    NgxGaugeModule,
    FormsModule,
    MomentModule,
    TooltipModule.forRoot(),
    AgmCoreModule,
    AlertModule.forRoot()
  ],
  declarations: [
    OverviewComponent,
    DataFilterPipe
  ]
})
export class OverviewModule {
}
