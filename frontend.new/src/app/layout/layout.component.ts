import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrganizationApi, UserApi} from "../shared/sdk/services/custom";
import {ActivatedRoute} from "@angular/router";
import {Organization, User} from "../shared/sdk/models";
import {UserService} from "../_services/user.service";
import {OrganizationService} from "../_services/organization.service";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    user: User;
    admin: Boolean = false;
    organization: Organization;
    organizationRouteSub: Subscription;

    constructor(private userService: UserService,
                private organizationService: OrganizationService,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        // Get the logged in user
        this.user = this.userService.getCurrentUser();
        this.admin = this.userService.isAdmin();
        this.organizationRouteSub = this.route.params.subscribe(params => {
            this.organization = this.organizationService.getCurrentOrganization();
        });
    }

    ngOnDestroy() {
        this.organizationRouteSub.unsubscribe();
    }
}
