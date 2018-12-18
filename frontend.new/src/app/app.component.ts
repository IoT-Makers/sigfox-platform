import {Component, HostBinding, OnInit} from '@angular/core';
import {SettingsService} from './core/settings/settings.service';
import {UserApi} from "./shared/sdk/services/custom";
import {RealtimeService} from "./shared/realtime/realtime.service";
import {NavigationEnd, Router} from "@angular/router";
import {User} from "./shared/sdk/models";
import {Angulartics2GoogleGlobalSiteTag} from "angulartics2/gst";
import {filter} from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    public user: User;

    @HostBinding('class.layout-fixed') get isFixed() {
        return this.settings.getLayoutSetting('isFixed');
    };

    @HostBinding('class.aside-collapsed') get isCollapsed() {
        return this.settings.getLayoutSetting('isCollapsed');
    };

    @HostBinding('class.layout-boxed') get isBoxed() {
        return this.settings.getLayoutSetting('isBoxed');
    };

    @HostBinding('class.layout-fs') get useFullLayout() {
        return this.settings.getLayoutSetting('useFullLayout');
    };

    @HostBinding('class.hidden-footer') get hiddenFooter() {
        return this.settings.getLayoutSetting('hiddenFooter');
    };

    @HostBinding('class.layout-h') get horizontal() {
        return this.settings.getLayoutSetting('horizontal');
    };

    @HostBinding('class.aside-float') get isFloat() {
        return this.settings.getLayoutSetting('isFloat');
    };

    @HostBinding('class.offsidebar-open') get offsidebarOpen() {
        return this.settings.getLayoutSetting('offsidebarOpen');
    };

    @HostBinding('class.aside-toggled') get asideToggled() {
        return this.settings.getLayoutSetting('asideToggled');
    };

    @HostBinding('class.aside-collapsed-text') get isCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    };

    constructor(public settings: SettingsService,
                private userApi: UserApi,
                private rt: RealtimeService,
                private router: Router,
                private angulartics: Angulartics2GoogleGlobalSiteTag) {
        //angulartics.startTracking();
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) =>
                this.angulartics.pageTrack(event.urlAfterRedirects));
    }

    ngOnInit() {
        document.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A') e.preventDefault();
        });
        // Get the logged in user
        this.user = this.userApi.getCachedCurrent();
        if (this.user) this.setUserPosition();
        const accessToken = this.userApi.getCurrentToken().id;
        // Create the real-time connection
        if (accessToken) this.rt.connect(accessToken);
    }

    setUserPosition(): void {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position: any) => {
                const p = {
                    type: 'navigator',
                    createdAt: new Date(),
                    location: {lat: position.coords.latitude, lng: position.coords.longitude},
                    accuracy: position.coords.accuracy
                };
                this.userApi.updateAttributes(this.user.id, {position: p});
            });
        } else console.log('Geolocation is not supported by this browser.');
    }
}
