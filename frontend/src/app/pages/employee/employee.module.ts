import {NgModule} from '@angular/core';
import {EmployeeComponent} from './employee.component';
import {EmployeeRoutingModule} from './employee-routing.module';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from "./datafilterpipe";

@NgModule({
  imports: [
    EmployeeRoutingModule,
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
    EmployeeComponent,
    DataFilterPipe
  ]
})
export class EmployeeModule {
}
