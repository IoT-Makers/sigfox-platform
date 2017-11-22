import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-base-stations',
  templateUrl: './base-stations.component.html',
  styleUrls: ['./base-stations.component.scss']
})
export class BaseStationsComponent implements OnInit {

  private deviceId: string = "743C1";
  private backendApiLogin: string = "59e099f23c87894c079b8f59";
  private backendApiPassword: string = "0a3b90ae74de23cf391e269de1f7dd1f";
  private result: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.backendApiLogin + ':' + this.backendApiPassword),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'X-Requested-With'
    });

    /*
    'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8'
    */
    /*let headers = new HttpHeaders();
    //headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Authorization', 'Basic ' + btoa(this.backendApiLogin + ':' + this.backendApiPassword));
    //headers.set('Authorization', 'Basic NTllMDk5ZjIzYzg3ODk0YzA3OWI4ZjU5OjBhM2I5MGFlNzRkZTIzY2YzOTFlMjY5ZGUxZjdkZDFm');
*/
    this.http.get(
      'https://backend.sigfox.com/api/devices/' + this.deviceId + '/messages?limit=1',
      {headers: headers}
    ).subscribe(data => {
      this.result = data;
      console.log(data);
    });

  }

}
