import {Component, OnInit} from '@angular/core';
import {User, AccessToken} from "../../../shared/sdk/models";
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

  constructor(private userApi: UserApi, private router: Router) {}

  private onLogin(): void {

    console.log(this.user);
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) =>{
      console.log(token);
      //this.user = response.user;
      //console.log(this.user);
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
      if(err.message == "login failed"){
        this.errorMessage = "Invalid username or password.";
      } else if(err.statusCode == 500){
        this.errorMessage = "Internal server error";
      } else{
        this.errorMessage = err.message;
      }
    });
  }

  ngOnInit(): void {

  }

}
