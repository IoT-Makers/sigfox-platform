import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom/User';
import {Observable} from 'rxjs/Observable';
import {Dashboard} from '../shared/sdk/models';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private userApi: UserApi, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkDashboardOwner(route);
  }

  checkDashboardOwner(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.userApi.getDashboards(this.userApi.getCurrentId(), {where: {id: route.params.id}}).map((dashboards: Dashboard[]) => {
      if (dashboards.length > 0) {
        return true;
      } else {
        // Not dashboard owner in so redirect to overview page
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
