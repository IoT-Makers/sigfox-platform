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
    return this.userApi.findByIdDashboards(this.userApi.getCurrentId(), route.params.id).map((dashboards: Dashboard[]) => {
      if (dashboards) return true;
      else {
        // Not dashboard owner so redirect to overview page
        this.router.navigate(['/']);
        return false;
      }
    }).catch(res => {
      // Not dashboard owner so redirect to overview page
      this.router.navigate(['/']);
      return Observable.of(false);
    });
  }
}
