import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";
import {ResetPasswordComponent} from "./reset-password.component";

@NgModule({
  imports: [
    ResetPasswordRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    ResetPasswordComponent
  ]
})
export class ResetPasswordModule {
}
