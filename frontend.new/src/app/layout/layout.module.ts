import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';
import {NavsearchComponent} from './header/navsearch/navsearch.component';
import {OffsidebarComponent} from './offsidebar/offsidebar.component';
import {UserblockComponent} from './sidebar/userblock/userblock.component';
import {UserblockService} from './sidebar/userblock/userblock.service';
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from '../shared/shared.module';
import {NumberFormatPipe} from "./sidebar/numberformatpipe";
import {OrganizationblockService} from "./sidebar/organizationblock/organizationblock.service";
import {OrganizationblockComponent} from "./sidebar/organizationblock/organizationblock.component";

@NgModule({
    imports: [
        SharedModule
    ],
    providers: [
        UserblockService,
        OrganizationblockService
    ],
    declarations: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        OrganizationblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent,
        // Pipes
        NumberFormatPipe
    ],
    exports: [
        LayoutComponent,
        SidebarComponent,
        UserblockComponent,
        OrganizationblockComponent,
        HeaderComponent,
        NavsearchComponent,
        OffsidebarComponent,
        FooterComponent
    ]
})
export class LayoutModule {
}
