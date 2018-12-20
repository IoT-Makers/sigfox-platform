import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {UserApi} from "../sdk/services/custom";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Organization, User} from "../sdk/models";

@Injectable({
  providedIn: 'root',
})

export class UserOrganizationResolverService {

  public user: User;
  public organization: Organization;

  constructor(private userApi: UserApi) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Organization | Boolean> {
    return this.userApi.findByIdOrganizations(this.userApi.getCurrentId(), route.params.id).pipe(map((organization: Organization) => {
      console.error(organization);
      if (organization) return organization;
      else return false;
    }), catchError((e) => {
      return of(false);
    }));
  }

  /*checkOrganizationView(): Organization {
    console.log(this.route.snapshot.firstChild);
    console.log(this.route.snapshot);
    if (this.route.snapshot.firstChild && this.route.snapshot.firstChild.params && this.route.snapshot.firstChild.params.id) {
      const user = this.userApi.getCachedCurrent();
      const organizationId = this.route.snapshot.firstChild.params.id;
      return of(new Organization());
      this.userApi.findByIdOrganizations(user.id, organizationId).subscribe((organization: Organization) => {
        console.log('Organization view');
        //return of(organization);
        return of(organization);
      });
    } else {
      console.log('Not organization view');
      return of(null);
    }
  }*/
}
