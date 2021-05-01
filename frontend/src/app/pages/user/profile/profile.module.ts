import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ModalModule} from 'ngx-bootstrap/modal';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {DataFilterPipe} from './datafilterpipe';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    ProfileRoutingModule,
    DataTablesModule,
    CommonModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    ProfileComponent,
    DataFilterPipe
  ]
})
export class ProfileModule {
}
