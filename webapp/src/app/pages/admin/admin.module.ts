import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';

import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';

import {DataTableModule} from 'angular2-datatable';


@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToasterModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule
  ],
  declarations: [
    AdminComponent
  ]
})
export class AdminModule {
}
