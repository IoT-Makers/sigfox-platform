import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConnectorsComponent} from './connectors.component';
import {ConnectorsRoutingModule} from './connectors-routing.module';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {DataFilterPipe} from './datafilterpipe';
import {ToastrModule} from 'ngx-toastr';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {MomentModule} from 'ngx-moment';
import {InternationalPhoneModule} from "ng4-intl-phone";
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    ConnectorsRoutingModule,
    DataTablesModule,
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    AngularMultiSelectModule,
    MomentModule,
    InternationalPhoneModule,
    TranslateModule.forChild({
      extend: true
    }),
  ],
  declarations: [
    ConnectorsComponent,
    DataFilterPipe
  ]
})

export class ConnectorsModule {
}
