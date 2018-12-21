import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {UserService} from "../_services/user.service";
import {OrganizationService} from "../_services/organization.service";
import {Role} from "../shared/sdk/models";

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
        return this.checkAuthenticatedAndAdmin(route, state);
    }

    checkAuthenticatedAndAdmin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // Reset the organization [this is important]
        this.organizationService.setCurrentOrganization(null);

        // Return true if the user is not authenticated
        if (this.userApi.isAuthenticated()) {
            if (this.userApi.getCachedCurrent()) {
                // Set the current logged in user
                this.userService.setCurrentUser(this.userApi.getCachedCurrent());
                // Check the user roles and set admin if he is
                // TODO: remove this temporary if !
                if (this.userService.getCurrentUser().roles) {
                    this.userService.getCurrentUser().roles.forEach((role: Role) => {
                        if (role.name === 'admin') return this.userService.setAdmin(true);
                    });
                }
                return true;
            } else {
                // No cached user so redirect to login page with the return url
                this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
                return false
            }
        } else {
            // Not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
            return false
        }
    }
}
