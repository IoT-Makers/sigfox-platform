import { NgModule } from '@angular/core';

import { DevicesComponent } from './devices.component';
import { DevicesRoutingModule } from './devices-routing.module';

@NgModule({
  imports: [
    DevicesRoutingModule
  ],
  declarations: [ DevicesComponent ]
})
export class DevicesModule { }
