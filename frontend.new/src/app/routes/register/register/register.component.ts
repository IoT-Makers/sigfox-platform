import {Component} from '@angular/core';
import {AccessToken, AppSetting, User} from '../../../shared/sdk/models';
import {AppSettingApi, UserApi} from '../../../shared/sdk/services';
import {Router} from '@angular/router';
import {RealtimeService} from "../../../shared/realtime/realtime.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SettingsService} from "../../../core/settings/settings.service";
import * as _ from 'lodash';
import {CustomValidators} from "ng2-validation";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html'
})

export class RegisterComponent {

    public user: User = new User();
    public verifyPassword = '';
    public errorMessage = '';

    private appSetting: AppSetting;
    private appSettings: AppSetting[] = [];

    private canUserRegister: any = false;

    valForm: FormGroup;
    passwordForm: FormGroup;

    constructor(private rt: RealtimeService,
                private userApi: UserApi,
                private appSettingApi: AppSettingApi,
                private router: Router,
                public settings: SettingsService,
                fb: FormBuilder) {
        this.getAppSettings();

        let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
        let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

        this.passwordForm = fb.group({
            'password': password,
            'confirmPassword': certainPassword
        });

        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            'accountagreed': [null, Validators.required],
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
            console.log('Valid!');
            console.log(value);
        }
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
                this.rt.connect(token.id);
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
        this.appSettingApi.find().subscribe((appSettings: AppSetting[]) => {
            this.appSettings = appSettings;
            let temp = _.filter(appSettings, {key: 'canUserRegister'});
            this.canUserRegister = temp[0].value;
            if (this.canUserRegister == false) {
                this.router.navigate(['/login']);
            }
            console.log(this.valForm);
        });
    }
}
