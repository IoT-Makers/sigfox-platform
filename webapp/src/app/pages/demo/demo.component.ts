import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeolocApi} from '../../shared/sdk/services/custom';
import {Geoloc} from '../../shared/sdk/models';
import {FeatureCollection, GeoJson} from '../../_types/map';
import * as moment from 'moment';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxglgeocoder from 'mapbox-gl-geocoder';
import MapboxCircle from 'mapbox-gl-circle';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  private filterQuery = '';

  private map: mapboxgl.Map;
  private mapStyle = 'mapbox://styles/adechassey/cjjpmejlv0znf2rqmu5cw7scc';
  private mapLat = 48.864716;
  private mapLng = 2.349014;
  private markers: any = [];
  private circle: any;
  private bounds = new mapboxgl.LngLatBounds();

  constructor(private geolocApi: GeolocApi) {
  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');
    this.initializeMap();
  }

  private initializeMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiYWRlY2hhc3NleSIsImEiOiJjamdwMjRwb2wwZnVyMndvMjNwM3Vsd2E0In0.jtoBHsEvHPFJ72sRSDPP9Q';

    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.mapLat = position.coords.latitude;
        this.mapLng = position.coords.longitude;
        this.map.flyTo({center: [this.mapLng, this.mapLat]});
      });
    }
    this.buildMap();
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.mapStyle,
      zoom: 13,
      center: [this.mapLng, this.mapLat]
    });

    /// Add map controls
    this.map.addControl(new mapboxglgeocoder({
      accessToken: mapboxgl.accessToken
    }));
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.FullscreenControl());


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('geolocs', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// subscribe to realtime database and set data source
      this.geolocApi.find({limit: 10, order: 'createdAt DESC'}).subscribe((geolocs: Geoloc[]) => {
        geolocs.forEach((geoloc: Geoloc) => {
          const properties = {
            icon: 'marker-15',
            color: '#a31148',
            title: geoloc.deviceId,
            description: '',
            accuracy: 0
          };

          switch (geoloc.type) {
            case 'sigfox':
              properties.icon = 'marker-sigfox';
              properties.color = '#792FAA';
              properties.description = '<strong><b>ID: </b><span class="text-device">' + 'device.id' + '</span></strong>' +
                '                    <br>' +
                '                    <strong *ngIf="device.name"><b>Name: </b>' + 'device.name' + '</strong>' +
                '                    <br *ngIf="device.name">' +
                '                    <strong><b>Type: </b><span class="text-geoloc-sigfox">Sigfox</span></strong>' +
                '                    <br>' +
                '                    <strong><b>Date: </b>' + moment(geoloc.createdAt).format('d/MM/YY') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Time: </b>' + moment(geoloc.createdAt).format('HH:mm:ss') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Accuracy: </b>' + geoloc.accuracy + ' m</strong>';
              properties.accuracy = geoloc.accuracy;
              break;
            case 'gps':
              properties.icon = 'marker-gps';
              properties.color = '#9B7A48';
              properties.description = '<strong><b>ID: </b><span class="text-device">' + 'device.id' + '</span></strong>' +
                '                    <br>' +
                '                    <strong *ngIf="device.name"><b>Name: </b>' + 'device.name' + '</strong>' +
                '                    <br *ngIf="device.name">' +
                '                    <strong><b>Type: </b><span class="text-geoloc-gps">GPS</span></strong>' +
                '                    <br>' +
                '                    <strong><b>Date: </b>' + moment(geoloc.createdAt).format('d/MM/YY') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Time: </b>' + moment(geoloc.createdAt).format('HH:mm:ss') + '</strong>';
              break;
            case 'beacon':
              properties.icon = 'marker-beacon';
              properties.color = '#3C58CE';
              properties.description = '<strong><b>ID: </b><span class="text-device">' + 'device.id' + '</span></strong>' +
                '                    <br>' +
                '                    <strong *ngIf="device.name"><b>Name: </b>' + 'device.name' + '</strong>' +
                '                    <br *ngIf="device.name">' +
                '                    <strong><b>Type: </b><span class="text-geoloc-beacon">Beacon</span></strong>' +
                '                    <br>' +
                '                    <strong><b>Date: </b>' + moment(geoloc.createdAt).format('d/MM/YY') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Time: </b>' + moment(geoloc.createdAt).format('HH:mm:ss') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Accuracy: </b>' + geoloc.accuracy + ' m</strong>';
              properties.accuracy = geoloc.accuracy;
              break;
            case 'wifi':
              properties.icon = 'marker-wifi';
              properties.color = '#2F2A30';
              properties.description = '<strong><b>ID: </b><span class="text-device">' + 'device.id' + '</span></strong>' +
                '                    <br>' +
                '                    <strong *ngIf="device.name"><b>Name: </b>' + 'device.name' + '</strong>' +
                '                    <br *ngIf="device.name">' +
                '                    <strong><b>Type: </b><span class="text-geoloc-wifi">WiFi</span></strong>' +
                '                    <br>' +
                '                    <strong><b>Date: </b>' + moment(geoloc.createdAt).format('d/MM/YY') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Time: </b>' + moment(geoloc.createdAt).format('HH:mm:ss') + '</strong>' +
                '                    <br>' +
                '                    <strong><b>Accuracy: </b>' + geoloc.accuracy + ' m</strong>';
              properties.accuracy = geoloc.accuracy;
              break;
          }
          this.markers.push(new GeoJson('Point', [geoloc.location.lng, geoloc.location.lat], properties));
          this.bounds.extend([geoloc.location.lng, geoloc.location.lat]);
        });

        // get source
        this.map.getSource('geolocs').setData(new FeatureCollection(this.markers));
        this.map.fitBounds(this.bounds);
      });


      this.map.addLayer({
        id: 'geolocs',
        source: 'geolocs',
        type: 'symbol',
        layout: {
          'text-field': '{title}',
          'text-size': 12,
          'text-transform': 'uppercase',
          'text-offset': [0, 1.3],
          'icon-image': '{icon}',
          'icon-allow-overlap': true
        },
        paint: {
          'text-color': {'type': 'identity', 'property': 'color'},
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });

    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    this.map.on('click', 'geolocs', (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.map);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'geolocs', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';
      this.circle =  new MapboxCircle({lat: e.features[0].geometry.coordinates.slice()[0], lng: e.features[0].geometry.coordinates.slice()[1]},
        e.features[0].properties.accuracy,
        {fillColor: e.features[0].properties.color}).addTo(this.map);
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'geolocs', () => {
      this.map.getCanvas().style.cursor = '';
      this.circle.remove();
    });
  }


  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}
