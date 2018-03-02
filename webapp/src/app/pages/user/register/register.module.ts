import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    RegisterRoutingModule,
    CommonModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {
}
