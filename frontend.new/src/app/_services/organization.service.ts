import {Injectable} from '@angular/core';
import {Organization} from "../shared/sdk/models";

@Injectable({
  providedIn: 'root',
})

export class OrganizationService {

  private organization: Organization;

  constructor() {
  }

  setCurrentOrganization(organization: Organization): void {
    this.organization = organization;
  }

  getCurrentOrganization(): Organization {
    return this.organization
  }
}
