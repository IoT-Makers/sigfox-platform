import {Component} from '@angular/core';
import {User} from "../../shared/sdk/models";
import {UserApi} from '../../shared/sdk/services';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  private user: User = new User();

  constructor(private userApi: UserApi, private router: Router) {}

  private onRegister(): void {
    this.userApi.create(this.user).subscribe((user: User) => this.onLogin());
  }

  private onLogin(): void {
    this.userApi.login(this.user).subscribe(response => {
      console.log(response);
      this.user = response.user;
      console.log(this.user);
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log(err);
    });
  }

  public getData() {
    // Example 3
    this.userApi.count().subscribe((response: any) => {
      let lastRow = response.count;

      let data = this.userApi
        .find({
          offset: 0,
          limit: 100
        })
        .subscribe(function(response: any) {
          // Process response
          console.log(this.user);
        });
    });
  }
}
