import {NgModule} from '@angular/core';
import {MessagesComponent} from './messages/messages.component';
import {DataFilterPipe} from './messages/datafilterpipe';
import {ClickCopyDirective} from './messages/click-copy.directive';
import {SharedModule} from "../../shared/shared.module";
import {AgmCoreModule} from "@agm/core";
import {MomentModule} from "angular2-moment";
import {DataTableModule} from "angular2-datatable";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: MessagesComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes),
        AgmCoreModule,
        MomentModule,
        DataTableModule
    ],
    declarations: [
        MessagesComponent,
        DataFilterPipe,
        ClickCopyDirective
    ],
    exports: [
        RouterModule
    ]
})
export class MessagesModule {
}
