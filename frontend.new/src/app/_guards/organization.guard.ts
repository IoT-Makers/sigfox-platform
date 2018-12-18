import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {Organization} from '../shared/sdk/models';
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";

@Injectable()
export class OrganizationGuard implements CanActivate {

    constructor(private userApi: UserApi, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkOrganizationMember(route);
    }

    checkOrganizationMember(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.userApi.findByIdOrganizations(this.userApi.getCurrentId(), route.params.id).pipe(map((organizations: Organization[]) => {
            if (organizations) return true;
            else {
                // Not organization member so redirect to overview page
                this.router.navigate(['/']);
                return false;
            }
        }), catchError((e) => {
            // Not organization member so redirect to overview page
            this.router.navigate(['/']);
            return of(false);
        }));
    }
}
