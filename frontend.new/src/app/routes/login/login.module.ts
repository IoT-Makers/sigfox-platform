import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from "../../shared/shared.module";
import {ToasterService} from "angular2-toaster";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        ToasterService
    ],
    exports: []
})
export class LoginModule {
}
