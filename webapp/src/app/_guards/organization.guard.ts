import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom/User';
import {Observable} from 'rxjs/Observable';
import {Organization} from '../shared/sdk/models';

@Injectable()
export class OrganizationGuard implements CanActivate {

  constructor(private userApi: UserApi, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkOrganizationMember(route);
  }

  checkOrganizationMember(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userApi.findByIdOrganizations(this.userApi.getCurrentId(), route.params.id).map((organizations: Organization[]) => {
      if (organizations) {
        return true;
      } else {
        // Not organization member so redirect to overview page
        this.router.navigate(['/']);
        return false;
      }
    }).catch(res => {
      // Not organization member so redirect to overview page
      this.router.navigate(['/']);
      return Observable.of(false);
    });
  }
}
