import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {AccordionModule, ModalModule} from 'ng2-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ProfileRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule { }
