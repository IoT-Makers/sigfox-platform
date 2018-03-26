import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom/User';
import {Observable} from 'rxjs/Observable';
import {OrganizationApi} from '../shared/sdk/services/custom';

@Injectable()
export class OrganizationGuard implements CanActivate {

  constructor(private userApi: UserApi, private organizationApi: OrganizationApi, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkOrganizationMember(route);
  }

  checkOrganizationMember(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.organizationApi.existsMembers(route.params.id, this.userApi.getCurrentId()).map((res: Response) => {
      if (res) {
        return true;
      } else {
        // Not organization member so redirect to overview page
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
