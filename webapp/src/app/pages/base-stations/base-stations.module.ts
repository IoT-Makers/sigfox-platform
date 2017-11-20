import {NgModule} from '@angular/core';

import {BaseStationsComponent} from './base-stations.component';
import {BaseStationsRoutingModule} from './base-stations-routing.module';
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  imports: [
    BaseStationsRoutingModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [ BaseStationsComponent ]
})
export class BaseStationsModule { }
