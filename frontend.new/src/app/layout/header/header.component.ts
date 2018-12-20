import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserblockService} from '../sidebar/userblock/userblock.service';
import {SettingsService} from '../../core/settings/settings.service';
import {MenuService} from '../../core/menu/menu.service';
import {Organization, User} from "../../shared/sdk/models";
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {
    AppSettingApi,
    BeaconApi,
    DashboardApi,
    OrganizationApi,
    ParserApi,
    UserApi
} from "../../shared/sdk/services/custom";
import {ActivatedRoute, Router} from "@angular/router";

const screenfull = require('screenfull');

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {

    @Input() isLayoutLoaded: Boolean;
    @Input() user: User;
    @Input() admin: Boolean = false;
    @Input() organization: Organization;

    @ViewChild('addOrEditOrganizationModal') addOrEditOrganizationModal: any;
    @ViewChild('fsbutton') fsbutton;  // the fullscreen button

    navCollapsed = true; // for horizontal layout
    menuItems = []; // for horizontal layout
    isNavSearchVisible: boolean;

    // Organization
    public countOrganizationsReady = false;
    countOrganizations = 0;

    api;
    id;

    constructor(public menu: MenuService,
                public userblockService: UserblockService,
                public settings: SettingsService,
                private rt: RealtimeService,
                private appSettingApi: AppSettingApi,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private parserApi: ParserApi,
                private beaconApi: BeaconApi,
                private dashboardApi: DashboardApi,
                private route: ActivatedRoute,
                private router: Router) {
    }

    redirectToUserView(event) {
        event.preventDefault();
        this.userblockService.toggleVisibility();
        this.router.navigate(['/' + this.route.snapshot.firstChild.routeConfig.path]);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.organization) this.menuItems = this.menu.getMenuOrganization().slice(0, 4); // for horizontal layout
        else this.menuItems = this.menu.getMenuUser().slice(0, 4); // for horizontal layout
        this.setup();
    }

    ngOnInit() {
        console.log('Header: ngOnInit');

        this.isNavSearchVisible = false;
        /*var ua = window.navigator.userAgent;
        if (ua.indexOf("MSIE ") > 0 || !!ua.match(/Trident.*rv\:11\./)) { // Not supported under IE
            this.fsbutton.nativeElement.style.display = 'none';
        }
        // Switch fullscreen icon indicator
        const el = this.fsbutton.nativeElement.firstElementChild;
        screenfull.on('change', () => {
            if (el)
                el.className = screenfull.isFullscreen ? 'fa fa-compress' : 'fa fa-expand';
        });*/
    }

    setup(): void {
        this.api = this.organization ? this.organizationApi : this.userApi;
        this.id = this.organization ? this.organization.id : this.user.id;
        this.unsubscribe();
        this.subscribe();
        console.log('Setup Header');
        this.userApi.countOrganizations(this.user.id).subscribe((result: any) => {
            this.countOrganizations = result.count;
            this.countOrganizationsReady = true;
        });
    }

    private cleanSetup() {
        this.unsubscribe();
    }

    ngOnDestroy(): void {
        console.log('Header: ngOnDestroy');
        this.cleanSetup();
    }

    onLogout(): void {
        this.ngOnDestroy();
        this.userApi.logout().subscribe((result: any) => {
            console.log('is authenticated: ', this.userApi.isAuthenticated());
            // Some actions on logout
            this.router.navigate(['/login']);
        }, (error: any) => {
            console.log(error);
            this.router.navigate(['/login']);
        });
    }

    subscribe(): void {
    }

    unsubscribe(): void {
    }

    openNavSearch(event) {
        event.preventDefault();
        event.stopPropagation();
        this.setNavSearchVisible(true);
    }

    setNavSearchVisible(stat: boolean) {
        // console.log(stat);
        this.isNavSearchVisible = stat;
    }

    getNavSearchVisible() {
        return this.isNavSearchVisible;
    }

    toggleOffsidebar() {
        this.settings.toggleLayoutSetting('offsidebarOpen');
    }

    toggleCollapsedSideabar() {
        this.settings.toggleLayoutSetting('isCollapsed');
    }

    isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    toggleFullScreen(event) {
        if (screenfull.enabled) {
            screenfull.toggle();
        }
    }
}
