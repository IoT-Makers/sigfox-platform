import {Component, OnInit} from '@angular/core';

import {UserblockService} from './userblock.service';
import {UserApi} from "../../../shared/sdk/services/custom";
import {Role, User} from "../../../shared/sdk/models";
import {RealtimeService} from "../../../shared/realtime/realtime.service";

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {

    userExample: any;
    user: User;
    admin: boolean;
    isConnected: boolean = false;

    constructor(public userblockService: UserblockService,
                private userApi: UserApi,
                private rt: RealtimeService) {

        this.userExample = {
            email: 'john.doe@test.com',
            role: 'admin',
            picture: 'assets/img/user/user.svg'
        };
    }

    ngOnInit() {
        this.unsubscribe();
        this.subscribe();
        this.user = this.userApi.getCachedCurrent();
        this.userApi.getRoles(this.user.id).subscribe((roles: Role[]) => {
            this.user.roles = roles;
            roles.forEach((role: Role) => {
                if (role.name === 'admin') {
                    this.admin = true;
                    return;
                }
            });
        });
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
