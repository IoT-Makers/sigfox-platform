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
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import * as d3 from "d3";
import * as d3Geo from "d3-geo";

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

  // D3
  private d3Circles: any;
  private projection;

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
              private route: ActivatedRoute) {
    this.toasterService = toasterService;
    this.projection = d3Geo.geoMercator();
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
          limit: 2,
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
          this.setBubbles(this.geolocs[0]);
          this.setBubbles(this.geolocs[1]);
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
    const svg = d3.select("#tag");

    // Set zoom
    const w = document.getElementById("tag").clientWidth;
    const h = document.getElementById("tag").clientHeight;
    this.projection
      .translate([w / 2, h / 2]);

    // Make circles
    this.d3Circles = svg.selectAll("circle");
    // this.d3Circles
    //   .exit()
    //   .remove();
    this.d3Circles
      .data([geoloc], (g: Geoloc) => {
        return g.id;
      })
      .enter()
      .append("circle")
      .attr("id", (g: Geoloc) => {
        return g.id;
      })
      .attr("transform", (g: Geoloc) => {
        return "translate(" + this.projection([g.location.lng, g.location.lat]) + ")scale(1)";
      })
      // .attr("cx", 6371 * Math.cos(geoloc.location.lat) * Math.cos(geoloc.location.lat))
      // .attr("cy", 6371 * Math.cos(geoloc.location.lng) * Math.sin(geoloc.location.lng))
      .attr("r", (g: Geoloc) => {
        return g.accuracy / 1;
      })
      .style("fill", (g: Geoloc) => {
        if (g.accuracy === 10) return "#ebebeb";
        else if (g.accuracy === 8) return "#926ce1";
        else if (g.accuracy < 8) return "#63e185";
      })
      .style("stroke", (g: Geoloc) => {
        // if (g.beaconId === '')
        return '#4665e1';
      })
      .style("stroke-width", (g: Geoloc) => {
        return '1.3px';
      })
      .style("fill-opacity", (g: Geoloc) => {
        return 0.5;
      })
      .transition()
      .duration(1000);

    const text = svg
      .selectAll("text")
      .data([geoloc], (g: Geoloc) => {
        return g.id;
      })
      .enter()
      .append("text")
      .attr("transform", (g: Geoloc) => {
        return "translate(" + this.projection([g.location.lng, g.location.lat]) + ")scale(1)";
      })
      .style("text-anchor", "middle")
      .style("font-weight", "bold")
      .attr("font-family", "sans-serif")
      .style("font-size", (g: Geoloc) => {
        return g.accuracy / ((g.accuracy * 10) / 100);
      })
      .attr("dy", (g: Geoloc) => {
        // return g.accuracy / ((g.accuracy * 25) / 100);
        return -15;
      })
      .text((g: Geoloc) => {
        return g.beaconId;
      })
  }

  setView() {
    this.isDefaultView = !this.isDefaultView;
  }
}
