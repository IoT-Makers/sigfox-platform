import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {MomentModule} from 'angular2-moment';

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule,
    MomentModule
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})

export class DemoModule {
}
