import {AfterViewInit, Directive, Input, OnDestroy} from '@angular/core';
import {Message} from '../../shared/sdk/models/Message';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {CustomDashboardComponent} from './custom-dashboard.component';

declare let google: any;

@Directive({
  selector: 'agm-directions'
})
export class DirectionsComponent implements AfterViewInit, OnDestroy {

  @Input() geolocMessages: Message[];
  @Input() routesColor: string;

  constructor(private customDashboardComponent: CustomDashboardComponent, private _googleMapsAPIWrapper: GoogleMapsAPIWrapper) {
  }

  ngAfterViewInit() {
    this.buildDirections();
  }

  public buildDirections() {
    console.log('--------------------------------');
    console.log(this.customDashboardComponent.directionsDisplayStore);
    for (const i in this.customDashboardComponent.directionsDisplayStore) {
      this.customDashboardComponent.directionsDisplayStore[i].setMap(null);
    }
    this.customDashboardComponent.directionsDisplayStore = [];
    console.log('--------------------------------');

    let messages: Message[] = [];
    const startCoord = this.geolocMessages[0].geoloc[0];
    const endCoord = this.geolocMessages[this.geolocMessages.length - 1].geoloc[0];

    const routes = Math.floor(this.geolocMessages.length / 23) !== 0 ? Math.floor(this.geolocMessages.length / 23) : 1;
    console.log('Number of routes (23 geolocs per routes)', routes);
    for (let i = 0; i < routes; i++) {
      let waypoints = [];
      //let color = '#' + Math.floor(Math.random()*16777215).toString(16);
      messages = this.geolocMessages.slice(i * 23, (i + 1) * 23);
      /*console.log("i*23", i*23);
      console.log("(i+1)*23-1", (i+1)*23);

      console.log("messagesCount", messages.length);
      console.log(messages);*/

      messages.forEach(message => {
        const coord = message.geoloc[0];
        const latLng = new google.maps.LatLng(coord.lat, coord.lng);
        waypoints.push({location: latLng, stopover: true});
      });

      //console.log(waypoints);

      if (waypoints.length <= 23) {

        this._googleMapsAPIWrapper.getNativeMap().then((map) => {
          const directionsService = new google.maps.DirectionsService;
          const directionsDisplay = new google.maps.DirectionsRenderer;
          directionsDisplay.setMap(map);
          this.customDashboardComponent.directionsDisplayStore.push(directionsDisplay);
          directionsDisplay.setOptions({
            polylineOptions: {
              strokeWeight: 4,
              strokeOpacity: 0.5,
              strokeColor: this.routesColor
            },
            markerOptions: {
              visible: false
            }
          });

          // If travel mode is TRANSIT, then only use the starting and ending coordinates
          if (this.customDashboardComponent.travelMode === 'TRANSIT') {
            waypoints = [];
          }

          directionsService.route({
            origin: {lat: startCoord.lat, lng: startCoord.lng},
            destination: {lat: endCoord.lat, lng: endCoord.lng},
            waypoints: waypoints,
            optimizeWaypoints: false,
            avoidHighways: false,
            travelMode: this.customDashboardComponent.travelMode
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
    for (let i in this.customDashboardComponent.directionsDisplayStore) {
      this.customDashboardComponent.directionsDisplayStore[i].setMap(null);
    }
    this.customDashboardComponent.directionsDisplayStore = [];
  }

  private getcomputeDistance(latLngA: any, latLngB: any) {
    return (google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 1000).toFixed(2);
  }
}

