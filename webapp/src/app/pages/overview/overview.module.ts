import { NgModule } from '@angular/core';

import {OverviewComponent} from './overview.component';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { FormsModule } from '@angular/forms';
import {DataFilterPipe} from "./datafilterpipe";
import {OverviewRoutingModule} from "./overview-routing.module";

@NgModule({
  imports: [
    OverviewRoutingModule,
    CommonModule,
    ChartsModule,
    DataTableModule,
    FormsModule
  ],
  declarations: [
    OverviewComponent,
    DataFilterPipe
  ]
})
export class OverviewModule { }
