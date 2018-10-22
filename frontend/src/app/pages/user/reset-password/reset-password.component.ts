import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserApi} from "../../../shared/sdk/services/custom";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public email = '';
  public errorMessage = '';
  public successMessage = '';

  private access_token = '';
  public newPassword = '';
  public verifyPassword = '';

  constructor(private router: Router,
              private userApi: UserApi,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.access_token = params['access_token'];
    });
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
    this.userApi.setPassword(this.newPassword, (headers: HttpHeaders)=>{
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
