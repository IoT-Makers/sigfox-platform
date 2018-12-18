import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslatorService} from '../core/translator/translator.service';
import {MenuService} from '../core/menu/menu.service';
import {SharedModule} from '../shared/shared.module';
import {menu} from './menu';
import {routes} from './routes';
import {NotFoundModule} from "./not-found/not-found.module";
import {ProfileModule} from "./profile/profile.module";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {RecoverModule} from "./recover/recover.module";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        LoginModule,
        NotFoundModule,
        ProfileModule,
        RegisterModule,
        RecoverModule
    ],
    declarations: [],
    exports: [
        RouterModule
    ]
})

export class RoutesModule {
    constructor(public menuService: MenuService, tr: TranslatorService) {
        menuService.addMenu(menu);
    }
}
