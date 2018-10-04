import {NgModule} from '@angular/core';
import {EmployeesComponent} from './employees.component';
import {EmployeesRoutingModule} from './employees-routing.module';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from "./datafilterpipe";
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";

@NgModule({
  imports: [
    EmployeesRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToasterModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule,
    AngularMultiSelectModule
  ],
  declarations: [
    EmployeesComponent,
    DataFilterPipe
  ]
})
export class EmployeesModule {
}
