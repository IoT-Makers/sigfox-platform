import {NgModule} from '@angular/core';
import {BeaconsComponent} from './beacons.component';
import {BeaconsRoutingModule} from './beacons-routing.module';
import {CommonModule} from '@angular/common';
import {ToasterModule} from 'angular2-toaster';
import {ModalModule, TooltipModule} from 'ngx-bootstrap';
import {MomentModule} from 'angular2-moment';
import {FormsModule} from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import {DataFilterPipe} from './datafilterpipe';
import {AngularMultiSelectModule} from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';


@NgModule({
  imports: [
    BeaconsRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    AngularMultiSelectModule,
    ToasterModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule,
    LeafletModule
  ],
  declarations: [
    BeaconsComponent,
    DataFilterPipe
  ]
})
export class BeaconsModule {
}
