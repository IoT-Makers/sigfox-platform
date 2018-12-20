import {Injectable} from '@angular/core';
import {Organization} from "../shared/sdk/models";

@Injectable({
  providedIn: 'root',
})

export class OrganizationService {

  public organization: Organization;

  constructor() {
  }
}
