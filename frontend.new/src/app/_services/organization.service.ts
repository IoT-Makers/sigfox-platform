import {Inject, Injectable} from '@angular/core';
import {Organization} from "../shared/sdk/models";

@Injectable()
export class OrganizationService {

  public isOrganizationView = false;
  private organizationRouteSub;

  constructor() {
    // Check if organization view
    this.organizationRouteSub = this.route.params.subscribe(params => {
      if (params.id) {
        this.userApi.findByIdOrganizations(this.user.id, params.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.organizationApi.countMembers(this.organization.id).subscribe(result => {
            this.countOrganizationMembers = result.count;
            this.countOrganizationMembersReady = true;
          });
          this.setup();
        });
      } else {
        this.setup();
      }
    });
  }
}
