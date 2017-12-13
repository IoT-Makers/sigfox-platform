import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {AccessToken, User} from '../../shared/sdk/models';
import {UserApi} from '../../shared/sdk/services/custom';

@Component({
  selector: 'app-profile',
  templateUrl: './connectors.component.html',
  styleUrls: ['./connectors.component.scss']
})
export class ConnectorsComponent implements OnInit, OnDestroy {

  private user: User;

  @ViewChild('confirmModal') confirmModal: any;

  private devAccessTokenToRemove: AccessToken = new AccessToken();
  private callbackURL;

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


  ngOnInit() {
    // Get the logged in User object (avatar, email, ...)
    this.getUser();
    this.callbackURL = this.document.location.origin + '/api/Messages/sigfox';
  }

  ngOnDestroy() {

  }
}
