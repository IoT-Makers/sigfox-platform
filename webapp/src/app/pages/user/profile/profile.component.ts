import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserApi} from '../../../shared/sdk/services/custom/User';
import {DOCUMENT} from '@angular/common';
import {User} from '../../../shared/sdk/models';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {FullLayoutComponent} from '../../../layouts/full-layout.component';
import {Router} from '@angular/router';
import {RealTime} from "../../../shared/sdk/services";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('updatePasswordModal') updatePasswordModal: any;
  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('deleteUserModal') deleteUserModal: any;

  private oldPassword;
  private newPassword;
  private newPasswordConfirm;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000,
      animation: 'fade'
    });

  constructor(@Inject(DOCUMENT) private document: any,
              private rt: RealTime,
              private userApi: UserApi,
              toasterService: ToasterService,
              private router: Router) {
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
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('success', 'Success', 'Password was successfully modified.');
        this.updatePasswordModal.hide();
      }, (error: any) => {
        if (this.toast)
          this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
        this.toast = this.toasterService.pop('error', 'Error', error.message);
      });
    } else {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('error', 'Error', 'Please make sure the passwords match.');
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
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Profile was updated successfully.');
      this.updateUserModal.hide();
      this.rt.onReady().subscribe();
    });
  }

  deleteUser(): void {
    this.userApi.deleteById(this.user.id).subscribe((value: any) => {
      if (this.toast)
        this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
      this.toast = this.toasterService.pop('success', 'Success', 'Account was deleted successfully.');
      this.deleteUserModal.hide();
    });

    this.userApi.logout().subscribe((result: any) => {
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }

  ngOnInit() {
    console.log('Profile: ngOnInit');


    // Get the logged in User object
    this.getUser();
  }

  ngOnDestroy() {
    console.log('Profile: ngOnDestroy');
  }
}
