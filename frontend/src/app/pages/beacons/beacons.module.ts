import {NgModule} from '@angular/core';
import {BeaconsComponent} from './beacons.component';
import {BeaconsRoutingModule} from './beacons-routing.module';
import {CommonModule} from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {MomentModule} from 'ngx-moment';
import {FormsModule} from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import {DataFilterPipe} from './datafilterpipe';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';


@NgModule({
  imports: [
    BeaconsRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    AngularMultiSelectModule,
    ToastrModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTablesModule,
    LeafletModule
  ],
  declarations: [
    BeaconsComponent,
    DataFilterPipe
  ]
})
export class BeaconsModule {
}
