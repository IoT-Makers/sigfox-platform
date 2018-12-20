import {Component, Input, OnInit} from '@angular/core';
import {OrganizationblockService} from './organizationblock.service';
import {Organization, User} from "../../../shared/sdk/models";

@Component({
    selector: 'app-organizationblock',
    templateUrl: './organizationblock.component.html',
    styleUrls: ['./organizationblock.component.scss']
})
export class OrganizationblockComponent implements OnInit {

    @Input() user: User;
    @Input() admin: Boolean = false;
    @Input() organization: Organization;

    isConnected: boolean = false;

    constructor(public organizationblockService: OrganizationblockService) {

    }

    ngOnInit() {
    }

    setup() {
        /*this.unsubscribe();
        this.subscribe();*/
    }

    organizationBlockIsVisible() {
        return this.organizationblockService.getVisibility();
    }

    rtOpenHandler = (isConnected: any) => {
        this.isConnected = isConnected;
    };

    rtReconnectListener = (isConnected: any) => {
        this.isConnected = isConnected;
    };

    subscribe(): void {
        /*this.rtOpenHandler = this.rt.openListener(this.rtOpenHandler);
        this.rtReconnectListener = this.rt.reconnectListener(this.rtReconnectListener);*/
    }

    unsubscribe(): void {
        /*this.rt.removeListener(this.rtOpenHandler);
        this.rt.removeListener(this.rtOpenHandler);*/
    }

}
