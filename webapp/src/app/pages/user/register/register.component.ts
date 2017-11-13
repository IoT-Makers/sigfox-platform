import {Component} from '@angular/core';
import {User} from "../../../shared/sdk/models";
import {UserApi} from '../../../shared/sdk/services';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  private user: User = new User();
  private verifyPassword: string = "";
  private errorMessage = "";

  constructor(private userApi: UserApi, private router: Router) {
  }

  onRegister(): void {
    console.log("Registering");
    // TODO: Check user default values on register
    this.user.id = null;
    this.user.createdAt = new Date(Date.now());

    this.userApi.create(this.user).subscribe(response => {
      this.router.navigate(['/login']);
    }, err => {
      if (err = "Server error")
        this.errorMessage = "Server error.";
      else
        this.errorMessage = "Invalid username or password.";
      console.log(err);
    });
  }

  verify(): void {
    if (this.user.password != this.verifyPassword) {
      this.errorMessage = "Passwords do not match"
    } else {
      this.errorMessage = "";
    }
  }

}
