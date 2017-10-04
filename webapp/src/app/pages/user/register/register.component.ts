import {Component} from '@angular/core';
import {User} from "../../../shared/sdk/models";
import {UserApi} from '../../../shared/sdk/services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  private user: any = {};
  private verifyPassword: string = "";
  private errorMessage = "";

  constructor(private userApi: UserApi, private router: Router) {
  }

  onRegister(): void {
    console.log("registering");
    console.log(this.user);
    this.userApi.create(this.user).subscribe(response => {
      console.log(response);
      //this.user = response.user;
      console.log(this.user);
      this.router.navigate(['/login']);
    }, err => {
      if (err = "Server error")
        this.errorMessage = "Server is not responding.";
      else
        this.errorMessage = "Invalid username or password.";
      console.log(err);
    });
  }

  private verify(): void {
    if (this.user.password != this.verifyPassword) {
      this.errorMessage = "Passwords do not match"
    } else {
      this.errorMessage = "";
    }
  }


}
