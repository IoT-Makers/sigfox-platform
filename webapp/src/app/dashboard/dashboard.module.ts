import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CommonModule } from "@angular/common";
import { ChartsModule } from 'ng2-charts/ng2-charts';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from '../dashboard/datafilterpipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    DashboardRoutingModule,
    CommonModule,
    ChartsModule,
    DataTableModule,
    FormsModule,
  ],
  declarations: [
    DashboardComponent,
    DataFilterPipe
  ]
})
export class DashboardModule { }
