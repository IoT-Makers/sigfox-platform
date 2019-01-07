import {AppSetting, Category, Connector, Device, Organization, Parser, User} from '../../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {
    AppSettingApi,
    DeviceApi,
    MessageApi,
    OrganizationApi,
    ParserApi,
    UserApi
} from '../../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {UserService} from "../../../_services/user.service";
import {OrganizationService} from "../../../_services/organization.service";
const swal = require('sweetalert');

@Component({
    selector: 'app-device',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit, OnDestroy {

    user: User;

    public organization: Organization;
    organizations: Organization[] = [];

    @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
    @ViewChild('confirmModal') confirmModal: any;
    @ViewChild('confirmDBModal') confirmDBModal: any;
    @ViewChild('confirmParseModal') confirmParseModal: any;
    @ViewChild('shareDeviceWithOrganizationModal') shareDeviceWithOrganizationModal: any;

    // Flags
    public deviceReady = false;
    isCircleVisible: boolean[] = [];

    contentHeading: string = 'Device';

    connectors: Connector[] = [];

    showDeviceSuccessRate: AppSetting;

    deviceIdSub: Subscription;
    organizationRouteSub: Subscription;

    categories: Category[] = [];
    device: Device;
    parsers: Parser[] = [];


    messagesStats: string = '';
    messagesAverage;
    messagesTotal;
    countMessages;

    sparkOptionsLine = {
        type: 'line',
        height: 80,
        width: '100%',
        lineWidth: 2,
        lineColor: '#47a3ee',
        spotColor: '#3544bf',
        fillColor: '',
        highlightLineColor: '#3544bf',
        spotRadius: 4,
        resize: true
    };
    sparkOptionsBar = {
        barColor: '#3544bf',
        height: 50,
        barWidth: 6,
        barSpacing: 6
    };

    /*sparkOptionsLine = {
        type: 'line',
        height: 80,
        width: '100%',
        lineWidth: 2,
        lineColor: '#dddddd',
        spotColor: '#bbbbbb',
        fillColor: '',
        highlightLineColor: '#fff',
        spotRadius: 4,
        resize: true
    };
    sparkOptionsBar = {
        barColor: '#fff',
        height: 50,
        barWidth: 6,
        barSpacing: 6
    };*/

    public selectOrganizations: Array<any> = [];
    public selectedOrganizations: Array<any> = [];

    public edit = false;
    loadingFromBackend = false;
    loadingParseMessages = false;
    loadingDownload = false;

    mapLat = 48.858093;
    mapLng = 2.294694;
    mapZoom = 2;

    // Notifications
    toast;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000,
            animation: 'fade'
        });

    public selectOrganizationsSettings = {
        singleSelection: false,
        text: 'Select organizations',
        selectAllText: 'Select all',
        unSelectAllText: 'Unselect all',
        enableSearchFilter: true,
        classes: 'select-organization'
    };

    api;
    id;

    constructor(private rt: RealtimeService,
                private userService: UserService,
                private organizationService: OrganizationService,
                private userApi: UserApi,
                private organizationApi: OrganizationApi,
                private parserApi: ParserApi,
                private appSettingApi: AppSettingApi,
                private deviceApi: DeviceApi,
                private elRef: ElementRef,
                private toasterService: ToasterService,
                @Inject(DOCUMENT) private document: any,
                private messageApi: MessageApi,
                private route: ActivatedRoute,
                private http: HttpClient) {
    }

    ngOnInit(): void {
        console.log('Device: ngOnInit');

        // Get the logged in user
        this.user = this.userService.getCurrentUser();

        // Get the user connectors
        this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
            this.connectors = connectors;
        });

        // Get app settings
        this.appSettingApi.findById('showDeviceSuccessRate').subscribe((appSetting: AppSetting) => {
            this.showDeviceSuccessRate = appSetting;
        });

        // Get the logged in user
        this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
            this.organization = this.organizationService.getCurrentOrganization();
            // Get and listen messages
            this.deviceIdSub = this.route.params.subscribe(params => {
                this.setup(params['id'].toUpperCase());
            });
        });
    }

    download(type: string) {
        this.loadingDownload = true;
        /*
        const url = 'https://api.' + this.document.location.hostname + '/api/Devices/download/' + this.device.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
        //const url = 'http://localhost:3000/api/Devices/download/' + this.device.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

        this.http.get(url, {responseType: 'blob'}).subscribe(res => {
            const blob: Blob = new Blob([res], {type: 'text/csv'});
            const today = moment().format('YYYY.MM.DD');
            const filename = today + '_' + this.device.id + '_export.csv';
            saveAs(blob, filename);
            this.loadingDownload = false;
        }, err => {
            console.log(err);
            if (this.toast)
                this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('error', 'Error', 'Server error');
            this.loadingDownload = false;
        });
        */
    }

    setup(deviceId: string): void {
        this.contentHeading = 'Loading device...';
        this.deviceReady = false;
        this.device = null;
        this.api = this.organization ? this.organizationApi : this.userApi;
        this.id = this.organization ? this.organization.id : this.user.id;
        this.unsubscribe();
        this.subscribe();

        const filter = {
            include: ['Parser', 'Category', 'Organizations', {
                relation: 'Messages',
                scope: {
                    limit: 1,
                    order: 'createdAt DESC',
                    include: [{
                        relation: 'Geolocs',
                        scope: {
                            order: 'createdAt DESC'
                        }
                    }]
                }
            }]
        };
        this.api.findByIdDevices(this.id, deviceId, filter).subscribe((device: Device) => {
            this.device = device;
            this.messageApi.stats('monthly', null, {deviceId: deviceId}, null).subscribe((stats: any) => {
                let statSum = 0;
                stats.forEach((stat: any) => {
                    statSum += stat.count;
                    this.messagesStats = this.messagesStats.concat(stat.count, ',');
                });
                this.messagesTotal = statSum;
                this.messagesAverage = (statSum / stats.length).toFixed();
                this.messagesStats = this.messagesStats.slice(0, -1);
                this.api.countMessages(this.id, {deviceId: deviceId}).subscribe((result: any) => {
                    this.countMessages = result.count;
                });
                this.contentHeading = this.organization ? 'Shared device ' + deviceId : 'Device ' + deviceId;
                this.deviceReady = true;
            });
        }, (err: any) => {
            /*if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toasterService.pop('error', 'Error', err.error);*/
            this.contentHeading = 'No device to see...';
            this.deviceReady = true;
        });
    }

    ngOnDestroy(): void {
        console.log('Devices: ngOnDestroy');
        this.cleanSetup();
    }

    cleanSetup() {
        if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
        if (this.deviceIdSub) this.deviceIdSub.unsubscribe();
        this.unsubscribe();
    }

    updateDevice(): void {
        this.edit = false;
        this.api.updateByIdDevices(this.id, this.device.id, this.device).subscribe(value => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'The device was successfully updated.');
        }, err => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
        });
    }

    updateDeviceCategory(): void {
        console.log(this.device.categoryId);
        if (this.device.categoryId) {
            this.api.findByIdCategories(this.id, this.device.categoryId).subscribe((category: Category) => {
                console.log(category);
                this.device.properties = category.properties;
            }, err => {
                if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('error', 'Error', 'Not allowed.');
            });
        }
    }

    showRetrievalModal(): void {
        this.confirmDBModal.show();
    }

    showParseModal(): void {
        this.confirmParseModal.show();
    }

    retrieveMessages(deviceId: string, limit: number, before: number): void {
        this.userApi.getConnectors(this.user.id, {where: {type: 'sigfox-api'}}).subscribe((connectors: Connector[]) => {
            if (connectors.length > 0) {
                this.loadingFromBackend = true;
                this.deviceApi.getMessagesFromSigfoxBackend(deviceId, null, before ? before : null, null).subscribe(result => {
                    console.log(result);
                    if (result.paging.next) {
                        const before = result.paging.next.substring(result.paging.next.indexOf('before=') + 7);
                        this.retrieveMessages(deviceId, null, before);
                    } else {
                        console.log('Finished process');
                        this.loadingFromBackend = false;
                        if (this.toast)
                            this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                        this.toast = this.toasterService.pop('success', 'Success', 'Retrieved messages from Sigfox Backend complete.');
                    }
                }, err => {
                    if (this.toast)
                        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                    this.toast = this.toasterService.pop('error', 'Error', err.message.message);
                    this.loadingFromBackend = false;
                });
                this.confirmDBModal.hide();
            } else {
                if (this.toast)
                    this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('warning', 'Warning', 'Please refer your Sigfox API credentials in the connectors page first.');
            }
        });
    }

    parseAllMessages(deviceId: string): void {
        this.loadingParseMessages = true;
        // Disconnect real-time to avoid app crashing
        this.parserApi.parseAllMessages(deviceId, null, null).subscribe(result => {
            this.loadingParseMessages = false;
            if (result.message === 'Success') {
                if (this.toast)
                    this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('success', 'Success', 'All the messages were successfully parsed.');
            } else {
                this.loadingParseMessages = false;
                if (this.toast)
                    this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('warning', 'Warning', result.message);
            }
        });
        this.confirmParseModal.hide();
    }

    showRemoveModal(device: Device) {
        swal({
            title: 'Are you sure?',
            text: 'Your will not be able to recover this device!',
            icon: 'warning',
            buttons: {
                cancel: {
                    text: 'No, cancel!',
                    value: null,
                    visible: true,
                    className: "",
                    closeModal: false
                },
                confirm: {
                    text: 'Yes, delete it!',
                    value: true,
                    visible: true,
                    className: "bg-danger",
                    closeModal: false
                }
            }
        }).then((isConfirm) => {
            if (isConfirm) {
                this.userApi.destroyByIdDevices(this.user.id, device.id).subscribe(value => {
                    swal('Deleted!', 'The device has been deleted.', 'success');
                }, err => {
                    swal('Oh no', 'An unattended error occurred.', 'error');
                });
            } else {
                swal('Cancelled', 'The device has not been deleted :)', 'error');
            }
        });
    }

    showShareDeviceWithOrganizationModal(): void {
        this.selectOrganizations = [];
        this.userApi.getOrganizations(this.user.id).subscribe((organizations: Organization[]) => {
            this.organizations = organizations;
            this.organizations.forEach(organization => {
                const item = {
                    id: organization.id,
                    itemName: organization.name
                };
                let addOrganization = true;
                this.device.Organizations.forEach(deviceOrganization => {
                    if (deviceOrganization.id === organization.id) {
                        addOrganization = false;
                        return;
                    }
                });
                if (addOrganization) {
                    this.selectOrganizations.push(item);
                }
            });
            this.shareDeviceWithOrganizationModal.show();
        });
    }

    shareDeviceWithOrganization(deviceId): void {
        this.selectedOrganizations.forEach(orga => {
            this.deviceApi.linkOrganizations(deviceId, orga.id).subscribe(results => {
                console.log(results);
                this.shareDeviceWithOrganizationModal.hide();
                this.organizationApi.findById(orga.id).subscribe((org: Organization) => {
                    this.device.Organizations.push(org);
                });
                // if(this.device.Organizations){
                //
                // }

            }, err => {
                if (this.toast)
                    this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('error', 'Error', err.error);
            });
        });
    }

    unshare(orga, device, index): void {
        this.deviceApi.unlinkOrganizations(device.id, orga.id).subscribe(results => {
            console.log(results);
            if (this.toast)
                this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'The device has been removed from ' + orga.name + '.');
            this.device.Organizations.splice(index, 1);
        }, err => {
            if (this.toast)
                this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('error', 'Error', err.message);
        });
    }

    rtHandler = (payload: any) => {
        const device = payload.content;
        /*if (device.userId == this.user.id || (this.organization && device.Organizations.map(x => x.id).includes(this.organization.id))) {
            if (payload.action == "CREATE") {
                this.device.unshift(payload.content);
            } else if (payload.action == "DELETE") {
                this.device = this.device.filter(function (device) {
                    return device.id !== payload.content.id;
                });
            } else if (payload.action == "UPDATE") {
                let idx = this.device.findIndex(x => x.id == payload.content.id);
                if (idx != -1) {
                    // keep geolocs, payload does not have geoloc inside message
                    if (this.device[idx].Messages[0]) {
                        const lastMsg = this.device[idx].Messages[0];
                        if (device && device.Messages[0] && device.Messages[0].id == lastMsg.id) {
                            device.Messages[0] = lastMsg;
                        }
                    }
                    this.device[idx] = payload.content;
                }
            }
        }*/
    };

    rtLastMessageHandler = (payload: any) => {
        /*if (payload.action == "CREATE" || payload.action == "UPDATE") {
            let idx = this.device.findIndex(x => x.id == payload.content.Device.id);
            if (idx != -1) {
                let updatedDevice = this.device[idx];
                updatedDevice.Messages = [payload.content];
                this.device[idx] = updatedDevice;
            }
        }*/
    };

    geolocHandler = (payload: any) => {
        /*if (payload.action == "CREATE") {
            for (let device of this.device) {
                let lastMsg = device.Messages[0];
                if (!lastMsg) continue;
                if (lastMsg.id == payload.content.messageId) {
                    lastMsg.Geolocs ? lastMsg.Geolocs.push(payload.content) : lastMsg.Geolocs = [payload.content];
                    return;
                }
            }
        }*/
    };

    subscribe(): void {
        this.rt.informCurrentPage(this.id, ['device', 'message', 'geoloc']);
        this.rtHandler = this.rt.addListener("device", this.rtHandler);
        this.rtLastMessageHandler = this.rt.addListener("message", this.rtLastMessageHandler);
        this.geolocHandler = this.rt.addListener("geoloc", this.geolocHandler);
    }

    unsubscribe(): void {
        this.rt.removeListener(this.rtHandler);
        this.rt.removeListener(this.rtLastMessageHandler);
        this.rt.removeListener(this.geolocHandler);
    }
}
