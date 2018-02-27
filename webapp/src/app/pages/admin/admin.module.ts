import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {ModalModule, TooltipModule, AccordionModule} from 'ng2-bootstrap';

import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';

import {DataTableModule} from 'angular2-datatable';



@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToasterModule,
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
