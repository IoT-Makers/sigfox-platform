import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {AccessToken, AppSetting, User} from "../../../shared/sdk/models";
import {ToasterConfig, ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";
import {AppSettingApi, UserApi} from "../../../shared/sdk/services/custom";
import {RealtimeService} from "../../../shared/realtime/realtime.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    public user: User = new User();
    returnUrl: string;

    appSetting: AppSetting;
    appSettings: AppSetting[] = [];

    public canUserRegister: any = false;

    // Notifications
    toast;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000,
            animation: 'fade'
        });

    valForm: FormGroup;

    constructor(private rt: RealtimeService,
                private userApi: UserApi,
                private appSettingApi: AppSettingApi,
                private route: ActivatedRoute,
                private router: Router,
                private toasterService: ToasterService,
                public settings: SettingsService,
                fb: FormBuilder) {
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'password': [null, Validators.required]
        });
    }

    onLogin(): void {
        this.userApi.login(this.user, ['user', 'roles']).subscribe(
            (token: AccessToken) => {
                // console.log('New token: ', token);
                this.rt.connect(token.id);

                // Redirect to the /dashboard
                this.router.navigateByUrl(this.returnUrl);
            }, err => {
                // console.log(err);
                if (err.statusCode === 401) {
                    if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                    this.toast = this.toasterService.pop('error', 'Error', 'Invalid username or password.');
                } else if (err.statusCode === 500) {
                    if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                    this.toasterService.pop('error', 'Error', 'Internal server error.');
                } else {
                    if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                    this.toasterService.pop('error', 'Error', err.message);
                }
            });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            this.user.email = value.email.toLocaleLowerCase();
            this.user.password = value.password;
            this.onLogin();
        }
    }

    ngOnInit() {
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
