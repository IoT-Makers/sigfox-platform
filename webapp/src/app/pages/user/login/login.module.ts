import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {FormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';

@NgModule({
  imports: [
    LoginRoutingModule,
    CommonModule,
    FormsModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}
