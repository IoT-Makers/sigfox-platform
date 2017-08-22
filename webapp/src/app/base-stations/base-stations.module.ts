import { NgModule } from '@angular/core';

import { BaseStationsComponent } from './base-stations.component';
import { BaseStationsRoutingModule } from './base-stations-routing.module';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    BaseStationsRoutingModule,
    CommonModule
  ],
  declarations: [ BaseStationsComponent ]
})
export class BaseStationsModule { }
