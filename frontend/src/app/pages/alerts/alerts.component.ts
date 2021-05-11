import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AlertApi, DeviceApi, UserApi} from '../../shared/sdk/services/custom';
import {ToastrConfig, ToastrService} from 'ngx-toastr';
import {Alert, AlertGeofence, AlertValue, Connector, Device, Property, User} from '../../shared/sdk/models';
import * as L from 'leaflet';
import {icon, LatLng, latLng, tileLayer} from 'leaflet';
import '../../../../node_modules/leaflet.fullscreen/Control.FullScreen.js';
import {RealtimeService} from "../../shared/realtime/realtime.service";

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
    iconSize: [25, 41], // size of the icon
    iconAnchor: [13, 41], // point of the icon which will correspond to marker's location
    shadowSize: [50, 64], // size of the shadow
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor: [-2, -40] // point from which the popup should open relative to the iconAnchor
  };
  private mapOptions = {
    layers: [
      tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 21,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        attribution: '© OpenStreetMap contributors'
      }),
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

  public alerts: Alert[] = [];
  public addAlertFlag = false;
  private alertToAddOrEdit: Alert = new Alert();
  private alertToRemove: Alert = new Alert();

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
  private geofenceDirectionOptions = [
    {"id": "enter", "itemName": "enter"},
    {"id": "exit", "itemName": "exit"}];
  private geofenceDirections = [];

  // Notifications
  private toast;
  private toasterService: ToastrService;
  public toasterconfig: {
    tapToDismiss: true,
    timeout: 5000,
    animation: 'fade'
  };

  constructor(private rt: RealtimeService,
              private userApi: UserApi,
              private deviceApi: DeviceApi,
              private alertApi: AlertApi,
              private elRef: ElementRef,
              toasterService: ToastrService) {
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
      attribution: '© OpenStreetMap contributors'
    });
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
      alertGeofence.radius = layer.getRadius();
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
        alertGeofence.radius = layer.getRadius();
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
        alertGeofence.radius = layer.getRadius();
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
    this.setup();
  }

  setup(): void {
    this.unsubscribe();
    this.subscribe(this.user.id);

    // Get and listen alerts
    this.userApi.getAlerts(this.user.id, {
      limit: 1000,
      order: 'triggeredAt DESC',
      include: ['Device', 'Connector']
    }).subscribe((alerts: Alert[]) => {
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
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.warning('Warning', 'Please create a connector in the "Connectors" page first.', this.toasterconfig);
      }
    });
  }

  setAlertType(): void {
    if (this.alertToAddOrEdit.key.startsWith('geoloc')) {
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
    this.geofenceDirections = JSON.parse(JSON.stringify(this.geofenceDirectionOptions));
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
      this.selectedConnectors = [{
        id: alert.Connector.id,
        itemName: alert.Connector.name + ' (' + alert.Connector.type + ')'
      }];
    }
    // Open modal
    this.addOrEditAlertModal.show();
    // Load map
    if (this.alertToAddOrEdit.geofence) {
      this.loadMapGeofence();
      this.geofenceDirections = [];
      alert.geofence[0].directions.forEach((direction => {
        this.geofenceDirections.push({id: direction, itemName: direction});
      }));
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
    this.userApi.destroyByIdAlerts(this.user.id, this.alertToRemove.id).subscribe(value => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Alert was successfully removed.', this.toasterconfig);
    }, err => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
    });
    this.confirmModal.hide();
  }

  testAlert(alert: Alert): void {
    this.alertApi.test(alert.id).subscribe(value => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Alert was successfully tested.', this.toasterconfig);
    }, err => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
    });
  }

  editAlert(alert?: Alert, key?: string): void {
    if (!alert) {
      alert = this.alertToAddOrEdit;
    }
    if (this.alertToAddOrEdit.key === 'geoloc') {
      if (!this.alertToAddOrEdit.geofence.length) {
        this.toast = this.toasterService.error('Missing geofence', 'Please add at least one geofence', this.toasterconfig);
        return;
      }
      this.setGeofenceDirections();
    }
    this.userApi.updateByIdAlerts(this.user.id, alert.id, alert).subscribe(value => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      switch (key) {
        case 'active':
          if (alert.active) {
            this.toast = this.toasterService.success('Success', 'Alert was successfully activated.', this.toasterconfig);
          } else {
            this.toast = this.toasterService.info('Success', 'Alert was successfully deactivated.');
          }
          break;
        case 'oneshot':
          if (alert.one_shot) {
            this.toast = this.toasterService.success('Success', 'Alert was successfully set for one shot only.', this.toasterconfig);
          } else {
            this.toast = this.toasterService.info('Success', 'Alert will always trigger.');
          }
          break;
        default:
          this.toast = this.toasterService.success('Success', 'Alert was successfully updated.', this.toasterconfig);
          this.addOrEditAlertModal.hide();
          break;
      }
    }, err => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', err.error.message, this.toasterconfig);
    });
  }


  // TODO: use validator to enforce at least one geofence
  addAlert(): void {
    if (this.alertToAddOrEdit.key === 'geoloc') {
      if (!this.alertToAddOrEdit.geofence.length) {
        this.toast = this.toasterService.error('Missing geofence', 'Please add at least one geofence');
        return;
      }
      this.setGeofenceDirections();
    }
    this.userApi.createAlerts(this.user.id, this.alertToAddOrEdit).subscribe((alert: Alert) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId);
      this.toast = this.toasterService.success('Success', 'Alert was successfully created.', this.toasterconfig);
      this.addOrEditAlertModal.hide();
    }, err => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId);
      this.toast = this.toasterService.error('Error', 'Please fill in the alert form.' + err.error.message, this.toasterconfig);
    });
  }

  setGeofenceDirections(): void {
    this.alertToAddOrEdit.geofence.forEach((gf: any) => {
      gf.directions = this.geofenceDirections.map((o: any) => {
        return o.itemName;
      });
      return gf;
    });
    console.log(this.alertToAddOrEdit);
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
            limit: 1,
            order: 'createdAt DESC'
          }
        }]
    }).subscribe((devices: Device[]) => {
      // Store geoloc specific alert keys
      if (devices[0].Geolocs) {
        const item = {
          id: 'geoloc',
          itemName: 'Geoloc'
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
        });
      }
    });
  }


  ngOnDestroy(): void {
    console.log('Alerts: ngOnDestroy');
    this.cleanSetup();
  }

  private cleanSetup() {
    this.unsubscribe();
  }

  rtHandler = (payload: any) => {
    if (payload.action == "CREATE") {
      this.alerts.unshift(payload.content);
    } else if (payload.action == "DELETE") {
      this.alerts = this.alerts.filter(function (obj) {
        return obj.id !== payload.content.id;
      });
    }
  };

  subscribe(id: string): void {
    this.rt.informCurrentPage(id, ['alert']);
    this.rtHandler = this.rt.addListener("alert", this.rtHandler);
  }

  unsubscribe(): void {
    this.rt.removeListener(this.rtHandler);
  }
}
