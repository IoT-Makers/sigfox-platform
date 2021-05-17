import {NgModule} from '@angular/core';
import {ApiComponent} from './api.component';
import {ApiRoutingModule} from './api-routing.module';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ToastrModule} from 'ngx-toastr';
import {FormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {ClickCopyDirective} from './click-copy.directive';
import {AngularMultiSelectModule} from "angular2-multiselect-dropdown";
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  imports: [
    ApiRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ToastrModule.forRoot(),
    AccordionModule.forRoot(),
    AngularMultiSelectModule,
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  declarations: [
    ApiComponent,
    ClickCopyDirective
  ]
})

export class ApiModule {
}
