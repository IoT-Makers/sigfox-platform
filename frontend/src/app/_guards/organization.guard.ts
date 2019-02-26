import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../shared/sdk/models';
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class OrganizationGuard implements CanActivate {

  constructor(private userApi: UserApi, private router: Router) {
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
        // Update the usedAt date for the current organization
        this.userApi.updateByIdOrganizations(this.userApi.getCurrentId(), route.params.id, {visitedAt: new Date()}).subscribe(() => {
        });
        return true;
      } else {
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

