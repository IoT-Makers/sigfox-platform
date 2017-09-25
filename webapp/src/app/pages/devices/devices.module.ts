import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MomentModule } from 'angular2-moment';

import { AgmCoreModule } from '@agm/core';

import { DevicesComponent } from './devices.component';
import { DevicesRoutingModule } from './devices-routing.module';



@NgModule({
  imports: [
    DevicesRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD4Zt99xt7aUd4Sg8RUwlMGwRkRIBWC7aE'
    })
  ],
  declarations: [ DevicesComponent ]
})
export class DevicesModule { }
