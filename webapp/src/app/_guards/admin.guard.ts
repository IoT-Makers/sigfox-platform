import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom/User';
import * as _ from 'lodash';
import {Observable} from 'rxjs/Observable';
import {Role} from '../shared/sdk/models';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private userApi: UserApi, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkAdmin();
  }

  checkAdmin(): Observable<boolean> {
    return this.userApi.getRoles(this.userApi.getCurrentId()).map((roles: Role[]) => {
      if (_.filter(roles, {name: 'admin'}).length !== 0) {
        return true;
      } else {
        // Not admin in so redirect to overview page
        this.router.navigate(['/']);
        return false;
      }
    });
  }
}
