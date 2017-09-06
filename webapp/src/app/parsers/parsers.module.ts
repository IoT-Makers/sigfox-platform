import {NgModule} from '@angular/core';

import {ParsersComponent} from './parsers.component';
import {ParsersRoutingModule} from './parsers-routing.module';
import {CommonModule} from "@angular/common";
// Modal Component
import {ModalModule} from 'ng2-bootstrap/modal';
// Code editor
import {AceEditorModule} from 'ng2-ace-editor';

@NgModule({
  imports: [
    ParsersRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    AceEditorModule
  ],
  declarations: [
    ParsersComponent
  ]
})
export class ParsersModule { }
