import { NgModule } from '@angular/core';

import { ParsersComponent } from './parsers.component';
import { ParsersRoutingModule } from './parsers-routing.module';

@NgModule({
  imports: [
    ParsersRoutingModule
  ],
  declarations: [ ParsersComponent ]
})
export class ParsersModule { }
