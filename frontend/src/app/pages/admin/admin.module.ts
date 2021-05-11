import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {MomentModule} from 'ngx-moment';
import {FormsModule} from '@angular/forms';

import {DataTablesModule} from 'angular-datatables';


@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule {
}
