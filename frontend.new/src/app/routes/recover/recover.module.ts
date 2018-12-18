import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RecoverComponent} from "./recover/recover.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        RecoverComponent
    ],
    exports: []
})
export class RecoverModule {
}
