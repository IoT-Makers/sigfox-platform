/* tslint:disable:no-unused-variable */

import {async, inject, TestBed} from '@angular/core/testing';
import {OrganizationblockService} from "./organizationblock.service";
import {OrganizationblockComponent} from "./organizationblock.component";

describe('Component: Oganizationblock', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [OrganizationblockService]
        }).compileComponents();
    });

    it('should create an instance', async(inject([OrganizationblockService], (organizationBlockService) => {
        let component = new OrganizationblockComponent(organizationBlockService);
        expect(component).toBeTruthy();
    })));
});
