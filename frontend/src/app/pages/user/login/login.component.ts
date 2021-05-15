import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccessToken, AppSetting, User} from '../../../shared/sdk/models';
import {AppSettingApi, UserApi} from '../../../shared/sdk/services';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrConfig, ToastrService} from 'ngx-toastr';
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {TranslateService} from '@ngx-translate/core';

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
  public toasterconfig = {
    tapToDismiss: true,
    timeout: 5000,
    animation: 'fade'
  };

  constructor(
    private rt: RealtimeService,
    private userApi: UserApi,
    private appSettingApi: AppSettingApi,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toasterService: ToastrService) {
      this.toasterService = toasterService;
  }

  onLogin(): void {
    this.user.email = this.user.email.toLocaleLowerCase();
    this.userApi.login(this.user).subscribe(
      (token: AccessToken) => {
        // console.log('New token: ', token);
        this.rt.connect(token.id);

        // Redirect to the /dashboard
        this.router.navigateByUrl(this.returnUrl);
      }, err => {
        // console.log(err);
        if (err.statusCode === 401) {
          if (this.toast) {
            this.toasterService.clear(this.toast.toastId);
          }
          this.toast = this.toasterService.error('Error', 'Invalid username or password.', this.toasterconfig);
          this.errorMessage = this.translate.instant("error.invalid_login");
        } else if (err.statusCode === 500) {
          this.errorMessage = this.translate.instant("error.internal_server");
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
    this.appSettingApi.findById('canUserRegister').subscribe((appSetting: AppSetting) => {
      this.canUserRegister = appSetting.value;
    });
  }

  ngOnDestroy(): void {
    console.log('Login: ngOnDestroy');
  }

}
