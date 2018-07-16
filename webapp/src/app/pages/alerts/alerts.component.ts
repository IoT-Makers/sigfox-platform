import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertApi, DeviceApi, UserApi} from '../../shared/sdk/services/custom';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {RealTime} from '../../shared/sdk/services';
import {Subscription} from 'rxjs/Subscription';
import {Alert, AlertGeofence, AlertValue, Connector, Device, FireLoopRef, Property, User} from '../../shared/sdk/models';
import * as L from 'leaflet';
import {icon, LatLng, latLng, tileLayer} from 'leaflet';
import '../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})

export class AlertsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('addOrEditAlertModal') addOrEditAlertModal: any;
  @ViewChild('confirmModal') confirmModal: any;
  @ViewChild('map') mapContainer;

  // Flags
  public alertsReady = false;

  // Map
  private map: L.Map;
  private drawnItems: L.FeatureGroup = new L.FeatureGroup();
  private locationOptions: L.CircleMarkerOptions = {
    color: '#5fcfd8',
    fillColor: ''
  };
  private circleOptions: L.CircleMarkerOptions = {
    color: '#2ad826',
    fillColor: '#5ae38b'
  };
  private polylineOptions: L.PolylineOptions = {
    color: '#2ad826',
    fillColor: '#5ae38b'
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
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© OpenStreetMap contributors' }),
      this.drawnItems
    ],
    zoom: 5,
    center: latLng(48.856614, 2.352222),
    fullscreenControl: true,
    trackResize: false
  };
  private drawOptions = {
    position: 'topright',
    draw: {
      marker: false,
      polyline: false,
      rectangle: false,
      circlemarker: false,
      polygon: {
        shapeOptions: {
          color: '#e2120b'
        }
      },
      circle: {
        shapeOptions: {
          color: '#e2120b'
        }
      }
    },
    edit: {
      featureGroup: this.drawnItems
    }
  };

  private alertSub: Subscription;

  public alerts: Alert[] = [];
  public addAlertFlag = false;
  private alertToAddOrEdit: Alert = new Alert();
  private alertToRemove: Alert = new Alert();

  private userRef: FireLoopRef<User>;
  private alertRef: FireLoopRef<Alert>;

  private dateOrigin: Date = new Date(0);

  // Select
  private selectDevices: Array<Object> = [];
  private selectedDevices = [];
  private selectOneDeviceSettings = {
    singleSelection: true,
    text: 'Select one device',
    enableSearchFilter: true,
    classes: 'select-one-device'
  };
  private selectConnectors: Array<Object> = [];
  private selectedConnectors = [];
  private selectConnectorsSettings = {
    singleSelection: true,
    text: 'Select connectors',
    enableSearchFilter: true,
    classes: 'select-connector'
  };
  private selectKeys: Array<Object> = [];
  private selectedKeys = [];
  private selectOneSettings = {
    singleSelection: true,
    text: 'Select one key',
    enableSearchFilter: false,
    classes: 'select-one'
  };

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private rt: RealTime,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private alertApi: AlertApi,
              private elRef: ElementRef,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  /**
   * Initialize map and drawing
   */
  onMapReady(map: L.Map): void {
    this.map = map;
    this.map.options.layers[0] = tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 21,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© OpenStreetMap contributors' });
    /*this.map.options.zoom = 5;
    this.map.options.center = latLng(48.856614, 2.352222);
    this.map.options.trackResize = false;*/
    this.map.locate({setView: true, maxZoom: 16});
    this.map.on('locationfound', (e) => this.onLocationFound(e));
    this.map.on('locationerror', (e) => this.onLocationError(e));
    this.map.on(L.Draw.Event.CREATED, (e) => this.onDrawCreated(e));
    this.map.on(L.Draw.Event.EDITED, () => this.onDrawEdited());
    this.map.on(L.Draw.Event.DELETED, () => this.onDrawDeleted());
    console.log('Map ready!');
  }

  loadMapGeofence(): void {
    this.drawnItems.clearLayers();
    if (this.alertToAddOrEdit.geofence) {
      this.alertToAddOrEdit.geofence.forEach((alertGeofence: AlertGeofence) => {
        if (alertGeofence.radius) {
          const circle = new L.Circle(new LatLng(alertGeofence.location[0].lat, alertGeofence.location[0].lng), alertGeofence.radius, this.circleOptions);
          this.drawnItems.addLayer(circle);
        } else {
          const polygon = new L.Polygon(alertGeofence.location, this.polylineOptions);
          this.drawnItems.addLayer(polygon);
        }
      });
      setTimeout(() => {
        if (this.alertToAddOrEdit.geofence.length > 0) {
          this.map.fitBounds(this.drawnItems.getBounds());
        }
      }, 500);
    }
    console.log('Map loaded!');
  }

  onLocationFound(e): void {
    const radius = e.accuracy / 2;
    const marker = L.marker(e.latlng, {icon: icon(this.blueIconOptions)}).addTo(this.map);
    L.circle(e.latlng, radius, this.locationOptions).addTo(this.map);
    marker.bindPopup('You are within <b>' + radius + '</b> meters from this point').openPopup();
  }

  onLocationError(e): void {
    console.log(e.message);
  }

  onDrawCreated(e): void {
    const type = e.layerType;
    const layer = e.layer;
    if (type === 'circle') {
      const alertGeofence = new AlertGeofence();
      alertGeofence.location[0] = layer.getLatLng();
      alertGeofence.radius =  layer.getRadius();
      alertGeofence.in = true;
      this.alertToAddOrEdit.geofence.push(alertGeofence);
      // Add circle to the map layer
      this.drawnItems.addLayer(layer);
    } else if (type === 'polygon') {
      const alertGeofence = new AlertGeofence();
      alertGeofence.location = layer.getLatLngs()[0];
      alertGeofence.in = true;
      this.alertToAddOrEdit.geofence.push(alertGeofence);
      // Add polygon to the map layer
      this.drawnItems.addLayer(layer);
    }
    console.log(this.alertToAddOrEdit.geofence);
  }

  onDrawEdited(): void {
    this.alertToAddOrEdit.geofence = [];
    this.drawnItems.eachLayer((layer: any) => {
      const alertGeofence = new AlertGeofence();
      if (layer instanceof L.Circle) {
        alertGeofence.location[0] = layer.getLatLng();
        alertGeofence.radius =  layer.getRadius();
        alertGeofence.in = true;
        this.alertToAddOrEdit.geofence.push(alertGeofence);
      } else if (layer instanceof L.Polygon) {
        layer = layer;
        alertGeofence.location = layer.getLatLngs()[0];
        alertGeofence.in = true;
        this.alertToAddOrEdit.geofence.push(alertGeofence);
      }
    });

    console.log(this.alertToAddOrEdit.geofence);
  }

  onDrawDeleted(): void {
    this.alertToAddOrEdit.geofence = [];
    this.drawnItems.eachLayer((layer: any) => {
      const alertGeofence = new AlertGeofence();
      if (layer instanceof L.Circle) {
        alertGeofence.location[0] = layer.getLatLng();
        alertGeofence.radius =  layer.getRadius();
        alertGeofence.in = true;
        this.alertToAddOrEdit.geofence.push(alertGeofence);
      } else if (layer instanceof L.Polygon) {
        layer = layer;
        alertGeofence.location = layer.getLatLngs()[0];
        alertGeofence.in = true;
        this.alertToAddOrEdit.geofence.push(alertGeofence);
      }
    });
    console.log(this.alertToAddOrEdit.geofence);
  }

  ngOnInit(): void {
    console.log('Alerts: ngOnInit');
    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();
    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());
    /*if (
      this.rt.connection.isConnected() &&
      this.rt.connection.authenticated
    ) {
      this.rt.onReady().subscribe(() => this.setup());
    } else {
      this.rt.onAuthenticated().subscribe(() => this.setup());
      this.rt.onReady().subscribe();
    }*/
  }

  setup(): void {
    this.cleanSetup();

    // Get and listen alerts
    this.userRef = this.rt.FireLoop.ref<User>(User).make(this.user);
    this.alertRef = this.userRef.child<Alert>('Alerts');
    this.alertSub = this.alertRef.on('change',
      {
        limit: 1000,
        order: 'triggeredAt DESC',
        include: ['Device', 'Connector']
      }
    ).subscribe((alerts: Alert[]) => {
      this.alerts = alerts;
      this.alertsReady = true;
    });

    // Devices
    this.userApi.getDevices(this.user.id).subscribe((devices: Device[]) => {
      devices.forEach((device: Device) => {
        const item = {
          id: device.id,
          itemName: device.name ? device.name + ' (' + device.id + ')' : device.id
        };
        this.selectDevices.push(item);
      });
    });
    // Connectors
    this.userApi.getConnectors(this.user.id).subscribe((connectors: Connector[]) => {
      connectors.forEach((connector: Connector) => {
        if (connector.type !== 'sigfox-api') {
          const item = {
            id: connector.id,
            itemName: connector.name + ' (' + connector.type + ')'
          };
          this.selectConnectors.push(item);
        }
      });
      if (connectors.length === 0) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('warning', 'Warning', 'Please create a connector in the "Connectors" page first.');
      }
    });
  }

  setAlertType(): void {
    if (this.alertToAddOrEdit.key.startsWith('geoloc_')) {
      delete this.alertToAddOrEdit.value;
      this.alertToAddOrEdit.geofence = [];
      // Load map
      this.loadMapGeofence();
    } else {
      delete this.alertToAddOrEdit.geofence;
      this.alertToAddOrEdit.value = new AlertValue();
    }
  }

  resetAlertFields(): void {
    this.alertToAddOrEdit.key = null;
    delete this.alertToAddOrEdit.value;
    delete this.alertToAddOrEdit.geofence;
  }

  openAddAlertModal(): void {
    // Set flag
    this.addAlertFlag = true;
    // Reset selects
    this.selectedDevices = [];
    this.selectedKeys = [];
    this.selectedConnectors = [];
    // New alert
    this.alertToAddOrEdit = new Alert();
    // Delete geofence array by default
    delete this.alertToAddOrEdit.geofence;
    // Open modal
    this.addOrEditAlertModal.show();
  }

  openEditAlertModal(alert: Alert): void {
    // Set flag
    this.addAlertFlag = false;
    this.alertToAddOrEdit = alert;
    // Load keys for this device
    this.loadKeys(alert.deviceId);
    // Set selected values
    this.selectedDevices = [{
      id: alert.deviceId,
      itemName: alert.Device.name ? alert.Device.name + ' (' + alert.Device.id + ')' : alert.Device.id
    }];
    this.selectedKeys = [{id: alert.key, itemName: alert.key}];

    // Check if connector has not been removed
    if (alert.Connector) {
      this.selectedConnectors = [{id: alert.Connector.id, itemName: alert.Connector.name + ' (' + alert.Connector.type + ')'}];
    }
    // Open modal
    this.addOrEditAlertModal.show();
    // Load map
    if (this.alertToAddOrEdit.geofence) {
      this.loadMapGeofence();
    }
  }

  openConfirmModal(alert: Alert): void {
    this.alertToRemove = alert;
    this.confirmModal.show();
  }

  setConnectors(): void {
    /**
     * TODO: implement multi connector (HasAndBelongsToMany relations?)
     */
    this.selectedConnectors.forEach((item: any) => {
      this.alertToAddOrEdit.connectorId = item.id;
      this.alertToAddOrEdit.connectorId = item.id;
    });
  }

  removeAlert(): void {
    this.alertRef.remove(this.alertToRemove).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully removed.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
    this.confirmModal.hide();
  }

  testAlert(alert: Alert): void {
    this.alertApi.test(alert.id).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully tested.');
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  editAlert(): void {
    this.alertRef.upsert(this.alertToAddOrEdit).subscribe(value => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully updated.');
      this.addOrEditAlertModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  addAlert(): void {
    this.alertRef.create(this.alertToAddOrEdit).subscribe((alert: Alert) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully created.');
      this.addOrEditAlertModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Please fill in the alert form.' + err.error.message);
    });
  }

  loadKeys(deviceId: string): void {
    // Reset the selected keys
    this.selectedKeys = [];
    // Reset the selectable keys
    this.selectKeys = [];
    // Fetch all the keys belonging to selected devices
    this.userApi.getDevices(this.user.id, {
      where: {id: deviceId},
      include: [
        {
          relation: 'Messages',
          scope: {
            limit: 1,
            order: 'createdAt DESC'
          }
        },
        {
          relation: 'Geolocs',
          scope: {
            where: {type: 'sigfox'},
            limit: 1,
            order: 'createdAt DESC'
          }
        }]
    }).subscribe((devices: Device[]) => {
      console.log(devices);
      // Store geoloc specific alert keys
      if (devices[0].Geolocs) {
        console.log(devices[0].Geolocs);
        const item = {
          id: 'geoloc_sigfox',
          itemName: 'Geoloc Sigfox'
        };
        this.selectKeys.push(item);
      }
      // Store data_parsed keys
      if (devices[0].Messages[0].data_parsed) {
        devices[0].Messages[0].data_parsed.forEach((p: Property) => {
          const item = {
            id: p.key,
            itemName: p.key
          };
          this.selectKeys.push(item);
          if (item.id === 'lat') {
            const item = {
              id: 'geoloc_gps',
              itemName: 'Geoloc GPS'
            };
            if (this.selectKeys.indexOf(item) === -1) {
              this.selectKeys.push(item);
              this.selectKeys.splice(1, 0, this.selectKeys.splice(this.selectKeys.indexOf(item), 1)[0]);
            }
          }
        });
      }
    });
  }

  setAlertActive(alert: Alert): void {
    this.alertRef.upsert(alert).subscribe((alert: Alert) => {
      if (alert.active) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully activated.');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('info', 'Success', 'Alert was successfully deactivated.');
      }
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  setAlertOneShot(alert: Alert): void {
    this.alertRef.upsert(alert).subscribe((alert: Alert) => {
      if (alert.one_shot) {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Alert was successfully set for one shot only.');
      } else {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('info', 'Success', 'Alert will always trigger.');
      }
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', err.error.message);
    });
  }

  ngOnDestroy(): void {
    console.log('Alerts: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    if (this.userRef) this.userRef.dispose();
    if (this.alertRef) this.alertRef.dispose();
    if (this.alertSub) this.alertSub.unsubscribe();
  }
}
