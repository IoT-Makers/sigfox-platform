import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom/User';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userApi: UserApi, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.userApi.isAuthenticated()) {
      this.userApi.patchAttributes(this.userApi.getCurrentId(), { connected: true }).subscribe();
      return true;
    }

    // Not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
