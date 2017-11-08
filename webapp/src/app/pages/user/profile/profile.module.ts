import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import {AccordionModule} from "ng2-bootstrap";

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    AccordionModule.forRoot()
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
