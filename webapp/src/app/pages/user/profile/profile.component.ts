import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {User, FireLoopRef} from "../../../shared/sdk/models";
import {UserApi} from "../../../shared/sdk/services/custom/User";
import {DOCUMENT} from "@angular/common";
import {OrganizationApi} from "../../../shared/sdk/services/custom/Organization";
import {forEach} from "@angular/router/src/utils/collection";
import {FullLayoutComponent} from "../../../layouts/full-layout.component";
import {LoginComponent} from "../login/login.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private callbackURL;
  private accessTokens;

  constructor(@Inject(DOCUMENT) private document: any,private userApi: UserApi, private organizationApi: OrganizationApi) {

  }

  ngOnInit() {

    this.user = LoginComponent.userStatic;
    console.log(this.user);

    this.callbackURL = this.document.location.origin + "/api/Messages/";
    this.accessTokens = this.user.accessTokens;
  }

  ngOnDestroy(){

  }
}
