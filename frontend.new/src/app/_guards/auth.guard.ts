import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {UserService} from "../_services/user.service";
import {OrganizationService} from "../_services/organization.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private organizationService: OrganizationService, private userService: UserService, private userApi: UserApi, private router: Router) {
    }

    /**
     * The function below checks if the user is connected
     * and injects the current user in the corresponding user service
     * it also resets to a null value the latest organization
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.organizationService.organization = null;
        this.userService.user = this.userApi.getCachedCurrent();

        if (this.userApi.isAuthenticated()) return true;
        // Not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}
