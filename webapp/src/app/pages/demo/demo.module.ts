import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {DemoRoutingModule} from './demo-routing.module';
import {CommonModule} from '@angular/common';
import {DataFilterPipe} from './datafilterpipe';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {DataTableModule} from 'angular2-datatable';
import {ModalModule} from 'ng2-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    DemoRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    ModalModule,
    LeafletModule
  ],
  declarations: [
    DemoComponent,
    DataFilterPipe
  ]
})
export class DemoModule {
}
