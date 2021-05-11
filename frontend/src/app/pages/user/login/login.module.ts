import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
