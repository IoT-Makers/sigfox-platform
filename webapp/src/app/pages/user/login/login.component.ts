import {Component, OnInit} from '@angular/core';
import {AccessToken, User} from '../../../shared/sdk/models';
import {UserApi} from '../../../shared/sdk/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  private user: User = new User();
  private errorMessage = '';

  constructor(private userApi: UserApi,
              private router: Router) { }

  public onLogin(): void {
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => {
        // console.log('New token: ', token);

        // Update the last login date
        this.userApi.patchAttributes(
          token.userId,
          {
            'lastLogin': new Date()
          }
        ).subscribe();
        // Redirect to the /dashboard
        this.router.navigate(['/']);
      }, err => {
        // console.log(err);
        if (err.statusCode === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else if (err.statusCode === 500) {
          this.errorMessage = 'Internal server error';
        } else {
          this.errorMessage = err.message;
        }
      });
  }

  ngOnInit(): void {
  }

}
