import {NgModule} from '@angular/core';
import {NotFoundComponent} from './not-found/not-found.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [NotFoundComponent]
})
export class NotFoundModule {
}
