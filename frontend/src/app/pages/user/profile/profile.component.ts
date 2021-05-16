import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {OrganizationApi, RealTime, UserApi} from '../../../shared/sdk/services';
import {DOCUMENT} from '@angular/common';
import {Organization, User} from '../../../shared/sdk/models';
import {ToastrConfig, ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;

  private organization: Organization;
  public organizations: Organization[] = [];

  @ViewChild('avatarImg') avatarImg: ElementRef;
  @ViewChild('updatePasswordModal') updatePasswordModal: any;
  @ViewChild('updateUserModal') updateUserModal: any;
  @ViewChild('deleteUserModal') deleteUserModal: any;

  public oldPassword;
  public newPassword;
  public newPasswordConfirm;

  // Flag
  public organizationsReady: boolean = false;

  // Notifications
  private toast;
  private toasterService: ToastrService;
  public toasterconfig = {
    tapToDismiss: true,
    timeout: 5000,
    animation: 'fade'
  };

  constructor(@Inject(DOCUMENT) private document: any,
              private rt: RealTime,
              private userApi: UserApi,
              private organizationApi: OrganizationApi,
              toasterService: ToastrService,
              private translate: TranslateService,
              private router: Router) {
    this.toasterService = toasterService;
  }

  getUser(): void {
    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id, {}).subscribe((user: User) => {
      this.user = user;
    });
  }

  getOrganizations(): void {
    this.userApi.getOrganizations(this.user.id, {include: 'Members'}).subscribe((organizations: Organization[]) => {
      this.organizations = organizations;
      this.organizationsReady = true;
    });
  }

  updatePassword(): void {
    if (this.newPassword === this.newPasswordConfirm) {
      this.userApi.changePassword(this.oldPassword, this.newPassword).subscribe((result: any) => {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.success('Success', 'Password was successfully modified.', this.toasterconfig);
        this.updatePasswordModal.hide();
      }, (error: any) => {
        if (this.toast) {
          this.toasterService.clear(this.toast.toastId);
        }
        this.toast = this.toasterService.error('Error', error.message, this.toasterconfig);
      });
    } else {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', 'Please make sure the passwords match.', this.toasterconfig);
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
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Profile was updated successfully.', this.toasterconfig);
      this.updateUserModal.hide();
      //this.rt.onReady().subscribe();
    });
  }

  deleteUser(): void {
    this.userApi.deleteById(this.user.id).subscribe((value: any) => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Account was deleted successfully.', this.toasterconfig);
      this.deleteUserModal.hide();
    });

    this.userApi.logout().subscribe((result: any) => {
      this.router.navigate(['/login']);
    }, (error: any) => {
      console.log(error);
      this.router.navigate(['/login']);
    });
  }

  leaveOrganization(organization: Organization): void {
    this.userApi.unlinkOrganizations(this.user.id, organization.id).subscribe(result => {
      this.getOrganizations();
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Unlinked from organization successfully.', this.toasterconfig);
    }, (error: any) => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', error.message, this.toasterconfig);
    });
  }

  deleteOrganization(organization: Organization): void {
    this.organizationApi.deleteById(organization.id).subscribe(result => {
      console.log(result);
      this.getOrganizations();
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.success('Success', 'Organization was deleted successfully.', this.toasterconfig);
    }, (error: any) => {
      if (this.toast) {
        this.toasterService.clear(this.toast.toastId);
      }
      this.toast = this.toasterService.error('Error', error.message, this.toasterconfig);
    });
  }

  ngOnInit() {
    console.log('Profile: ngOnInit');

    // Get the logged in User object
    this.getUser();
    this.getOrganizations();
  }

  ngOnDestroy() {
    console.log('Profile: ngOnDestroy');
  }
}
