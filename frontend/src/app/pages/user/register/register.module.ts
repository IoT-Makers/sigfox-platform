import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {FormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    RegisterRoutingModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule {
}
