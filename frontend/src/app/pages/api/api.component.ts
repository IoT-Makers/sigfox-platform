import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccessToken, User} from '../../shared/sdk/models';
import {ToasterConfig, ToasterService} from 'angular2-toaster';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {RealTime} from '../../shared/sdk/services/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit, OnDestroy {

  public user: User;

  @ViewChild('confirmTokenModal') confirmTokenModal: any;

  public devAccessTokenToRemove: AccessToken = new AccessToken();
  public callbackURL;

  // Notifications
  private toast;
  private toasterService: ToasterService;
  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      animation: 'fade'
    });

  constructor(@Inject(DOCUMENT) private document: any,
             private userApi: UserApi,
             private rt: RealTime,
             private connectorApi: ConnectorApi,
             toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit(): void {
    console.log('Api: ngOnInit');
    // Get the logged in User object (avatar, email, ...)
    this.user = this.userApi.getCachedCurrent();
    this.callbackURL = this.document.location.origin + '/api';
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

  openConfirmTokenModal(devAccessToken: AccessToken): void {
    this.devAccessTokenToRemove = devAccessToken;
    this.confirmTokenModal.show();
  }

  removeDevAccessToken(): void {
    this.userApi.destroyByIdAccessTokens(this.user.id, this.devAccessTokenToRemove.id).subscribe(value => {
        const index = this.user.devAccessTokens.indexOf(this.devAccessTokenToRemove);
        this.user.devAccessTokens.splice(index, 1);
        this.userApi.patchAttributes(this.user.id, {devAccessTokens: this.user.devAccessTokens}).subscribe((user: User) => {
          this.user = user;
        });
      }
    );
    this.confirmTokenModal.hide();
  }

  toastClick() {
    if (this.toast)
      this.toasterService.clear(this.toast.toastId, this.toast.toastContainerId);
    this.toast = this.toasterService.pop('info', 'Click', 'Copied to clipboard.');
  }

  ngOnDestroy(): void {
    console.log('Api: ngOnDestroy');
  }

}
