import {Component, OnDestroy, OnInit} from '@angular/core';
import {RealtimeService} from "../../shared/realtime/realtime.service";
import {DeviceApi, GeolocApi} from "../../shared/sdk/services/custom";
import {Device, Geoloc} from "../../shared/sdk/models";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit, OnDestroy {

  private filterQuery = '';

  private map: any;

  private geolocsGeoJson = {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": []
    }
  };

  private test = {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-77.03238901390978, 38.913188059745586]
        },
        "properties": {
          "title": "Mapbox DC",
          "icon": "monument"
        }
      }, {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-122.414, 37.776]
        },
        "properties": {
          "title": "Mapbox SF",
          "icon": "harbor"
        }
      }]
    }
  };

  private paint = {
    // Increase the heatmap weight based on frequency and property magnitude
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["get", "mag"],
      0, 0,
      6, 1
    ],
    // Increase the heatmap color weight weight by zoom level
    // heatmap-intensity is a multiplier on top of heatmap-weight
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0, 1,
      9, 3
    ],
    // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
    // Begin color ramp at 0-stop with a 0-transparancy color
    // to create a blur-like effect.
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0, "rgba(33,102,172,0)",
      0.2, "rgb(103,169,207)",
      0.4, "rgb(209,229,240)",
      0.6, "rgb(253,219,199)",
      0.8, "rgb(239,138,98)",
      1, "rgb(178,24,43)"
    ],
    // Adjust the heatmap radius by zoom level
    "heatmap-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0, 1,
      9, 18
    ],
    // Transition from heatmap to circle layer by zoom level
    /*"heatmap-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      7, 1,
      9, 0
    ],*/
  };

  private paint2 = {
    "heatmap-color": ["interpolate", ["linear"], ["heatmap-density"], 0, "rgba(0, 0, 255, 0)", 0.1, "#ffffb2", 0.3, "#feb24c", 0.5, "#fd8d3c", 0.7, "#fc4e2a", 1, "#e31a1c"]
  };

  private paint3 = {
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(0, 0, 255, 0)",
      0.1,
      "royalblue",
      0.3,
      "cyan",
      0.5,
      "lime",
      0.7,
      "yellow",
      1,
      "hsla(265, 85%, 50%, 0.8)"
    ],
    "heatmap-opacity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      0,
      22,
      1
    ],
    "heatmap-radius": 20,
    "heatmap-weight": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      0,
      22,
      1
    ],
    "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      0,
      22,
      1
    ]
  };

  constructor(private rt: RealtimeService,
              private geolocApi: GeolocApi,
              private deviceApi: DeviceApi) {
  }

  ngOnInit(): void {
    console.log('Demo: ngOnInit');
    this.getGeolocs();
  }

  getDevices(): void {
    this.deviceApi.find({
      order: 'createdAt DESC', include: [
        {
          relation: 'Geolocs',
          limit: 5,
          order: 'createdAt DESC'
        }
      ]
    }).subscribe((devices: Device[]) => {
      console.log(devices);
    });
  }

  onMapLoad(map: any): void {
    this.map = map;
    // add it to the map
    this.map.addSource('geolocs', this.geolocsGeoJson);
    this.map.addLayer({
      id: "geolocs",
      /*layout: {
        'text-field': '{message}',
        'text-size': 24,
        'text-transform': 'uppercase',
        'icon-image': 'rocket-15',
        'text-offset': [0, 1.5]
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2
      },*/
      source: "geolocs",
      type: "heatmap",
      paint: this.paint3
    });
  }

  getGeolocs(): void {
    var arenaLocation = {
      lat: 52.496915,
      lng: 13.453919
    };
    this.geolocApi.find({
      where: {
        location: {
          near: arenaLocation,
          maxDistance: 2,
          unit: 'kilometers'
        }
      },
      order: 'createdAt DESC',
      limit: 50000,
      include: ['Device', 'Beacon']
    }).subscribe((geolocs: Geoloc[]) => {

      // setup the viewport
      //this.map.jumpTo({'center': [geolocs[0].location.lng, geolocs[0].location.lat], 'zoom': 18});
      this.map.panTo([geolocs[0].location.lng, geolocs[0].location.lat]);
      this.map.setPitch(20);

      let i = 0;
      const data = this.geolocsGeoJson.data;
      const map = this.map;
      const timer = window.setInterval(function () {
        if (i < geolocs.length) {
          data.features.push({
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [geolocs[i].location.lng, geolocs[i].location.lat]
            },
            "properties": {
              "title": geolocs[i].Device.name ? geolocs[i].Device.name : geolocs[i].Device.id,
              "icon": "monument"
            }
          });
          map.getSource('geolocs').setData(data);
          map.panTo([geolocs[i].location.lng, geolocs[i].location.lat]);
        } else {
          console.log('Finished');
          window.clearInterval(timer);
        }
        i++;
      }, 10);
    });
  }

  ngOnDestroy(): void {
    console.log('Demo: ngOnDestroy');
  }

}
