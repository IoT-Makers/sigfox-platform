import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [],
    exports: []
})
export class LoginModule {
}
