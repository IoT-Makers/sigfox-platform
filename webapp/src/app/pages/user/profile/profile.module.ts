import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {AccordionModule, ModalModule} from 'ng2-bootstrap';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from './datafilterpipe';

@NgModule({
  imports: [
    ProfileRoutingModule,
    DataTableModule,
    CommonModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule
  ],
  declarations: [
    ProfileComponent,
    DataFilterPipe
  ]
})
export class ProfileModule { }
