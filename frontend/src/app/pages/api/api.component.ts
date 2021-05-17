import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AccessToken, User} from '../../shared/sdk/models';
import {ToastrConfig, ToastrService} from 'ngx-toastr';
import {ConnectorApi, UserApi} from '../../shared/sdk/services/custom';
import {TranslateService} from '@ngx-translate/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-demo',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit, OnDestroy {

  public user: User;
  public userReady: boolean = false;

  @ViewChild('confirmTokenModal') confirmTokenModal: any;

  public devAccessTokenToRemove: AccessToken = new AccessToken();
  public callbackURL;

  // Select
  public selectDevicetypes: Array<Object> = [];
  public selectedDevicetypes = [];
  public selectOneSettings = {
    singleSelection: true,
    text: 'Select one device type',
    enableSearchFilter: true,
    classes: 'select-one-api'
  };

  // Notifications
  private toast;
  public toasterconfig = {
    tapToDismiss: true,
    timeout: 3000,
    animation: 'fade'
  };

  constructor(@Inject(DOCUMENT) private document: any,
              private userApi: UserApi,
              private connectorApi: ConnectorApi,
              private translate: TranslateService,
              private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    console.log('Api: ngOnInit');
    // Get the logged in User object (avatar, email, ...)
    this.user = this.userApi.getCachedCurrent();
    // Fix
    if (!this.user.devAccessTokens) {
      this.user.devAccessTokens = [];
    }
    this.userApi.getDevAccessTokens(this.user.id, {where: {ttl: -1}}).subscribe((devTokens: any[]) => {
      this.user.devAccessTokens = devTokens;
      this.userReady = true;
    });
    this.callbackURL = 'https://api.' + this.document.location.hostname + '/api';

    this.listSigfoxBackendDevicetypes();
  }

  createSigfoxBackendCallbacks(): void {
    if (this.selectedDevicetypes) {
      this.connectorApi.createSigfoxBackendCallbacks(this.selectedDevicetypes[0].id).subscribe((result: any) => {
        if (result.statusCode === 200) {
          this.selectedDevicetypes = [];
          if (this.toast) {
            this.toasterService.clear(this.toast.toastId);
          }
          this.toast = this.toasterService.success('Success', 'Callbacks were successfully created.', this.toasterconfig);
        } else {
          if (this.toast) {
            this.toasterService.clear(this.toast.toastId);
          }
          this.toast = this.toasterService.error('Error', 'Error occurred, are you sure you have the DEVICE MANAGER [W] or CUSTOMER [W] API rights on the Sigfox Backend?', this.toasterconfig);
        }
      });
    }
  }

  listSigfoxBackendDevicetypes(): void {
    this.connectorApi.listSigfoxBackendDevicetypes().subscribe((result: any) => {
      if (result.data) {
        result.data.forEach((dt: any) => {
          const item = {
            id: dt.id,
            itemName: dt.name
          };
          this.selectDevicetypes.push(item);
        });
      } else {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.warning('Warning', 'To automatically create the callbacks, please create the Sigfox API connector first!', this.toasterconfig);
      }
    });
  }

  createDevAccessToken(): void {
    const newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.user.id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.user.devAccessTokens.push(accessToken);
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
      }
    );
    this.confirmTokenModal.hide();
  }

  toastClick() {
    if (this.toast)
      this.toasterService.clear(this.toast.toastId);
    this.toast = this.toasterService.info('Click', 'Copied to clipboard.');
  }

  ngOnDestroy(): void {
    console.log('Api: ngOnDestroy');
  }

}
