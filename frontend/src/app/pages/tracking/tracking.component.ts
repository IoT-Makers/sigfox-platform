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

// import * as geoJson from './FRA.geo.json';

@Component({
  selector: 'app-tracking',
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
  private mapZoom = 10;
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
  private deviceId;

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
      this.deviceId = params['id'];
      if (this.deviceId) {
        this.geolocFilter = {
          order: 'createdAt DESC',
          limit: 1,
          where: {deviceId: this.deviceId},
          include: ['Device', 'Beacon']
        };
      }
      this.api = this.organization ? this.organizationApi : this.userApi;
      this.id = this.organization ? this.organization.id : this.user.id;
      this.api.getGeolocs(this.id, this.geolocFilter).subscribe((geolocs: Geoloc[]) => {
        this.geolocs = geolocs;
        // Set map
        this.mapLat = geolocs[0].location.lat;
        this.mapLng = geolocs[0].location.lng;
        /*if (geolocs[0]) {
          this.mapLat = geolocs[0].location.lat;
          this.mapLng = geolocs[0].location.lng;
          this.mapZoom = 15;
          this.setBubbles(this.geolocs[0]);
          // this.geolocs[1].location.lng = -75;
          this.setBubbles(this.geolocs[1]);
        }*/
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
    // if (geoloc.type === 'beacon') this.setBubbles(geoloc);

    if ((geoloc.userId && !this.organization) || geoloc.Organizations.map(x => x.id).includes(this.organization.id)) {
      if (payload.content.deviceId === this.deviceId) {
        if (payload.action == "CREATE") {
          this.geolocs.push(payload.content);
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
    }
  };

  subscribe(): void {
    this.rtHandler = this.rt.addListener("geoloc", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }

  setBubbles(geoloc: Geoloc) {
    // Create a unit projection.
    const projection = d3Geo.geoMercator();
    // Create a path generator.
    const path = d3Geo.geoPath().projection(projection);
    // Make an SVG Container
    const svg = d3.select("#tag");

    // Set zoom
    // const w = document.getElementById("tag").clientWidth;
    // const h = document.getElementById("tag").clientHeight;
    // const offset = [w / 2, h / 2];
    // const scale = 150000;
    // const center = d3Geo.geoCentroid(geoJson);
    // projection.scale(scale).translate(offset);


    // // Compute the bounds of a feature of interest, then derive scale & translate.
    // const b = path.bounds(geoJson),
    //   s = .95 / Math.max((b[1][0] - b[0][0]) / w, (b[1][1] - b[0][1]) / h),
    //   t = [(w - s * (b[1][0] + b[0][0])) / 2, (h - s * (b[1][1] + b[0][1])) / 2];
    // // Update the projection to use computed scale & translate.
    // projection.scale(s).translate(t);

    // Make country
    // svg.selectAll("path").data(geoJson.features).enter().append("path")
    //   .attr("d", path)
    //   .style("fill", "#89c0eb")
    //   .style("fill-opacity", "0.5")
    //   .style("stroke-width", "1")
    //   .style("stroke", "black");


    // // Zoom and pan
    // const zoom = d3.zoom()
    //   .scaleExtent([0.1, 10]) //zoom limit
    //   .on('zoom', () => {
    //     svg.style('stroke-width', `${1.5 / d3.event.transform.k}px`);
    //     svg.attr('transform', d3.event.transform) // updated for d3 v4
    //   });
    // svg.call(zoom)
    //   .append('svg:g')
    //   .attr('transform', 'translate(100,50) scale(.5,.5)');

    // Make circles
    const d3Circles = svg.selectAll("circles.points");
    d3Circles
      .data([geoloc], (g: Geoloc) => {
        return g.id;
      })
      .enter()
      .append("circle")
      .attr("id", (g: Geoloc) => {
        return g.id;
      })
      .attr("transform", (g: Geoloc) => {
        return "translate(" + projection([g.location.lng, g.location.lat]) + ")scale(1)";
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
        return "translate(" + projection([g.location.lng, g.location.lat]) + ")scale(1)";
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
