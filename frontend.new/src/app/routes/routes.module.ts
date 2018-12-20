import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslatorService} from '../core/translator/translator.service';
import {MenuService} from '../core/menu/menu.service';
import {SharedModule} from '../shared/shared.module';
import {routes} from './routes';
import {NotFoundModule} from "./not-found/not-found.module";
import {LoginModule} from "./login/login.module";
import {RegisterModule} from "./register/register.module";
import {RecoverModule} from "./recover/recover.module";
import {menuUser} from "./menu-user";
import {menuOrganization} from "./menu-organization";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes),
        LoginModule,
        NotFoundModule,
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
        menuService.addMenuUser(menuUser);
        menuService.addMenuOrganization(menuOrganization);
    }
}
