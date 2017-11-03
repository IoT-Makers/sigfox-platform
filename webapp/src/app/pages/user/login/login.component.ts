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
  public static userStatic: User = new User();
  private errorMessage = "";

  constructor(private userApi: UserApi, private router: Router) {}

  public onLogin(): void {
    /*console.log("beforeLogin: ", this.user);*/
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => {
        console.log("New token: ", token);
        let userId = token.userId;

        this.userApi.findById(userId).subscribe((user: User) => {
          this.user = user;
          console.log("afterLogin: ", this.user);
          LoginComponent.userStatic = this.user;
          // Redirect to the /dashboard
          this.router.navigate(['/dashboard']);
        });

      }, err => {
        console.log(err);
        if(err.message == "Login failed"){
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
