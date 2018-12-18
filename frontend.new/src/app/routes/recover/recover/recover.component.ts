import {Component, OnInit} from '@angular/core';
import {SettingsService} from '../../../core/settings/settings.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from 'ng2-validation';
import {HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {UserApi} from "../../../shared/sdk/services/custom";

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

    valForm: FormGroup;

    public email: string = '';
    public errorMessage: string = '';
    public successMessage: string = '';

    public access_token: string = '';
    public newPassword: string = '';
    public verifyPassword: string = '';

    constructor(public settings: SettingsService,
                fb: FormBuilder,
                private router: Router,
                private userApi: UserApi,
                private activatedRoute: ActivatedRoute) {
        this.valForm = fb.group({
            'email': [null, Validators.compose([Validators.required, CustomValidators.email])]
        });
        this.activatedRoute.queryParams.subscribe(params => {
            this.access_token = params['access_token'];
        });
    }

    submitForm($ev, value: any) {
        $ev.preventDefault();
        for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }
    }

    ngOnInit() {
    }

    onSendResetEmail(): void {
        this.email = this.email.toLocaleLowerCase();
        this.userApi.resetPassword({email: this.email}).subscribe(() => {
            this.successMessage = 'Check your mailbox';
        }, err => {
            if (err.statusCode === 404)
                this.errorMessage = 'Email does not exist.';
        });
    }

    onResetPassword(): void {
        this.userApi.setPassword(this.newPassword, (headers: HttpHeaders) => {
            headers = headers.delete('Authorization');
            headers = headers.append('Authorization', this.access_token);
            return headers;
        }).subscribe(() => {
            this.successMessage = 'Password reset successfully';
        }, err => {
            this.errorMessage = 'Failed.';
            console.error(err);
        });
    }

    verify(): void {
        if (this.newPassword !== this.verifyPassword) {
            this.errorMessage = 'Passwords do not match';
        } else {
            this.errorMessage = '';
        }
    }

}
