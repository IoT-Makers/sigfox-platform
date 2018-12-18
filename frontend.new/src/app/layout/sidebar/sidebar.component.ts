import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../core/menu/menu.service';
import {SettingsService} from '../../core/settings/settings.service';
import {Dashboard, Organization, Role, User} from "../../shared/sdk/models";
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {BeaconApi, DashboardApi, OrganizationApi, ParserApi, UserApi} from "../../shared/sdk/services/custom";

declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

    menuItems: Array<any>;
    sbclickEvent = 'click.sidebar-toggle';
    $doc: any = null;

    // Flags
    public isInitialized = false;
    public devicesReady = false;
    public messagesReady = false;
    public countCategoriesReady = false;
    public countDevicesReady = false;
    public countMessagesReady = false;
    public countAlertsReady = false;
    public countParsersReady = false;
    public countConnectorsReady = false;
    public countBeaconsReady = false;

    public user: User;
    public organization: Organization;

    dashboards: Dashboard[] = [];

    countCategories = 0;
    countDevices = 0;
    countMessages = 0;
    countAlerts = 0;
    countParsers = 0;
    countConnectors = 0;
    countBeacons = 0;

    public admin = false;

    api;
    id;

    constructor(public menu: MenuService,
                public settings: SettingsService,
                public injector: Injector,
                private rt: RealtimeService,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private parserApi: ParserApi,
                private beaconApi: BeaconApi,
                private dashboardApi: DashboardApi,
                private route: ActivatedRoute,
                private router: Router) {
        this.menuItems = menu.getMenu();
    }

    ngOnInit() {
        this.router = this.injector.get(Router);
        this.router.events.subscribe((val) => {
            // close any submenu opened when route changes
            this.removeFloatingNav();
            // scroll view to top
            window.scrollTo(0, 0);
            // close sidebar on route change
            this.settings.setLayoutSetting('asideToggled', false);
        });
        // enable sidebar autoclose from extenal clicks
        this.anyClickClose();

        // Get the logged in User object
        this.user = this.userApi.getCachedCurrent();
        this.userApi.getRoles(this.user.id).subscribe((roles: Role[]) => {
            this.user.roles = roles;
            roles.forEach((role: Role) => {
                if (role.name === 'admin') {
                    this.admin = true;
                    return;
                }
            });

            // Check if organization view
            this.route.params.subscribe(params => {
                this.isInitialized = false;
                console.log('params full layout', params);
                if (params.id) {
                    this.organizationApi.findById(params.id, {include: 'Members'}).subscribe((organization: Organization) => {
                        this.organization = organization;
                        this.setup();
                    });
                } else {
                    this.setup();
                }
            });
        });
    }


    setup(): void {
        this.api = this.organization ? this.organizationApi : this.userApi;
        this.id = this.organization ? this.organization.id : this.user.id;
        this.unsubscribe();
        this.subscribe();
        if (!this.isInitialized) {
            this.isInitialized = true;
            console.log('Setup Sidebar');

            // Categories
            this.api.countCategories(this.id).subscribe(result => {
                this.countCategories = result.count;
                this.countCategoriesReady = true;
            });

            // Devices
            this.api.countDevices(this.id).subscribe(result => {
                this.countDevices = result.count;
                this.countDevicesReady = true;
            });

            // Messages
            this.api.countMessages(this.id).subscribe(result => {
                this.countMessages = result.count;
                this.countMessagesReady = true;
            });

            this.api.getDashboards(this.id, {order: 'createdAt DESC'}).subscribe((dashboards: Dashboard[]) => {
                this.dashboards = dashboards;
            });

            if (!this.organization) {
                // Alerts
                this.userApi.countAlerts(this.user.id).subscribe(result => {
                    this.countAlerts = result.count;
                    this.countAlertsReady = true;
                });

                // Parsers
                this.parserApi.count().subscribe(result => {
                    this.countParsers = result.count;
                    this.countParsersReady = true;
                });

                // Beacons
                this.userApi.countBeacons(this.user.id).subscribe(result => {
                    this.countBeacons = result.count;
                    this.countBeaconsReady = true;
                });

                // Connectors
                this.userApi.countConnectors(this.user.id).subscribe(result => {
                    this.countConnectors = result.count;
                    this.countConnectorsReady = true;
                });
            }
        }
    }

    private cleanSetup() {
        this.unsubscribe();
    }

    ngOnDestroy(): void {
        console.log('Sidebar: ngOnDestroy');
        this.cleanSetup();
        if (this.$doc) this.$doc.off(this.sbclickEvent);
    }

    newDashboard(): void {
        const dashboard: Dashboard = new Dashboard();
        dashboard.name = 'New dashboard';
        if (this.organization) dashboard.name = 'Shared dashboard';

        this.api.createDashboards(this.id, dashboard).subscribe(dashboard => {
            if (!this.organization) this.router.navigate(['/dashboard/' + dashboard.id]);
            else this.router.navigate(['/organization/' + this.organization.id + '/dashboard/' + dashboard.id]);
        });
    }

    rtCategoryHandler = (payload: any) => {
        payload.action == "CREATE" ? this.countCategories++ : payload.action == "DELETE" ? this.countCategories-- : 0;
    };
    rtDeviceHandler = (payload: any) => {
        const device = payload.content;
        payload.action == "CREATE" ? this.countDevices++ : payload.action == "DELETE" ? this.countDevices-- : 0;
    };
    rtMsgHandler = (payload: any) => {
        const msg = payload.content;
        payload.action == "CREATE" ? this.countMessages++ : payload.action == "DELETE" ? this.countMessages-- : 0;
    };
    rtAlertHandler = (payload: any) => {
        payload.action == "CREATE" ? this.countAlerts++ : payload.action == "DELETE" ? this.countAlerts-- : 0;
    };
    rtParserHandler = (payload: any) => {
        payload.action == "CREATE" ? this.countParsers++ : payload.action == "DELETE" ? this.countParsers-- : 0;
    };
    rtConnectorHandler = (payload: any) => {
        payload.action == "CREATE" ? this.countConnectors++ : payload.action == "DELETE" ? this.countConnectors-- : 0;
    };
    rtBeaconHandler = (payload: any) => {
        payload.action == "CREATE" ? this.countBeacons++ : payload.action == "DELETE" ? this.countBeacons-- : 0;
    };
    rtDashboardHandler = (payload: any) => {
        const dashboard = payload.content;
        if (payload.action == "CREATE") {
            // ensure data for the user and any org don't mix up
            if (dashboard.userId == this.user.id || (this.organization && dashboard.organizationId === this.organization.id))
                this.dashboards.unshift(dashboard);
        } else if (payload.action == "UPDATE") {
            let idx = this.dashboards.findIndex(x => x.id == dashboard.id);
            if (idx != -1) this.dashboards[idx] = dashboard;
        } else if (payload.action == "DELETE") {
            this.dashboards = this.dashboards.filter(function (obj) {
                return obj.id !== dashboard.id;
            });
        }
    };

    subscribe(): void {
        this.rtCategoryHandler = this.rt.addListener("category", this.rtCategoryHandler);
        this.rtDeviceHandler = this.rt.addListener("device", this.rtDeviceHandler);
        this.rtMsgHandler = this.rt.addListener("message", this.rtMsgHandler);
        this.rtAlertHandler = this.rt.addListener("alert", this.rtAlertHandler);
        this.rtParserHandler = this.rt.addListener("parser", this.rtParserHandler);
        this.rtConnectorHandler = this.rt.addListener("Connector", this.rtConnectorHandler);
        this.rtBeaconHandler = this.rt.addListener("beacon", this.rtBeaconHandler);
        this.rtDashboardHandler = this.rt.addListener("dashboard", this.rtDashboardHandler);
    }

    unsubscribe(): void {
        this.rt.removeListener(this.rtCategoryHandler);
        this.rt.removeListener(this.rtDeviceHandler);
        this.rt.removeListener(this.rtMsgHandler);
        this.rt.removeListener(this.rtAlertHandler);
        this.rt.removeListener(this.rtParserHandler);
        this.rt.removeListener(this.rtConnectorHandler);
        this.rt.removeListener(this.rtBeaconHandler);
        this.rt.removeListener(this.rtDashboardHandler);
    }


    submenuClick(item: any) {
        if (item.link === '/dashboard') return;
    }

    anyClickClose() {
        this.$doc = $(document).on(this.sbclickEvent, (e) => {
            if (!$(e.target).parents('.aside-container').length) {
                this.settings.setLayoutSetting('asideToggled', false);
            }
        });
    }

    toggleSubmenuClick(event) {
        event.preventDefault();
        if (!this.isSidebarCollapsed() && !this.isSidebarCollapsedText() && !this.isEnabledHover()) {
            let ul = $(event.currentTarget.nextElementSibling);
            // hide other submenus
            let parentNav = ul.parents('.sidebar-subnav');
            $('.sidebar-subnav').each((idx, el) => {
                let $el = $(el);
                // if element is not a parent or self ul
                if (el !== parentNav[0] && el !== ul[0]) this.closeMenu($el);
            });
            // abort if not UL to process
            if (!ul.length) return;
            // any child menu should start closed
            ul.find('.sidebar-subnav').each((idx, el) => {
                this.closeMenu($(el));
            });
            // toggle UL height
            const ulHeight = ul.css('height');
            if (ulHeight === 'auto' || parseInt(ulHeight, 10)) this.closeMenu(ul);
            else {
                // expand menu
                ul.on('transitionend', () => {
                    ul.css('height', 'auto').off('transitionend');
                }).css('height', ul[0].scrollHeight);
                // add class to manage animation
                ul.addClass('opening');
            }
        }
    }

    // Close menu collapsing height
    closeMenu(elem) {
        elem.css('height', elem[0].scrollHeight); // set height
        elem.css('height', 0); // and move to zero to collapse
        elem.removeClass('opening');
    }

    toggleSubmenuHover(event) {
        let self = this;
        if (this.isSidebarCollapsed() || this.isSidebarCollapsedText() || this.isEnabledHover()) {
            event.preventDefault();
            this.removeFloatingNav();
            let ul = $(event.currentTarget.nextElementSibling);
            let anchor = $(event.currentTarget);
            if (!ul.length) return; // if not submenu return
            let $aside = $('.aside-container');
            let $asideInner = $aside.children('.aside-inner'); // for top offset calculation
            let $sidebar = $asideInner.children('.sidebar');
            let mar = parseInt($asideInner.css('padding-top'), 0) + parseInt($aside.css('padding-top'), 0);
            let itemTop = ((anchor.parent().position().top) + mar) - $sidebar.scrollTop();
            let floatingNav = ul.clone().appendTo($aside);
            let vwHeight = document.body.clientHeight;
            // let itemTop = anchor.position().top || anchor.offset().top;
            floatingNav
                .removeClass('opening') // necesary for demo if switched between normal//collapsed mode
                .addClass('nav-floating')
                .css({
                    position: this.settings.getLayoutSetting('isFixed') ? 'fixed' : 'absolute',
                    top: itemTop,
                    bottom: (floatingNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
                });
            floatingNav
                .on('mouseleave', () => {
                    floatingNav.remove();
                })
                .find('a').on('click', function (e) {
                e.preventDefault(); // prevents page reload on click
                // get the exact route path to navigate
                let routeTo = $(this).attr('route');
                if (routeTo) self.router.navigate([routeTo]);
            });
            this.listenForExternalClicks();
        }
    }

    listenForExternalClicks() {
        let $doc = $(document).on('click.sidebar', (e) => {
            if (!$(e.target).parents('.aside-container').length) {
                this.removeFloatingNav();
                $doc.off('click.sidebar');
            }
        });
    }

    removeFloatingNav() {
        $('.nav-floating').remove();
    }

    isSidebarCollapsed() {
        return this.settings.getLayoutSetting('isCollapsed');
    }

    isSidebarCollapsedText() {
        return this.settings.getLayoutSetting('isCollapsedText');
    }

    isEnabledHover() {
        return this.settings.getLayoutSetting('asideHover');
    }
}
