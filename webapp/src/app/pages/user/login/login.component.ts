import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccessToken, AppSetting, User} from '../../../shared/sdk/models';
import {AppSettingApi, UserApi} from '../../../shared/sdk/services';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  public user: User = new User();
  public errorMessage = '';

  private returnUrl: string;

  private setting: AppSetting;
  private settings: AppSetting[] = [];

  public canUserRegister: any = false;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(private userApi: UserApi,
              private appSettingApi: AppSettingApi,
              private route: ActivatedRoute,
              private router: Router,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  onLogin(): void {
    this.user.email = this.user.email.toLocaleLowerCase();
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
        this.router.navigateByUrl(this.returnUrl);
      }, err => {
        // console.log(err);
        if (err.statusCode === 401) {
          if (this.toast)
            this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
          this.toast = this.toasterService.pop('error', 'Error', 'Invalid username or password.');
          this.errorMessage = 'Invalid username or password.';
        } else if (err.statusCode === 500) {
          this.errorMessage = 'Internal server error';
        } else {
          this.errorMessage = err.message;
        }
      });
  }

  ngOnInit(): void {
    console.log('Login: ngOnInit');
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.getAppSettings();
  }

  getAppSettings(): void {
    this.appSettingApi.find().subscribe((settings: AppSetting[]) => {
      this.settings = settings;
      const temp = _.filter(settings, {key: 'canUserRegister'});
      this.canUserRegister = temp[0].value;

      //console.log(this.canUserRegister);
    });
  }

  ngOnDestroy(): void {
    console.log('Login: ngOnDestroy');
  }

}
