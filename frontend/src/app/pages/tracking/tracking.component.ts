import {Geoloc, Organization, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {AgmInfoWindow} from '@agm/core';
import {
  AppSettingApi,
  DeviceApi,
  MessageApi,
  OrganizationApi,
  ParserApi,
  UserApi
} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {Component, ElementRef, Inject, OnDestroy, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';
import {saveAs} from 'file-saver';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import * as d3 from "d3";

@Component({
  selector: 'app-devices',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChildren(AgmInfoWindow) agmInfoWindows: QueryList<AgmInfoWindow>;

  // Flags
  public geolocsReady = false;
  private deviceIdSub: any;

  public geolocs: Geoloc[];
  public geolocFilter;

  private isCircleVisible: boolean[] = [];

  private organizationRouteSub: Subscription;
  public organization: Organization;

  private mapLat = 48.858093;
  private mapLng = 2.294694;
  private mapZoom = 2;

  public isDefaultView = true;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  private api;
  private id;

  constructor(private rt: RealtimeService,
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
    console.log('Tracking: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

    // Check if organization view
    this.organizationRouteSub = this.route.parent.parent.params.subscribe(parentParams => {
      if (parentParams.id) {
        this.userApi.findByIdOrganizations(this.user.id, parentParams.id).subscribe((organization: Organization) => {
          this.organization = organization;
          this.setup();
        });
      } else {
        this.setup();
      }
    });
  }

  setup(): void {
    this.unsubscribe();
    this.subscribe();
    console.log('Setup Tracking');

    // Get and listen messages
    this.deviceIdSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.geolocFilter = {
          order: 'createdAt DESC',
          limit: 1,
          where: {deviceId: params['id']},
          include: ['Device', 'Beacon']
        };
      }
      this.api = this.organization ? this.organizationApi : this.userApi;
      this.id = this.organization ? this.organization.id : this.user.id;

      this.api.getGeolocs(this.user.id, this.geolocFilter).subscribe((geolocs: Geoloc[]) => {
        this.geolocs = geolocs;
        if (geolocs[0]) {
          this.mapLat = geolocs[0].location.lat;
          this.mapLng = geolocs[0].location.lng;
          this.mapZoom = 15;
        }
        this.geolocsReady = true;
      });
    });
  }

  ngOnDestroy(): void {
    console.log('Tracking: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.organizationRouteSub) this.organizationRouteSub.unsubscribe();
    if (this.deviceIdSub) this.deviceIdSub.unsubscribe();
    this.unsubscribe();
  }

  markerOut(i) {
    this.isCircleVisible[i] = false;
  }

  markerOver(i) {
    this.isCircleVisible[i] = true;
  }

  rtHandler = (payload: any) => {
    const geoloc = payload.content;
    // Set map
    this.mapLat = geoloc.location.lat;
    this.mapLng = geoloc.location.lng;
    this.mapZoom = 15;

    // D3
    if (geoloc.type === 'beacon') this.setBubbles(geoloc);

    if ((geoloc.userId && !this.organization) || geoloc.Organizations.map(x => x.id).includes(this.organization.id)) {
      if (payload.action == "CREATE") {
        this.geolocs.unshift(payload.content);
      } else if (payload.action == "DELETE") {
        this.geolocs = this.geolocs.filter(function (device) {
          return device.id !== payload.content.id;
        });
      } else if (payload.action == "UPDATE") {
        let idx = this.geolocs.findIndex(x => x.id == payload.content.id);
        if (idx != -1) {
          this.geolocs[idx] = payload.content;
        }
      }
    }
  };

  subscribe(): void {
    this.rtHandler = this.rt.addListener("geoloc", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }

  setBubbles(geoloc: Geoloc) {
    // Make an SVG Container
    const svg = d3.select("svg");
    // Draw the Circle
    const circle = svg.append("circle")
      .attr("class", "device")
      .attr("id", geoloc.id)
      .attr("cx", geoloc.location.lat)
      .attr("cy", geoloc.location.lng)
      .attr("r", 20);
  }

  setView() {
    this.isDefaultView = !this.isDefaultView;
    // If beacon view
    if (!this.isDefaultView) {
      // // Make an SVG Container
      // const svg = d3.select("svg");
      // // Draw the Circle
      // const circle = svg.append("circle-")
      //   .attr("cx", 30)
      //   .attr("cy", 30)
      //   .attr("r", 20);
    } else {
      // d3.select("svg").selectAll("*").remove();
    }
  }
}
