import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule,
    LeafletModule
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})
export class DemoModule {
}
