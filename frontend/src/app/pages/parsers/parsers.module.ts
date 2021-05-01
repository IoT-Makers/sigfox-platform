import {NgModule} from '@angular/core';
import {ParsersComponent} from './parsers.component';
import {ParsersRoutingModule} from './parsers-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ToastrModule} from 'ngx-toastr';
import {ModalModule} from 'ngx-bootstrap/modal';
import {AceEditorModule} from 'ng2-ace-editor';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ClickCopyDirective} from './click-copy.directive';
import {MomentModule} from "ngx-moment";


@NgModule({
  imports: [
    ParsersRoutingModule,
    CommonModule,
    MomentModule,
    FormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    AceEditorModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    ParsersComponent,
    ClickCopyDirective
  ]
})
export class ParsersModule {
}
