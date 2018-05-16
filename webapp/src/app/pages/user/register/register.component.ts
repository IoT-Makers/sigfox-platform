import {Component} from '@angular/core';
import {AccessToken, AppSetting, User} from '../../../shared/sdk/models';
import {UserApi, AppSettingApi} from '../../../shared/sdk/services';
import {Router} from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html'
})

export class RegisterComponent {

  public user: User = new User();
  public verifyPassword = '';
  public errorMessage = '';

  private setting: AppSetting;
  private settings: AppSetting[] = [];

  private canUserRegister: any = false;

  constructor(private userApi: UserApi,
              private appSettingApi: AppSettingApi,
              private router: Router) {
    this.getAppSettings();
  }

  onRegister(): void {
    console.log('Registering');
    if (this.user.password !== this.verifyPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.user.email = this.user.email.toLocaleLowerCase();

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
            'loggedAt': new Date()
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

  getAppSettings(): void {
    this.appSettingApi.find().subscribe((settings: AppSetting[])=> {
      this.settings = settings;
      let temp = _.filter(settings, {key: 'canUserRegister'});
      this.canUserRegister = temp[0].value;
      if(this.canUserRegister == false){
        this.router.navigate(['/login']);
      }
      console.log(this.canUserRegister);
    });
  }
}
