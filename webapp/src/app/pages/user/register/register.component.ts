import {Component} from '@angular/core';
import {User} from '../../../shared/sdk/models';
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

    this.userApi.create(this.user).subscribe(response => {
      this.router.navigate(['/login']);
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

}
