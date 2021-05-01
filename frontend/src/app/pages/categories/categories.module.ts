import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MomentModule} from 'ngx-moment';
import {FormsModule} from '@angular/forms';
import {CategoriesComponent} from './categories.component';
import {CategoriesRoutingModule} from './categories-routing.module';
import {ToastrModule} from 'ngx-toastr';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ClickCopyDirective} from './click-copy.directive';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {LaddaModule} from 'angular2-ladda';
import {HttpClientModule} from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CategoriesRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    AngularMultiSelectModule,
    LaddaModule,
    HttpClientModule
  ],
  declarations: [
    CategoriesComponent,
    ClickCopyDirective
  ]
})
export class CategoriesModule {
}
