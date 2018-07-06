import {NgModule} from '@angular/core';
import {OverviewComponent} from './overview.component';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {DataTableModule} from 'angular2-datatable';
import {FormsModule} from '@angular/forms';
import {DataFilterPipe} from './datafilterpipe';
import {OverviewRoutingModule} from './overview-routing.module';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'angular2-moment';
import {AlertModule, TooltipModule} from 'ngx-bootstrap';
import {NgxGaugeModule} from 'ngx-gauge';

@NgModule({
  imports: [
    OverviewRoutingModule,
    CommonModule,
    ChartsModule,
    DataTableModule,
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
