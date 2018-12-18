import {NgModule} from '@angular/core';
import {ProfileComponent} from './profile/profile.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule} from "@angular/router";
import {routes} from "../routes";
import {DataFilterPipe} from "./profile/datafilterpipe";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [
        ProfileComponent,
        DataFilterPipe
    ],
    exports: [
        RouterModule
    ]
})
export class ProfileModule {
}
