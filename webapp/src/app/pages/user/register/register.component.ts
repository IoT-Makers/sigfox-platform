import {Component} from '@angular/core';
import {AccessToken, User} from '../../../shared/sdk/models';
import {UserApi} from '../../../shared/sdk/services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  private user: User = new User();
  private verifyPassword = '';
  private errorMessage = '';

  constructor(private userApi: UserApi, private router: Router) {
  }

  onRegister(): void {
    console.log('Registering');
    if (this.user.password !== this.verifyPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.user.id = null;
    this.user.createdAt = new Date();

    this.userApi.create(this.user).subscribe((user: User) => {
      this.onLogin();
    }, err => {
      // console.log(err);
      if (err.statusCode === 422)
        this.errorMessage = 'Email already taken.';
      else
        this.errorMessage = 'Invalid username or password.';
    });
  }

  verify(): void {
    if (this.user.password !== this.verifyPassword) {
      this.errorMessage = 'Passwords do not match';
    } else {
      this.errorMessage = '';
    }
  }

  onLogin(): void {
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
}
