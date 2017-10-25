import { NgModule } from '@angular/core';

import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';
import {CommonModule} from "@angular/common";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { DataFilterPipe } from './datafilterpipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule,
    DataTableModule,
    FormsModule
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})
export class DemoModule { }
