import { NgModule } from '@angular/core';

import { BaseStationsComponent } from './base-stations.component';
import { BaseStationsRoutingModule } from './base-stations-routing.module';

@NgModule({
  imports: [
    BaseStationsRoutingModule
  ],
  declarations: [ BaseStationsComponent ]
})
export class BaseStationsModule { }
