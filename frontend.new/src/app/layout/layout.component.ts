import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {OrganizationApi, UserApi} from "../shared/sdk/services/custom";
import {ActivatedRoute} from "@angular/router";
import {Organization, Role, User} from "../shared/sdk/models";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

    isLayoutLoaded: Boolean = false;
    user: User;
    admin: Boolean = false;
    organization: Organization;
    organizationRouteSub: Subscription;

    constructor(private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        // Get the logged in User object
        this.user = this.userApi.getCachedCurrent();
        this.userApi.getRoles(this.user.id).subscribe((roles: Role[]) => {
            this.user.roles = roles;
            roles.forEach((role: Role) => {
                if (role.name === 'admin') {
                    this.admin = true;
                    return;
                }
            });
        });
        // Check if organization view
        this.organizationRouteSub = this.route.params.subscribe(params => {
            if (params.id) {
                this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
                    this.organization = organization;
                    this.isLayoutLoaded = true;
                });
            } else this.isLayoutLoaded = true;
        });
    }

    ngOnDestroy() {
        this.organizationRouteSub.unsubscribe();
    }
}
