import {AppSetting, Category, Connector, Device, Geoloc, Organization, Parser, User} from '../../../shared/sdk/models';
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
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit, OnDestroy {

    user: User;

    public filterQuery = '';

    public organization: Organization;
    organizations: Organization[] = [];

    @ViewChildren(AgmInfoWindow) agmInfoWindow: QueryList<AgmInfoWindow>;
    @ViewChild('confirmModal') confirmModal: any;
    @ViewChild('confirmDBModal') confirmDBModal: any;
    @ViewChild('confirmParseModal') confirmParseModal: any;
    @ViewChild('shareDeviceWithOrganizationModal') shareDeviceWithOrganizationModal: any;

    // Flags
    public devicesReady = false;

    isCircleVisible: boolean[] = [];

    connectors: Connector[] = [];

    showDeviceSuccessRate: AppSetting;

    organizationRouteSub: Subscription;

    categories: Category[] = [];
    public devices: Device[] = [];
    parsers: Parser[] = [];

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
    toasterService: ToasterService;
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

    // Pagination
    public numberOfDevicesToSee = 10;
    pageOfDevicesToSee = 0;

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
                toasterService: ToasterService,
                @Inject(DOCUMENT) private document: any,
                private messageApi: MessageApi,
                private route: ActivatedRoute,
                private http: HttpClient) {
        this.toasterService = toasterService;
    }

    ngOnInit(): void {
        console.log('Devices: ngOnInit');
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

        // Hide all circles by default
        this.setCircles();

        // Get the logged in user
        this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
            this.organization = this.organizationService.getCurrentOrganization();
            this.setup();
        });
    }

    download(type: string) {
        this.loadingDownload = true;
        /*
        const url = 'https://api.' + this.document.location.hostname + '/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;
        //const url = 'http://localhost:3000/api/Devices/download/' + this.deviceToEdit.id + '/' + type + '?access_token=' + this.userApi.getCurrentToken().id;

        this.http.get(url, {responseType: 'blob'}).subscribe(res => {
            const blob: Blob = new Blob([res], {type: 'text/csv'});
            const today = moment().format('YYYY.MM.DD');
            const filename = today + '_' + this.deviceToEdit.id + '_export.csv';
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

    setCircles() {
        for (let i = 0; i < this.devices.length; i++) {
            this.isCircleVisible.push(false);
        }
    }

    markerOut(i) {
        this.isCircleVisible[i] = false;
    }

    markerOver(i) {
        this.isCircleVisible[i] = true;
    }

    setup(): void {
        this.api = this.organization ? this.organizationApi : this.userApi;
        this.id = this.organization ? this.organization.id : this.user.id;
        this.unsubscribe();
        this.subscribe();

        const filter = {
            where: {},
            limit: 1000,
            order: 'messagedAt DESC',
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
        this.api.getDevices(this.id, filter).subscribe((devices: Device[]) => {
            this.devices = devices;
            this.devicesReady = true;
        });
    }

    ngOnDestroy(): void {
        console.log('Devices: ngOnDestroy');
        this.cleanSetup();
    }

    cleanSetup() {
        if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
        this.unsubscribe();
    }

    zoomOnDevice(geoloc: Geoloc): void {
        window.scrollTo(0, 0);
        this.agmInfoWindow.forEach((child) => {
            // console.log(child['_el'].nativeElement.id);
            if (child['_el'].nativeElement.id === geoloc.id)
                child.open();
            else
                child.close();
        });

        this.mapLat = geoloc.location.lat;
        this.mapLng = geoloc.location.lng;
        this.mapZoom = 12;
    }

    cancel(): void {
        this.edit = false;
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

    rtHandler = (payload: any) => {
        const device = payload.content;
        if (device.userId == this.user.id || (this.organization && device.Organizations.map(x => x.id).includes(this.organization.id))) {
            if (payload.action == "CREATE") {
                this.devices.unshift(payload.content);
            } else if (payload.action == "DELETE") {
                this.devices = this.devices.filter(function (device) {
                    return device.id !== payload.content.id;
                });
            } else if (payload.action == "UPDATE") {
                let idx = this.devices.findIndex(x => x.id == payload.content.id);
                if (idx != -1) {
                    // keep geolocs, payload does not have geoloc inside message
                    if (this.devices[idx].Messages[0]) {
                        const lastMsg = this.devices[idx].Messages[0];
                        if (device && device.Messages[0] && device.Messages[0].id == lastMsg.id) {
                            device.Messages[0] = lastMsg;
                        }
                    }
                    this.devices[idx] = payload.content;
                }
            }
        }
    };

    rtLastMessageHandler = (payload: any) => {
        if (payload.action == "CREATE" || payload.action == "UPDATE") {
            let idx = this.devices.findIndex(x => x.id == payload.content.Device.id);
            if (idx != -1) {
                let updatedDevice = this.devices[idx];
                updatedDevice.Messages = [payload.content];
                this.devices[idx] = updatedDevice;
            }
        }
    };

    geolocHandler = (payload: any) => {
        if (payload.action == "CREATE") {
            for (let device of this.devices) {
                let lastMsg = device.Messages[0];
                if (!lastMsg) continue;
                if (lastMsg.id == payload.content.messageId) {
                    lastMsg.Geolocs ? lastMsg.Geolocs.push(payload.content) : lastMsg.Geolocs = [payload.content];
                    return;
                }
            }
        }
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
