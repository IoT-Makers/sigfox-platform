import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {MomentModule} from 'angular2-moment';
import {NgxMapboxGLModule} from "ngx-mapbox-gl";

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule,
    MomentModule,
    NgxMapboxGLModule.withConfig({accessToken: 'pk.eyJ1IjoiYWRlY2hhc3NleSIsImEiOiJjamdwMjRwb2wwZnVyMndvMjNwM3Vsd2E0In0.jtoBHsEvHPFJ72sRSDPP9Q'})
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})

export class DemoModule {
}
