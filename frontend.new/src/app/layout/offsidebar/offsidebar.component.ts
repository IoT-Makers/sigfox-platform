import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SettingsService} from '../../core/settings/settings.service';
import {ThemesService} from '../../core/themes/themes.service';
import {TranslatorService} from '../../core/translator/translator.service';
import {Organization, Role, User} from "../../shared/sdk/models";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizationApi, UserApi} from "../../shared/sdk/services/custom";
import * as _ from "lodash";

@Component({
    selector: 'app-offsidebar',
    templateUrl: './offsidebar.component.html',
    styleUrls: ['./offsidebar.component.scss']
})
export class OffsidebarComponent implements OnInit, OnDestroy {

    @ViewChild('addOrEditOrganizationModal') addOrEditOrganizationModal: any;

    public user: User;
    public admin = false;

    // Organization
    selectedUsers: Array<any> = [];
    selectUsers: Array<any> = [];
    public addOrganizationFlag = true;
    organizationToAddOrEdit: Organization = new Organization();
    organizations: Organization[] = [];
    public organization: Organization;
    public countOrganizationsReady = false;
    countOrganizations = 0;

    // Flags
    public isInitialized = false;

    public disabled = false;
    public status: { isopen: boolean } = {isopen: false};
    protected selectUsersSettings = {
        singleSelection: false,
        text: 'Select users',
        enableSearchFilter: true,
        enableCheckAll: false,
        classes: 'select-organization'
    };

    api;
    id;

    constructor(public settings: SettingsService,
                public themes: ThemesService,
                public translator: TranslatorService,
                public elem: ElementRef,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        console.log('Offsidebar: ngOnInit');
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
                console.log('route.params Header', params);
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
            console.log('Setup Offsidebar');
            this.userApi.getOrganizations(this.user.id, {order: 'createdAt DESC'}).subscribe((organizations: Organization[]) => {
                this.organizations = organizations;
                this.countOrganizationsReady = true;
                this.countOrganizationsMembers(true);
            });
        }
    }

    private cleanSetup() {
        this.unsubscribe();
    }

    redirectToOgranizationView(orgId: string): void {
        if (
            this.route.snapshot.firstChild.routeConfig.path === 'categories'
            || this.route.snapshot.firstChild.routeConfig.path === 'devices'
            || this.route.snapshot.firstChild.routeConfig.path === 'messages') {
            /*this.router.navigate(['/'], {skipLocationChange: true}).then(() => {
              this.router.navigate(['organization/' + orgId + '/' + this.route.snapshot.firstChild.routeConfig.path]);
            });*/
            this.router.navigate(['organization/' + orgId + '/' + this.route.snapshot.firstChild.routeConfig.path]);
        } else {
            /*this.router.navigate(['/'], {skipLocationChange: true}).then(() => {
              this.router.navigate(['/organization/' + orgId]);
            });*/
            this.router.navigate(['organization/' + orgId]);
        }

        /*this.organizationApi.findById(orgId, {include: 'Members'}).subscribe((organization: Organization) => {
          this.organization = organization;
          this.setup();
        });*/
    }

    countOrganizationsMembers(open: boolean): void {
        if (open) {
            // Count organization members
            this.organizations.forEach((organization: any) => {
                this.organizationApi.countMembers(organization.id).subscribe(result => {
                    organization.countMembers = result.count;
                });
            });
        }
    }

    openAddOrganizationModal(): void {
        this.organizationToAddOrEdit = new Organization();
        this.selectedUsers = [];
        this.selectUsers = [];
        this.addOrganizationFlag = true;

        if (this.admin) {
            this.userApi.find({fields: {email: true, id: true}}).subscribe((users: User[]) => {
                //console.log(results);
                users.forEach((user: any) => {
                    const item = {
                        id: user.id,
                        itemName: user.email
                    };
                    if (user.id !== this.user.id) this.selectUsers.push(item);
                });

            });
        }
        this.addOrEditOrganizationModal.show();
    }

    openEditOrganizationModal(): void {
        this.selectedUsers = [];
        this.selectUsers = [];
        this.addOrganizationFlag = false;
        this.organizationToAddOrEdit = this.organization;
        this.organization.Members.forEach(member => {
            const user = {
                id: member.id,
                itemName: member.email
            };
            if (user.id !== this.user.id) this.selectedUsers.push(user);
        });

        if (this.admin) {
            this.userApi.find({fields: {email: true, id: true}}).subscribe((users: User[]) => {
                //console.log(results);
                users.forEach((user: any) => {
                    const item = {
                        id: user.id,
                        itemName: user.email
                    };
                    if (user.id !== this.user.id) this.selectUsers.push(item);
                });

            });
        }
        this.addOrEditOrganizationModal.show();
    }

    addOrganization(): void {
        this.organizationToAddOrEdit.userId = this.user.id;

        this.userApi.createOrganizations(this.user.id, this.organizationToAddOrEdit).subscribe((organization: Organization) => {
            console.log('Organization created', organization);
            this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
                this.organization = organization;
                this.addOrEditOrganizationModal.hide();
            });
        });
    }

    editOrganization(): void {
        const to_add = _.difference(this.selectedUsers.map(u => u.id), this.organizationToAddOrEdit.Members.map(u => u.id));
        const to_del = _.difference(this.organizationToAddOrEdit.Members.map(u => u.id), this.selectedUsers.map(u => u.id).concat([this.user.id]));
        to_add.forEach(user => {
            this.linkMember(user);
        });
        to_del.forEach(user => {
            this.unlinkMember(user);
        });
        this.userApi.updateByIdOrganizations(this.user.id, this.organizationToAddOrEdit.id, this.organizationToAddOrEdit).subscribe((organization: Organization) => {
            console.log('Organization edited', organization);
            this.organizationApi.findById(organization.id, {include: 'Members'}).subscribe((organization: Organization) => {
                this.organization = organization;
                this.addOrEditOrganizationModal.hide();
            });
        });
    }

    linkMember(userId: any): void {
        this.organizationApi.linkMembers(this.organizationToAddOrEdit.id, userId).subscribe((result) => {
            console.log('Result after linking member: ', result);
        });
    }

    unlinkMember(userId: any): void {
        this.organizationApi.unlinkMembers(this.organizationToAddOrEdit.id, userId).subscribe((result) => {
            console.log('Result after unlinking member: ', result);
        });
    }

    anyClickClose() {
        document.addEventListener('click', this.checkCloseOffsidebar.bind(this), false);
    }

    checkCloseOffsidebar(e) {
        const contains = (this.elem.nativeElement !== e.target && this.elem.nativeElement.contains(e.target));
        if (!contains) {
            this.settings.setLayoutSetting('offsidebarOpen', false);
        }
    }

    subscribe(): void {
    }

    unsubscribe(): void {
    }

    ngOnDestroy() {
        console.log('Offsidebar: ngOnDestroy');
        document.removeEventListener('click', this.checkCloseOffsidebar);
        this.cleanSetup();
    }
}
