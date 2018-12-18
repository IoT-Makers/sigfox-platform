import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApi} from "../../../shared/sdk/services/custom";
import {ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

    valForm: FormGroup;
    passwordForm: FormGroup;
    disableSendMail = false;

    public access_token: string = '';
    public newPassword: string = '';
    public email: string = '';

    // Notifications
    toast;
    public toasterconfig: ToasterConfig =
        new ToasterConfig({
            tapToDismiss: true,
            timeout: 5000,
            animation: 'fade'
        });

    constructor(public settings: SettingsService,
                fb: FormBuilder,
                private router: Router,
                private userApi: UserApi,
                public toasterService: ToasterService,
                private activatedRoute: ActivatedRoute) {

        this.activatedRoute.queryParams.subscribe(params => {
            this.access_token = params['access_token'];
            if (this.access_token) {
                let password = new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9]{6,10}$')]));
                let certainPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
                this.passwordForm = fb.group({
                    'password': password,
                    'confirmPassword': certainPassword
                });
                this.valForm = fb.group({
                    'passwordGroup': this.passwordForm
                });
            } else {
                this.valForm = fb.group({
                    'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
                });
            }
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.passwordForm) {
            for (let c in this.passwordForm.controls) {
                this.passwordForm.controls[c].markAsTouched();
            }
        }
        if (this.valForm.valid) {
            if (value.email) {
                this.email = value.email.toLocaleLowerCase();
                this.onSendResetEmail();
            } else if (value.passwordGroup.password) {
                this.newPassword = value.passwordGroup.password;
                this.onResetPassword();
            }
        }
    }

    ngOnInit() {
    }

    onSendResetEmail(): void {
        this.userApi.resetPassword({email: this.email}).subscribe(() => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'Check your mailbox!');
        }, err => {
            if (err.statusCode === 404) {
                if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
                this.toast = this.toasterService.pop('error', 'Error', 'Email does not exist.');
            }
        });
        this.disableSendMail = true;
    }

    onResetPassword(): void {
        this.userApi.setPassword(this.newPassword, (headers: HttpHeaders) => {
            headers = headers.delete('Authorization');
            headers = headers.append('Authorization', this.access_token);
            return headers;
        }).subscribe(() => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('success', 'Success', 'Password reset successfully.');
        }, err => {
            if (this.toast) this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
            this.toast = this.toasterService.pop('error', 'Error', 'Failed...');
        });
    }

}
