import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {CommonModule} from '@angular/common';
// DataTable
import {DataFilterPipe} from './datafilterpipe';

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})
export class DemoModule {
}
