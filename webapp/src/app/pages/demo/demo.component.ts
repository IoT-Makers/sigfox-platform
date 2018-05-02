import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {icon, latLng, tileLayer} from 'leaflet';
import {FireLoopRef, Message, Property, User} from '../../shared/sdk/models';
import {Subscription} from 'rxjs/Subscription';
import {UserApi} from '../../shared/sdk/services/custom';
import {RealTime} from '../../shared/sdk/services';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  @ViewChild('map') mapContainer;

  private filterQuery = '';

  private user: User;

  private messageSub: Subscription;
  private messages: Message[] = [];
  private messageRef: FireLoopRef<Message>;

  // Map
  private map: L.Map;

  // Feature groups
  private floor_1_N: L.LayerGroup = new L.LayerGroup();
  private floor_1_S: L.LayerGroup = new L.LayerGroup();
  private floor_2: L.LayerGroup = new L.LayerGroup();
  private floor_3: L.LayerGroup = new L.LayerGroup();
  private floor_4: L.LayerGroup = new L.LayerGroup();

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
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 22, maxNativeZoom: 19, attribution: '...' }),
    ],
    zoom: 20,
    center: latLng(43.543653, 1.511230),
    fullscreenControl: true,
    trackResize: false
  };

  private layersControl = {
    overlays: {
      'Etage 1 Nord': this.floor_1_N,
      'Etage 1 Sud': this.floor_1_S,
      'Etage 2': this.floor_2,
      'Etage 3': this.floor_3,
      'Etage 4': this.floor_4,
    }
  };

  private floor_1_1: any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            1.5109768509864807,
            43.54365087382579
          ],
          [
            1.5108749270439148,
            43.54356727323242
          ],
          [
            1.510995626449585,
            43.543495337745306
          ],
          [
            1.5110975503921509,
            43.54358088263924
          ],
          [
            1.5109768509864807,
            43.54365087382579
          ]
        ]
      ]
    }
  };

  private floor_1_2: any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            1.5111565589904767,
            43.54385890270618
          ],
          [
            1.5110519528388977,
            43.543771414012156
          ],
          [
            1.5111941099166852,
            43.54368392519119
          ],
          [
            1.5112370252609235,
            43.54372280912731
          ],
          [
            1.5111726522445663,
            43.54375974884335
          ],
          [
            1.511228978633879,
            43.543814186278425
          ],
          [
            1.5111565589904767,
            43.54385890270618
          ]
        ]
      ]
    }
  };

  private floor_2_1: any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            1.511094868183136,
            43.5438938981482
          ],
          [
            1.510995626449585,
            43.54380835369845
          ],
          [
            1.5111994743347166,
            43.54368392519119
          ],
          [
            1.5113013982772827,
            43.543771414012156
          ],
          [
            1.511094868183136,
            43.5438938981482
          ]
        ]
      ]
    }
  };

  private floor_3_1: any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            1.511094868183136,
            43.5438938981482
          ],
          [
            1.510995626449585,
            43.54380835369845
          ],
          [
            1.5111994743347166,
            43.54368392519119
          ],
          [
            1.5113013982772827,
            43.543771414012156
          ],
          [
            1.511094868183136,
            43.5438938981482
          ]
        ]
      ]
    }
  };

  private floor_4_1: any = {
    'type': 'Feature',
    'geometry': {
      'type': 'Polygon',
      'coordinates': [
        [
          [
            1.5111753344535828,
            43.543845293362104
          ],
          [
            1.511070728302002,
            43.543755860453274
          ],
          [
            1.5112799406051636,
            43.54363143183767
          ],
          [
            1.5113818645477295,
            43.543720864931096
          ],
          [
            1.5111753344535828,
            43.543845293362104
          ]
        ]
      ]
    }
  };

  constructor(private rt: RealTime,
              private userApi: UserApi) {
  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');

    this.loadMapElements();

    // Get the logged in User object
    this.user = this.userApi.getCachedCurrent();

  }

  setup(): void {
// Get and listen devices
    this.messageRef = this.rt.FireLoop.ref<Message>(Message);
    this.messageSub = this.messageRef.on('change',
      {
        limit: 1,
        order: 'createdAt DESC',
        where: {
          deviceId: '210CDD',
          userId: this.user.id
        }
      }
    ).subscribe((messages: Message[]) => {
      this.map.removeLayer(this.floor_1_N);
      this.map.removeLayer(this.floor_1_S);
      this.map.removeLayer(this.floor_2);
      this.map.removeLayer(this.floor_3);
      this.map.removeLayer(this.floor_4);

      this.messages = messages;
      this.messages[0].data_parsed.forEach((p: Property) => {
        if (p.key === 'beaconId') {
          if (p.value === 1) {
            this.floor_1_S.addTo(this.map);
          } else if (p.value === 2) {
            this.floor_2.addTo(this.map);
          } else if (p.value === 3) {
            this.floor_3.addTo(this.map);
          } else if (p.value === 4) {
            this.floor_4.addTo(this.map);
          }
        }
      });
      console.log(this.messages);
    });
  }

  loadMapElements() {
    this.floor_1_1 = L.geoJSON(this.floor_1_1).setStyle({
      'color': '#000000',
      'weight': 3,
      'fillColor': '#58dcd6',
      'fillOpacity': 0.5
    }).bindPopup('Etage 1');
    this.floor_1_N.addLayer(this.floor_1_1);

    this.floor_1_2 = L.geoJSON(this.floor_1_2).setStyle({
      'color': '#000000',
      'weight': 3,
      'fillColor': '#e7e35a',
      'fillOpacity': 0.5
    }).bindPopup('Etage 2');
    this.floor_1_S.addLayer(this.floor_1_2);

    this.floor_2_1 = L.geoJSON(this.floor_2_1).setStyle({
      'color': '#000000',
      'weight': 3,
      'fillColor': '#9f29a9',
      'fillOpacity': 0.5
    }).bindPopup('Etage 2');
    this.floor_2.addLayer(this.floor_2_1);

    this.floor_3_1 = L.geoJSON(this.floor_3_1).setStyle({
      'color': '#000000',
      'weight': 3,
      'fillColor': '#4272ca',
      'fillOpacity': 0.5
    }).bindPopup('Etage 3');
    this.floor_3.addLayer(this.floor_3_1);

    this.floor_4_1 = L.geoJSON(this.floor_4_1).setStyle({
      'color': '#000000',
      'weight': 3,
      'fillColor': '#31af23',
      'fillOpacity': 0.5
    }).bindPopup('Etage 4');
    this.floor_4.addLayer(this.floor_4_1);
  }

  /**
   * Initialize map and drawing
   */
  onMapReady(map: L.Map): void {
    this.map = map;
    //this.map.locate({setView: true, maxZoom: 16});
    this.map.on('locationfound', (e) => this.onLocationFound(e));
    this.map.on('locationerror', (e) => this.onLocationError(e));

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());

    console.log('Map ready!');
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

  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}

