import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserApi} from '../../../shared/sdk/services/custom/User';
import {DOCUMENT} from '@angular/common';
import {AccessToken, User} from '../../../shared/sdk/models';
import {ToasterConfig, ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('updatePasswordModal') updatePasswordModal: any;
  @ViewChild('updateUserModal') updateUserModal: any;

  private oldPassword;
  private newPassword;
  private newPasswordConfirm;

  // Notifications
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  getUser(): void {
    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id, {}).subscribe((user: User) => {
      this.user = user;
    });
  }

  updatePassword(): void {
    if (this.newPassword === this.newPasswordConfirm) {
      this.userApi.changePassword(this.oldPassword, this.newPassword).subscribe((result: any) => {
        this.toasterService.pop('success', 'Success', 'Password was successfully modified.');
        this.updatePasswordModal.hide();
      }, (error: any) => {
        this.toasterService.pop('error', 'Error', error.message);
      });
    } else {
      this.toasterService.pop('error', 'Error', 'Please make sure the passwords match.');
    }
  }

  updateUser(): void {
    this.userApi.patchAttributes(
      this.user.id,
      {
        'email': this.user.email,
        'username': this.user.username,
        'avatar': this.user.avatar
      }
    ).subscribe((user: User) => {
      this.user = user;
      this.toasterService.pop('success', 'Success', 'Profile was updated successfully.');
      this.updateUserModal.hide();
    });
  }

  ngOnInit() {
    // Get the logged in User object (avatar, email, ...)
    this.getUser();
  }

  ngOnDestroy() {

  }
}
