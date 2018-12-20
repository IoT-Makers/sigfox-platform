import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {Organization} from '../shared/sdk/models';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {OrganizationService} from "../_services/organization.service";

@Injectable()
export class OrganizationGuard implements CanActivate {

    constructor(private organizationService: OrganizationService, private userApi: UserApi, private router: Router) {
    }

    /**
     * The function below checks if the user is allowed to view the organization
     * and injects the current organization (if any) in the corresponding service
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkOrganizationMember(route);
    }

    checkOrganizationMember(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.userApi.findByIdOrganizations(this.userApi.getCurrentId(), route.params.id).pipe(map((organization: Organization) => {
            if (organization) {
                this.organizationService.organization = organization;
                return true;
            } else {
                this.organizationService.organization = null;
                // Not organization member so redirect to overview page
                this.router.navigate(['/']);
                return false;
            }
        }), catchError((e) => {
            this.organizationService.organization = null;
            // Not organization member so redirect to overview page
            this.router.navigate(['/']);
            return of(false);
        }));
    }
}
