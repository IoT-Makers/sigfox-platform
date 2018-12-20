import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserOrganizationResolverService} from "./user-organization-resolver.service";

@NgModule({
    imports: [CommonModule],
    declarations: [],
    exports: [],
    providers: [UserOrganizationResolverService]
})
export class UserOrganizationResolverModule {
    constructor(@Optional() @SkipSelf() parentModule: UserOrganizationResolverModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: UserOrganizationResolverModule,
            providers: []
        };
    }
}
