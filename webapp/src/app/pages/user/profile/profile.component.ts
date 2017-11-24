import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {AccessToken, User} from '../../../shared/sdk/models';
import {UserApi} from '../../../shared/sdk/services/custom/User';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  @ViewChild('updateUserModal') updateUserModal: any;

  private user: User = new User();
  private devAccessToken = new AccessToken();

  private callbackURL;

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi) {
  }

  getUser(): void {
    this.userApi.findById(this.userApi.getCachedCurrent().id).subscribe((user: User) => {
      this.user = user;
      console.log(this.user);
    });
  }

  getDevAccessToken(): void {
    this.userApi.getAccessTokens(this.userApi.getCachedCurrent().id, {where: {'ttl': -1}}).subscribe((accessTokens: AccessToken[]) => {
      if (accessTokens[0]) {
        console.log(accessTokens);
        this.devAccessToken = accessTokens[0];
      }
    });
  }

  createDevAccessToken(): void {
    const newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.userApi.getCachedCurrent().id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.devAccessToken = accessToken;
    });
  }

  deleteDevAccessToken(): void {
    // this.accessTokenApi.deleteById(this.devAccessToken.id).subscribe();
    this.userApi.deleteAccessTokens(this.devAccessToken.id).subscribe();
  }

  saveSigfoxBackendApiAccess(): void {
    this.userApi.patchAttributes(
      this.user.id,
      {
        'sigfoxBackendApiLogin': this.user.sigfoxBackendApiLogin,
        'sigfoxBackendApiPassword': this.user.sigfoxBackendApiPassword
      }
    ).subscribe();
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
    });
  }

  updateUser(): void {
    this.userApi.patchAttributes(
      this.user.id,
      {
        'username': this.user.username,
        'avatar': this.user.avatar
      }
    ).subscribe((user: User) => {
      this.user = user;
      this.updateUserModal.hide();
    });
  }

  ngOnInit() {
    // Get the logged in User object (avatar, email, ...)
    this.getUser();
    this.getDevAccessToken();
    this.callbackURL = this.document.location.origin + '/api/Messages/sigfox';
    //this.accessTokens = this.user.accessTokens;
  }

  ngOnDestroy() {

  }
}
