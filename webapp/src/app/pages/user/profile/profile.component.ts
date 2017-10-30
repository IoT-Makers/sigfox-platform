import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {User, FireLoopRef} from "../../../shared/sdk/models";
import {UserApi} from "../../../shared/sdk/services/custom/User";
import {DOCUMENT} from "@angular/common";
import {OrganizationApi} from "../../../shared/sdk/services/custom/Organization";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private userRef: FireLoopRef<User>;

  private callbackURLbase;

  constructor(@Inject(DOCUMENT) private document: any,private userApi: UserApi, private organizationApi: OrganizationApi) {

  }

  ngOnInit() {

    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
    this.userApi.findById(this.user.id, {include: ['Organizations', 'accessTokens']}).subscribe((user: User)=>{

      this.user = user;
      console.log(this.user);
    });

    this.callbackURLbase = this.document.location.origin + "/api/Organizations/";
  }

  ngOnDestroy(){

  }
}
