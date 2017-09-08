import {NgModule} from '@angular/core';

import {CommonModule} from "@angular/common";
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
