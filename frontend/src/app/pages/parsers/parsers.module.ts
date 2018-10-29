import {NgModule} from '@angular/core';
import {ParsersComponent} from './parsers.component';
import {ParsersRoutingModule} from './parsers-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToasterModule} from 'angular2-toaster';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AceEditorModule} from 'ng2-ace-editor';
import {TooltipModule} from 'ngx-bootstrap';
import {ClickCopyDirective} from './click-copy.directive';


@NgModule({
  imports: [
    ParsersRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AceEditorModule,
    ToasterModule.forRoot()
  ],
  declarations: [
    ParsersComponent,
    ClickCopyDirective
  ]
})
export class ParsersModule {
}
