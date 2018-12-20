import {Injectable} from '@angular/core';

@Injectable()
export class MenuService {

    menuItemsUser: Array<any>;
    menuItemsOrganization: Array<any>;

    constructor() {
        this.menuItemsUser = [];
        this.menuItemsOrganization = [];
    }

    addMenuUser(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {
        items.forEach((item) => {
            this.menuItemsUser.push(item);
        });
    }

    addMenuOrganization(items: Array<{
        text: string,
        heading?: boolean,
        link?: string,     // internal route links
        elink?: string,    // used only for external links
        target?: string,   // anchor target="_blank|_self|_parent|_top|framename"
        icon?: string,
        alert?: string,
        submenu?: Array<any>
    }>) {
        items.forEach((item) => {
            this.menuItemsOrganization.push(item);
        });
    }

    getMenuUser() {
        return this.menuItemsUser;
    }

    getMenuOrganization() {
        return this.menuItemsOrganization;
    }

}
