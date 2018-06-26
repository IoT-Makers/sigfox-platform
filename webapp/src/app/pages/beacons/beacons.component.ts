import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Beacon, FireLoopRef, User} from '../../shared/sdk/models';
import {RealTime} from '../../shared/sdk/services/core';
import {Subscription} from 'rxjs/Subscription';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import * as L from 'leaflet';
import {icon, latLng, tileLayer} from 'leaflet';

@Component({
  selector: 'app-messages',
  templateUrl: './beacons.component.html'
})
export class BeaconsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('addOrEditBeaconModal') addOrEditBeaconModal: any;
  @ViewChild('confirmBeaconModal') confirmBeaconModal: any;

  private userRef: FireLoopRef<User>;

  private beaconSub: Subscription;
  private beaconRef: FireLoopRef<Beacon>;

  public beacons: Beacon[] = [];
  public beaconsReady = false;

  public beaconToAddOrEdit: Beacon = new Beacon();
  public beaconToRemove: Beacon = new Beacon();

  public addBeaconFlag = false;

  // Select
  public selectTypes: Array<Object> = [
    {id: 'sigfox', itemName: 'Sigfox'},
    {id: 'bluetooth', itemName: 'Bluetooth'},
  ];
  public selectedTypes = [];
  public selectOneSettings = {
    singleSelection: true,
    text: 'Select one type',
    enableSearchFilter: false,
    classes: 'select-one'
  };

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
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
    iconSize:     [25, 41], // size of the icon
    iconAnchor:   [13, 41], // point of the icon which will correspond to marker's location
    shadowSize:   [50, 64], // size of the shadow
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-2, -40] // point from which the popup should open relative to the iconAnchor
  };
  private mapOptions = {
    layers: [
      //tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '© OpenStreetMap contributors' })
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      })
    ],
    zoom: 5,
    center: latLng(48.856614, 2.352222),
    fullscreenControl: true,
    trackResize: false
  };

  constructor(private rt: RealTime,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Beacons: ngOnInit');

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
  }

  setup(): void {
    this.cleanSetup();

    // Get and listen beacons
    this.beaconRef = this.rt.FireLoop.ref<Beacon>(Beacon);
    this.beaconSub = this.beaconRef.on('change',
      {
        limit: 1000,
        order: 'updatedAt DESC'
      }
    ).subscribe((beacons: Beacon[]) => {
      this.beacons = beacons;
      this.beaconsReady = true;
    });
  }

  /**
   * Initialize map and drawing
   */
  onMapReady(map: L.Map): void {
    this.map = map;
    //this.map.options.layers[0] = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', { maxZoom: 21, attribution: '...' });
    /*this.map.options.zoom = 5;
    this.map.options.center = latLng(48.856614, 2.352222);
    this.map.options.trackResize = false;*/
    this.map.locate({setView: true, maxZoom: 16});
    this.map.on('locationfound', (e) => this.onLocationFound(e));
    this.map.on('locationerror', (e) => this.onLocationError(e));
    this.map.on('click', (e) => this.onMapClick(e));
    console.log('Map ready!');
  }

  onLocationFound(e): void {
    const radius = e.accuracy / 2;
    this.marker = L.marker(e.latlng, {icon: icon(this.blueIconOptions)}).addTo(this.map);
    L.circle(e.latlng, radius, this.locationOptions).addTo(this.map);
    this.marker.bindPopup('You are within <b>' + radius + '</b> meters from this point').openPopup();
  }

  onLocationError(e): void {
    console.log(e.message);
  }

  onMapClick(e) {
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(e.latlng, {icon: icon(this.blueIconOptions)}).addTo(this.map);
    this.marker.bindPopup('Beacon position - ' + this.beaconToAddOrEdit.id).openPopup();
    this.beaconToAddOrEdit.location = e.latlng;
  }

  openAddBeaconModal(): void {
    this.addBeaconFlag = true;
    // Reset selects
    this.selectedTypes = [];
    // New beacon
    this.beaconToAddOrEdit = new Beacon();
    // Open modal
    this.addOrEditBeaconModal.show();
  }

  openEditBeaconModal(beacon: Beacon): void {
    this.addBeaconFlag = false;
    this.beaconToAddOrEdit = beacon;
    // Set selected values
    this.selectTypes.forEach((type: any) => {
      if (beacon.type === type.id) {
        this.selectedTypes = [{
          id: type.id,
          itemName: type.itemName
        }];
        return;
      }
    });
    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    this.marker = L.marker(new L.LatLng(beacon.location.lat, beacon.location.lng), {icon: icon(this.blueIconOptions)}).addTo(this.map);
    this.marker.bindPopup('Beacon position - ' + this.beaconToAddOrEdit.id).openPopup();

    this.addOrEditBeaconModal.show();
  }

  openConfirmBeaconModal(beacon: Beacon): void {
    this.beaconToRemove = beacon;
    this.confirmBeaconModal.show();
  }

  removeBeacon(): void {
    this.beaconRef.remove(this.beaconToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Beacon was successfully removed.');
      this.confirmBeaconModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  editBeacon(): void {
    this.beaconRef.upsert(this.beaconToAddOrEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Beacon was successfully updated.');
      this.addOrEditBeaconModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  addBeacon(): void {
    this.beaconRef.create(this.beaconToAddOrEdit).subscribe((beacon: Beacon) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Beacon was successfully updated.');
      this.addOrEditBeaconModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  ngOnDestroy(): void {
    console.log('Beacons: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.userRef) this.userRef.dispose();
    if (this.beaconRef) this.beaconRef.dispose();
    if (this.beaconSub) this.beaconSub.unsubscribe();
  }



}

