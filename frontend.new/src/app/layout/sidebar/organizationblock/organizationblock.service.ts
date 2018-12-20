import {Injectable} from '@angular/core';

@Injectable()
export class OrganizationblockService {
    public userBlockVisible: boolean;
    constructor() {
        // initially visible
        this.userBlockVisible  = true;
    }

    getVisibility() {
        return this.userBlockVisible;
    }

    setVisibility(stat = true) {
        this.userBlockVisible = stat;
    }

    toggleVisibility() {
        this.userBlockVisible = !this.userBlockVisible;
    }

}
