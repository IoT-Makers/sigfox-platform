import {AfterContentInit, Directive, Input, OnDestroy} from '@angular/core';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {Geoloc} from '../../shared/sdk/models';

declare let google: any;

@Directive({
  selector: 'agm-directions'
})

export class DirectionsDirective implements AfterContentInit, OnDestroy {

  @Input() geolocs: Geoloc[];
  @Input() routesColor: string;
  @Input() directionsDisplayStore: any[];
  @Input() travelMode: string;

  constructor(private _googleMapsAPIWrapper: GoogleMapsAPIWrapper) {
  }

  ngAfterContentInit() {
    console.log('DirectionsDirective: ngAfterContentInit');
    if (this.geolocs.length > 1)
      this.buildDirections();
  }

  private generateColor(): string {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  private buildDirections() {
    console.log('--------------------------------');
    console.log(this.directionsDisplayStore);
    for (const i in this.directionsDisplayStore) {
      this.directionsDisplayStore[i].setMap(null);
    }
    this.directionsDisplayStore = [];
    console.log('--------------------------------');

    let geolocs: Geoloc[] = [];
    const startCoord = this.geolocs[0].location;
    const endCoord = this.geolocs[this.geolocs.length - 1].location;

    const routes = Math.floor(this.geolocs.length / 23) !== 0 ? Math.floor(this.geolocs.length / 23) : 1;
    console.log('Number of routes (23 geolocs per routes)', routes);
    for (let i = 0; i < routes; i++) {
      let waypoints = [];
      geolocs = this.geolocs.slice(i * 23, (i + 1) * 23);
      /*console.log("i*23", i*23);
      console.log("(i+1)*23-1", (i+1)*23);

      console.log("messagesCount", messages.length);
      console.log(messages);*/

      geolocs.forEach((geoloc: Geoloc) => {
        const latLng = new google.maps.LatLng(geoloc.location.lat, geoloc.location.lng);
        waypoints.push({location: latLng, stopover: true});
      });

      //console.log(waypoints);

      if (waypoints.length <= 23) {

        this._googleMapsAPIWrapper.getNativeMap().then((map) => {
          const directionsService = new google.maps.DirectionsService;
          const directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap(map);
          this.directionsDisplayStore.push(directionsDisplay);
          directionsDisplay.setOptions({
            polylineOptions: {
              strokeWeight: 4,
              strokeOpacity: 0.5,
              strokeColor: this.routesColor ? this.routesColor : this.generateColor()
            },
            markerOptions: {
              visible: false
            }
          });

          // If travel mode is TRANSIT, then only use the starting and ending coordinates
          if (this.travelMode === 'TRANSIT') {
            waypoints = [];
          }

          directionsService.route({
            origin: {lat: startCoord.lat, lng: startCoord.lng},
            destination: {lat: endCoord.lat, lng: endCoord.lng},
            waypoints: waypoints,
            optimizeWaypoints: false,
            avoidHighways: false,
            travelMode: this.travelMode
          }, function (response, status) {
            if (status === 'OK') {
              //console.log(response);
              directionsDisplay.setDirections(response);
            } else {
              console.log(status);
              /*window.alert('Directions request failed due to ' + status);*/
            }
          });
        }, err => {
          console.log('error', err);
        });

      }

    }
  }

  ngOnDestroy() {
    console.log('DirectionsDirective: ngOnDestroy');
    for (const i in this.directionsDisplayStore) {
      this.directionsDisplayStore[i].setMap(null);
    }
    this.directionsDisplayStore = [];
  }

  private getcomputeDistance(latLngA: any, latLngB: any) {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}

