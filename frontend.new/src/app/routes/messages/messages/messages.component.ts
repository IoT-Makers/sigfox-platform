import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Connector, Geoloc, Message, Organization, Reception, User} from '../../../shared/sdk/models';
import {MessageApi, UserApi} from '../../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {OrganizationApi, ReceptionApi} from '../../../shared/sdk/services/custom';
import {AgmMap} from '@agm/core';
import {ActivatedRoute} from '@angular/router';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {UserService} from "../../../_services/user.service";
import {OrganizationService} from "../../../_services/organization.service";

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, OnDestroy {

    user: User;

    @ViewChild('mapModal') mapModal: any;
    @ViewChild('agmMap') agmMap: AgmMap;

    // Flags
    public messagesReady = false;

    public mapLat = 48.856614;
    public mapLng = 2.352222;
    public mapZoom = 10;
    public receptions: any[] = [];
    public geolocs: Geoloc[] = [];

    deviceIdSub: Subscription;
    organizationRouteSub: Subscription;
    public messages: Message[] = [];

    public organization: Organization;
    organizations: Organization[] = [];

    messageFilter: any;

    // Notifications
    toast;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000,
            animation: 'fade'
        });

    api;
    id;
    admin = false;

    selectedAction: any = 100;

    constructor(private rt: RealtimeService,
                private userService: UserService,
                private organizationService: OrganizationService,
                private userApi: UserApi,
                private messageApi: MessageApi,
                private organizationApi: OrganizationApi,
                private receptionApi: ReceptionApi,
                private toasterService: ToasterService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        console.log('Messages: ngOnInit');
        // Get the logged in user
        this.user = this.userService.getCurrentUser();
        this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
            this.organization = this.organizationService.getCurrentOrganization();
            this.deviceIdSub = this.route.params.subscribe(params => {
                if (params['id']) this.setup(params['id'].toUpperCase());
                else this.setup();
            });
        });
    }

    setup(deviceId?: string): void {
        // Get and listen messages
        this.api = this.organization ? this.organizationApi : this.userApi;
        this.id = this.organization ? this.organization.id : this.user.id;
        this.unsubscribe();
        this.subscribe(this.id);

        if (deviceId) {
            this.messageFilter = {
                order: 'createdAt DESC',
                limit: 100,
                include: ['Device', 'Geolocs'],
                where: {deviceId: deviceId}
            };
        } else {
            this.messageFilter = {
                order: 'createdAt DESC',
                limit: 100,
                include: ['Device', 'Geolocs']
            };
        }

        if (this.organization) {
            this.organizationApi.getFilteredMessages(this.organization.id, this.messageFilter).subscribe((messages: Message[]) => {
                this.messages = messages;
                this.messagesReady = true;
            });
        } else if (this.admin && deviceId) {
            this.messageApi.find(this.messageFilter).subscribe((messages: Message[]) => {
                this.messages = messages;
                this.messagesReady = true;
            });
        } else {
            this.userApi.getMessages(this.user.id, this.messageFilter).subscribe((messages: Message[]) => {
                this.messages = messages;
                this.messagesReady = true;
            });
        }
    }

    ngOnDestroy(): void {
        console.log('Messages: ngOnDestroy');
        this.cleanSetup();
    }

    cleanSetup() {
        if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
        if (this.deviceIdSub) this.deviceIdSub.unsubscribe();
        this.unsubscribe();
    }

    deleteMessage(message: Message): void {
        this.userApi.destroyByIdMessages(this.user.id, message.id).subscribe(value => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'The message has been deleted.');
        }, err => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('error', 'Error', err.error);
        });
    }

    showMarkers(message: Message): void {
        this.geolocs = [];
        this.receptions = [];
        this.mapZoom = 10;

        // Message geoloc
        if (message.Geolocs && message.Geolocs.length > 0) {
            this.geolocs = message.Geolocs;
            this.mapLat = message.Geolocs[0].location.lat;
            this.mapLng = message.Geolocs[0].location.lng;
            // Show map
            this.mapModal.show();
            this.mapModal.onShown.subscribe((reason: string) => {
                this.agmMap.triggerResize();
            });
        }

        // Coverage
        this.userApi.getConnectors(this.user.id, {where: {type: 'sigfox-api'}}).subscribe((connectors: Connector[]) => {
            if (connectors.length > 0) {
                // Show map
                this.mapModal.show();
                // Get receptions
                this.receptionApi.getBaseStationsByDeviceId(message.deviceId, message.time).subscribe((receptionsResult: Reception[]) => {
                        this.receptions = receptionsResult;
                        console.log(this.receptions);
                        if (this.receptions.length > 0) {
                            this.receptions.forEach((reception, i) => {
                                this.receptions[i].lat = Number(reception.lat);
                                this.receptions[i].lng = Number(reception.lng);
                            });
                            if (!message.Geolocs) {
                                this.mapLat = this.receptions[0].location.lat;
                                this.mapLng = this.receptions[0].location.lng;
                            }
                            this.mapModal.onShown.subscribe((reason: string) => {
                                this.agmMap.triggerResize();
                            });
                        }
                    }, error => {
                        console.log(error);
                    }
                );
            } else {
                console.log('No Sigfox API connector');
            }
        });
    }

    searchFilter(filter: string) {
        switch (filter) {
            case 'all':
                this.messageFilter.limit = 10000;
                break;
            default:
                this.messageFilter.limit = Number(filter)
        }
        /*this.messageFilter.limit = this.selectedAction;
        if (this.selectedAction === 'all') this.messageFilter.limit = 10000;
        if (this.selectedAction === 'export') return;*/

        this.messages = [];
        this.messagesReady = false;

        this.api.getMessages(this.id, this.messageFilter).subscribe((messages: Message[]) => {
            this.messages = messages;
            this.messagesReady = true;
        });
    }

    download(): void {

    }

    rtHandler = (payload: any) => {
        const msg = payload.content;
        if (msg.userId == this.user.id || (this.organization && msg.Device.Organizations.map(x => x.id).includes(this.organization.id))) {
            if (payload.action == "CREATE") {
                for (const geoloc of this.geolocBuffer) {
                    if (geoloc.content.messageId === msg.id) {
                        msg.Geolocs.push(geoloc.content);
                        let index = this.geolocBuffer.indexOf(geoloc);
                        if (index > -1) this.geolocBuffer.splice(index, 1);
                        break;
                    }
                }
                console.log(msg);
                this.messages.unshift(msg);
            } else if (payload.action == "DELETE") {
                this.messages = this.messages.filter((msg) => {
                    return msg.id !== payload.content.id;
                });
            }
        }
    };

    private geolocBuffer = [];
    geolocHandler = (payload: any) => {
        if (payload.action === "CREATE") {
            for (let msg of this.messages) {
                if (msg.id === payload.content.messageId) {
                    msg.Geolocs ? msg.Geolocs.push(payload.content) : msg.Geolocs = [payload.content];
                    return;
                }
            }
            this.geolocBuffer.push(payload);
        }
    };

    subscribe(id: string): void {
        this.rt.informCurrentPage(id, ['message', 'geoloc']);
        this.rtHandler = this.rt.addListener('message', this.rtHandler);
        this.geolocHandler = this.rt.addListener('geoloc', this.geolocHandler);
    }

    unsubscribe(): void {
        this.rt.removeListener(this.rtHandler);
        this.rt.removeListener(this.geolocHandler);
    }
}
