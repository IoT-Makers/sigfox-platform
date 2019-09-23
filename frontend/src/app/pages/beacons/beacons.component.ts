import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Beacon, Role, User } from '../../shared/sdk/models';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import * as L from 'leaflet';
import { icon, latLng, tileLayer } from 'leaflet';
import { BeaconApi, UserApi } from '../../shared/sdk/services/custom';
import { RealtimeService } from '../../shared/realtime/realtime.service';

@Component({
  selector: 'app-messages',
  templateUrl: './beacons.component.html',
  styleUrls: ['./beacons.component.scss']
})
export class BeaconsComponent implements OnInit, OnDestroy {
  private user: User;

  public filterQuery = '';

  @ViewChild('addOrEditBeaconModal') addOrEditBeaconModal: any;
  @ViewChild('confirmBeaconModal') confirmBeaconModal: any;

  public beacons: Beacon[] = [];
  public beaconsReady = false;

  public beaconToAddOrEdit: Beacon = new Beacon();
  public beaconToRemove: Beacon = new Beacon();

  public addBeaconFlag = false;

  // Notifications
  private toast: any;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  });

  // Map
  private map: L.Map;
  private marker: L.Marker;

  private locationOptions: L.CircleMarkerOptions = {
    color: '#5fcfd8',
    fillColor: ''
  };
  private blueIconOptions: L.IconOptions = {
    iconUrl: 'assets/img/markers/marker-icon.png',
    shadowUrl: 'assets/img/markers/marker-shadow.png',
    iconSize: [25, 41], // size of the icon
    iconAnchor: [13, 41], // point of the icon which will correspond to marker's location
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-2, -40] // point from which the popup should open relative to the iconAnchor
  };
  public mapOptions = {
    layers: [
      //tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap contributors' })
      tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 3,
    center: latLng(48.883619, 2.302494),
    fullscreenControl: true,
    trackResize: false
  };

  private api: any;
  private id: any;
  private admin = false;

  constructor(
    private rt: RealtimeService,
    private userApi: UserApi,
    private beaconApi: BeaconApi,
    toasterService: ToasterService
  ) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Beacons: ngOnInit');
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
      this.setup();
    });
  }

  setup(): void {
    this.cleanSetup();
    this.subscribe(this.user.id);

    const beacons = this.admin
      ? this.beaconApi.getBubbles()
      : this.userApi.getBeacons(this.user.id, {
          order: 'createdAt DESC',
          limit: 100
        });

    beacons.subscribe((beacons: Beacon[]) => {
      this.beacons = beacons;
      this.beaconsReady = true;
    });

    this.api = this.userApi;
    this.id = this.user.id;
    this.unsubscribe();
    this.subscribe(this.id);
  }

  /**
   * Initialize map and drawing
   */
  onMapReady(map: L.Map): void {
    this.map = map;
    this.map.options.layers[0] = tileLayer(
      'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© OpenStreetMap contributors'
      }
    );
    /*this.map.options.center = latLng(48.856614, 2.352222);
    this.map.options.trackResize = false;*/
    this.map.locate({ setView: true, maxZoom: 16 });
    this.map.on('locationfound', e => this.onLocationFound(e));
    this.map.on('locationerror', e => this.onLocationError(e));
    this.map.on('click', e => this.onMapClick(e));
    console.log('Map ready!');
  }

  onLocationFound(e): void {
    const radius = e.accuracy / 2;
    this.marker = L.marker(e.latlng, {
      draggable: true,
      icon: icon(this.blueIconOptions)
    });
    this.marker.on('dragend', e => this.onMarkerDragEnd(e));
    this.map.addLayer(this.marker);
    L.circle(e.latlng, radius, this.locationOptions).addTo(this.map);
    this.marker
      .bindPopup('You are within <b>' + radius + '</b> meters from this point')
      .openPopup();
  }

  onLocationError(e): void {
    console.log(e.message);
  }

  onMapClick(e) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(e.latlng, {
      draggable: true,
      icon: icon(this.blueIconOptions)
    });
    this.marker.on('dragend', e => this.onMarkerDragEnd(e));
    this.map.addLayer(this.marker);
    this.marker
      .bindPopup(e.latlng.lat.toFixed(5) + ', ' + e.latlng.lng.toFixed(5))
      .openPopup();
    this.beaconToAddOrEdit.location = e.latlng;
  }

  onMarkerDragEnd(e) {
    this.beaconToAddOrEdit.location = e.target._latlng;
  }

  openAddBeaconModal(): void {
    this.addBeaconFlag = true;
    // New beacon
    this.beaconToAddOrEdit = new Beacon();
    // Open modal
    this.addOrEditBeaconModal.show();
    setTimeout(() => {
      this.map.invalidateSize();
      this.map.setView([48.883619, 2.302494], 6);
    }, 500);
  }

  openEditBeaconModal(beacon: Beacon): void {
    this.addBeaconFlag = false;
    this.beaconToAddOrEdit = beacon;

    this.addOrEditBeaconModal.show();

    setTimeout(() => {
      this.map.invalidateSize();
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.map.setView(
        new L.LatLng(beacon.location.lat, beacon.location.lng),
        20
      );
      this.marker = L.marker(
        new L.LatLng(beacon.location.lat, beacon.location.lng),
        {
          draggable: true,
          icon: icon(this.blueIconOptions)
        }
      );
      this.marker.on('dragend', e => this.onMarkerDragEnd(e));
      this.map.addLayer(this.marker);
      if (beacon.info) this.marker.bindTooltip(beacon.info).openTooltip();
    }, 500);
  }

  openConfirmBeaconModal(beacon: Beacon): void {
    this.beaconToRemove = beacon;
    this.confirmBeaconModal.show();
  }

  removeBeacon(): void {
    const apiFn = this.admin
      ? this.beaconApi.deleteBubbleById(this.user.id, this.beaconToRemove.id)
      : this.userApi.destroyByIdBeacons(this.user.id, this.beaconToRemove.id);
    apiFn.subscribe(
      value => {
        if (this.toast)
          this.toasterService.clear(
            this.toast.toastId,
            this.toast.toastContainerId
          );
        this.toast = this.toasterService.pop(
          'success',
          'Success',
          'Beacon was successfully removed.'
        );
        this.confirmBeaconModal.hide();
      },
      err => {
        if (this.toast)
          this.toasterService.clear(
            this.toast.toastId,
            this.toast.toastContainerId
          );
        this.toast = this.toasterService.pop(
          'error',
          'Error',
          err.error.message
        );
      }
    );
  }

  editBeacon(): void {
    this.beaconToAddOrEdit.placeIds = this.beaconToAddOrEdit.placeIds
      .toString()
      .split(',');
    const apiFn = this.admin
      ? this.beaconApi.postBubbles(
          this.user.id,
          this.beaconToAddOrEdit.id,
          this.beaconToAddOrEdit.info,
          this.beaconToAddOrEdit.placeIds,
          this.beaconToAddOrEdit.txPower,
          this.beaconToAddOrEdit.location
        )
      : this.userApi.updateByIdBeacons(
          this.user.id,
          this.beaconToAddOrEdit.id,
          this.beaconToAddOrEdit
        );
    apiFn.subscribe(
      value => {
        if (this.toast)
          this.toasterService.clear(
            this.toast.toastId,
            this.toast.toastContainerId
          );
        this.toast = this.toasterService.pop(
          'success',
          'Success',
          'Beacon was successfully updated.'
        );
        this.addOrEditBeaconModal.hide();
      },
      err => {
        if (this.toast)
          this.toasterService.clear(
            this.toast.toastId,
            this.toast.toastContainerId
          );
        this.toast = this.toasterService.pop(
          'error',
          'Error',
          err.error.message
        );
      }
    );
  }

  addBeacon(): void {
    if (!this.beaconToAddOrEdit.id.match(/^[0-9a-fA-F]{1,5}$/)) {
      if (this.toast)
        this.toasterService.clear(
          this.toast.toastId,
          this.toast.toastContainerId
        );
      this.toast = this.toasterService.pop(
        'error',
        'Error',
        'Beacon id must be a 5 characters long hexadecimal string'
      );
      return;
    } else {
      this.beaconToAddOrEdit.placeIds = this.beaconToAddOrEdit.placeIds
        .toString()
        .split(',');
      const apiFn = this.admin
        ? this.beaconApi.postBubbles(
            this.user.id,
            this.beaconToAddOrEdit.id,
            this.beaconToAddOrEdit.info,
            this.beaconToAddOrEdit.placeIds,
            this.beaconToAddOrEdit.txPower,
            this.beaconToAddOrEdit.location
          )
        : this.userApi.createBeacons(this.user.id, this.beaconToAddOrEdit);
      apiFn.subscribe(
        (beacon: Beacon) => {
          if (this.toast)
            this.toasterService.clear(
              this.toast.toastId,
              this.toast.toastContainerId
            );
          this.toast = this.toasterService.pop(
            'success',
            'Success',
            'Beacon was successfully updated.'
          );
          this.addOrEditBeaconModal.hide();
        },
        err => {
          if (this.toast)
            this.toasterService.clear(
              this.toast.toastId,
              this.toast.toastContainerId
            );
          this.toast = this.toasterService.pop('error', 'Error', err.message);
        }
      );
    }
  }

  ngOnDestroy(): void {
    console.log('Beacons: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    this.unsubscribe();
  }

  rtHandler = (payload: any) => {
    if (payload.action == 'CREATE') {
      this.beacons.unshift(payload.content);
    } else if (payload.action == 'DELETE') {
      this.beacons = this.beacons.filter(function(beacon) {
        return beacon.id !== payload.content.id;
      });
    }
  };

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['beacon']);
    this.rtHandler = this.rt.addListener('beacon', this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }
}
