import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forChild({
      extend: true
    }),
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
