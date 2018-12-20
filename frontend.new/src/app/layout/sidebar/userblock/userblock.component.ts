import {Component, Input, OnInit} from '@angular/core';
import {UserblockService} from './userblock.service';
import {OrganizationApi, UserApi} from "../../../shared/sdk/services/custom";
import {Organization, User} from "../../../shared/sdk/models";
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {

    @Input() user: User;
    @Input() admin: Boolean = false;
    @Input() organization: Organization;

    isConnected: boolean = false;

    constructor(public userblockService: UserblockService,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private route: ActivatedRoute,
                private rt: RealtimeService) {
    }

    ngOnInit() {
        // RT handlers for connection status
        this.setup();
    }

    setup() {
        this.unsubscribe();
        this.subscribe();
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }

    rtOpenHandler = (isConnected: any) => {
        this.isConnected = isConnected;
    };

    rtReconnectListener = (isConnected: any) => {
        this.isConnected = isConnected;
    };

    subscribe(): void {
        this.rtOpenHandler = this.rt.openListener(this.rtOpenHandler);
        this.rtReconnectListener = this.rt.reconnectListener(this.rtReconnectListener);
    }

    unsubscribe(): void {
        this.rt.removeListener(this.rtOpenHandler);
        this.rt.removeListener(this.rtOpenHandler);
    }

}
