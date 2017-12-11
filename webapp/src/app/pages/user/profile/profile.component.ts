import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserApi} from '../../../shared/sdk/services/custom/User';
import {DOCUMENT} from '@angular/common';
import {AccessToken, User} from '../../../shared/sdk/models';
import {ToasterConfig, ToasterService} from "angular2-toaster";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('updatePasswordModal') updatePasswordModal: any;
  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('confirmModal') confirmModal: any;

  private devAccessTokenToRemove: AccessToken = new AccessToken();
  private callbackURL;

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

    // TODO: REMOVE BELLOW AFTER HAVING IT RAN ONCE (AFTER UPDATING) !!!
    // Retrocompatibilty
    this.userApi.getAccessTokens(this.user.id, {
      where: {
        ttl: -1,
        userId: this.user.id
      }
    }).subscribe((accessTokens: AccessToken[]) => {
      if (accessTokens) {
        this.userApi.patchAttributes(this.user.id, {devAccessTokens: accessTokens}).subscribe((user: User) => {
          this.user = user;
        });
      }
    });
  }

  createDevAccessToken(): void {
    const newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.user.id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.user.devAccessTokens.push(accessToken);
      this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
        this.user = user;
      });
    });
  }

  showRemoveModal(devAccessToken: AccessToken): void {
    this.confirmModal.show();
    this.devAccessTokenToRemove = devAccessToken;
  }

  remove(): void {
    this.userApi.destroyByIdAccessTokens(this.user.id, this.devAccessTokenToRemove.id).subscribe(value => {
        const index = this.user.devAccessTokens.indexOf(this.devAccessTokenToRemove);
        this.user.devAccessTokens.splice(index, 1);
        this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
          this.user = user;
        });
      }
    );
    this.confirmModal.hide();
  }

  saveSigfoxBackendApiAccess(): void {
    this.userApi.patchAttributes(
      this.user.id,
      {
        'sigfoxBackendApiLogin': this.user.sigfoxBackendApiLogin,
        'sigfoxBackendApiPassword': this.user.sigfoxBackendApiPassword
      }
    ).subscribe(value => {
      this.toasterService.pop('success', 'Success', 'Credentials were successfully updated.');
    });
  }

  removeSigfoxBackendApiAccess(): void {
    this.userApi.patchAttributes(
      this.user.id,
      {
        'sigfoxBackendApiLogin': null,
        'sigfoxBackendApiPassword': null
      }
    ).subscribe((user: User) => {
      this.user = user;
      this.toasterService.pop('success', 'Success', 'Credentials were successfully removed.');
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
    this.callbackURL = this.document.location.origin + '/api/Messages/sigfox';
  }

  ngOnDestroy() {

  }
}
