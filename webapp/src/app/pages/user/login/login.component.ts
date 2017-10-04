import {Component, OnInit} from '@angular/core';
import {User} from "../../../shared/sdk/models";
import {UserApi} from '../../../shared/sdk/services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  private user: User = new User();
  private errorMessage = "";
  private location = {
    lat:0,
    long:0
  };

  constructor(private userApi: UserApi, private router: Router) {}

  private onLogin(): void {
    // if(this.location){
    //   this.user.location = this.location;
    // }
    console.log(this.user);
    this.userApi.login(this.user).subscribe(response => {
      console.log(response);
      this.user = response.user;
      console.log(this.user);
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
      if(err.message == "login failed"){
        this.errorMessage = "Invalid username or password.";
      } else if(err.statusCode==500){
        this.errorMessage = "Internal server error";
      } else{
        this.errorMessage = err.message;
      }
    });
  }

  ngOnInit(): void {
    // if(navigator.geolocation){
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.location.lat = position.coords.latitude;
    //     this.location.long = position.coords.longitude;
    //   });
    // }

  }


}
