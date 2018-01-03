import {NgModule} from '@angular/core';

import {OverviewComponent} from './overview.component';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts/ng2-charts';
// DataTable
import {DataTableModule} from 'angular2-datatable';
import {FormsModule} from '@angular/forms';
import {DataFilterPipe} from './datafilterpipe';
import {OverviewRoutingModule} from './overview-routing.module';
import {AgmCoreModule} from '@agm/core';
import {MomentModule} from 'angular2-moment';
import {DragulaModule} from 'ng2-dragula';

@NgModule({
  imports: [
    OverviewRoutingModule,
    CommonModule,
    ChartsModule,
    DataTableModule,
    FormsModule,
    MomentModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    }),
    DragulaModule
  ],
  declarations: [
    OverviewComponent,
    DataFilterPipe
  ]
})
export class OverviewModule {
}
