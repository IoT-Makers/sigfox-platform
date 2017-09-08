import { NgModule } from '@angular/core';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './datafilterpipe';
import {DevicesComponent} from "./devices.component";
import {ChartsModule} from "ng2-charts";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {DevicesRoutingModule} from "./devices-routing.module";

@NgModule({
  imports: [
    DevicesRoutingModule,
    CommonModule,
    ChartsModule,
    DataTableModule,
    FormsModule
  ],
  declarations: [
    DevicesComponent,
    DataFilterPipe
  ]
})
export class DevicesModule { }
