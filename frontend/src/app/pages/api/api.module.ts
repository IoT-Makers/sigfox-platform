import {NgModule} from '@angular/core';
import {ApiComponent} from './api.component';
import {ApiRoutingModule} from './api-routing.module';
import {CommonModule} from '@angular/common';
import {DataTableModule} from 'angular2-datatable';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';
import {ToasterModule} from 'angular2-toaster';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'angular2-moment';
import {ClickCopyDirective} from './click-copy.directive';

@NgModule({
  imports: [
    ApiRoutingModule,
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
    ApiComponent,
    ClickCopyDirective
  ]
})

export class ApiModule {
}
