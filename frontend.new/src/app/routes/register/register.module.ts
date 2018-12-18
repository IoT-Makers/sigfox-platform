import {NgModule} from '@angular/core';
import {RegisterComponent} from './register/register.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        RegisterComponent
    ],
    exports: []
})
export class RegisterModule {
}
