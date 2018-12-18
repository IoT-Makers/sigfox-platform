import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {UserApi} from '../shared/sdk/services/custom';
import {Role} from '../shared/sdk/models'
import * as _ from 'lodash';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userApi: UserApi, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkAdmin();
    }

    checkAdmin(): Observable<boolean> {
        return this.userApi.getRoles(this.userApi.getCurrentId()).pipe(map((roles: Role[]) => {
            if (_.filter(roles, {name: 'admin'}).length !== 0) return true;
            else {
                // Not admin in so redirect to overview page
                this.router.navigate(['/']);
                return false;
            }
        }), catchError((e) => {
            // Not admin in so redirect to overview page
            this.router.navigate(['/']);
            return of(false);
        }));
    }
}
