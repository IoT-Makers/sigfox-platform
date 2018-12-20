/* tslint:disable:no-unused-variable */

import {inject, TestBed} from '@angular/core/testing';
import {OrganizationblockService} from "./organizationblock.service";

describe('Service: Organizationblock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrganizationblockService]
    });
  });

  it('should ...', inject([OrganizationblockService], (service: OrganizationblockService) => {
    expect(service).toBeTruthy();
  }));
});
