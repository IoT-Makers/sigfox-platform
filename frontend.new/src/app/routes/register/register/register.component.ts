import {Component} from '@angular/core';
import {AccessToken, AppSetting, User} from '../../../shared/sdk/models';
import {AppSettingApi, UserApi} from '../../../shared/sdk/services';
import {Router} from '@angular/router';
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../core/settings/settings.service";
import * as _ from 'lodash';
import {CustomValidators} from "ng2-validation";
import {ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    public user: User = new User();

    private appSetting: AppSetting;
    private appSettings: AppSetting[] = [];

    private canUserRegister: any = false;

    valForm: FormGroup;
    passwordForm: FormGroup;

    // Notifications
    toast;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000,
            animation: 'fade'
        });

    constructor(private rt: RealtimeService,
                private userApi: UserApi,
                private appSettingApi: AppSettingApi,
                private router: Router,
                public settings: SettingsService,
                private toasterService: ToasterService,
                fb: FormBuilder) {
        this.checkUserRegisterAppSetting();

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        /*this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
            'passwordGroup': this.passwordForm
        });*/
        // TODO: remove this if terms
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'passwordGroup': this.passwordForm
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        for (let c in this.passwordForm.controls) {
            this.passwordForm.controls[c].markAsTouched();
        }

        if (this.valForm.valid) {
            this.user.id = null;
            this.user.createdAt = new Date();
            this.user.email = value.email.toLocaleLowerCase();
            this.user.password = value.passwordGroup.password;
            this.onRegister();
        }
    }

    onRegister(): void {
        this.userApi.create(this.user).subscribe((user: User) => {
            this.onLogin();
        }, err => {
            // console.log(err);
            if (err.statusCode === 422) {
                if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('error', 'Error', 'Email already taken.');
            } else {
                if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('error', 'Error', 'Invalid username or password.');
            }
        });
    }

    onLogin(): void {
        this.userApi.login(this.user).subscribe(
            (token: AccessToken) => {
                // console.log('New token: ', token);
                this.rt.connect(token.id);

                // Redirect
                this.router.navigate(['/']);
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

    checkUserRegisterAppSetting(): void {
        this.appSettingApi.find().subscribe((appSettings: AppSetting[]) => {
            this.appSettings = appSettings;
            let temp = _.filter(appSettings, {key: 'canUserRegister'});
            this.canUserRegister = temp[0].value;
            if (this.canUserRegister == false) this.router.navigate(['/login']);
        });
    }
}
