import { NgModule } from '@angular/core';

import { DevicesComponent } from './devices.component';
import { DevicesRoutingModule } from './devices-routing.module';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [
    DevicesRoutingModule,
    CommonModule
  ],
  declarations: [ DevicesComponent ]
})
export class DevicesModule { }
