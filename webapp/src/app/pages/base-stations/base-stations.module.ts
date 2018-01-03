import {NgModule} from '@angular/core';

import {BaseStationsComponent} from './base-stations.component';
import {BaseStationsRoutingModule} from './base-stations-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    BaseStationsRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [BaseStationsComponent]
})
export class BaseStationsModule {
}
