import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {User, AccessToken,FireLoopRef} from "../../../shared/sdk/models";
import {UserApi} from "../../../shared/sdk/services/custom/User";
import {DOCUMENT} from "@angular/common";
import {AccessTokenApi} from "../../../shared/sdk/services/custom/AccessToken";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private devAccessToken = new AccessToken();
  private callbackURL;

  constructor(@Inject(DOCUMENT) private document: any, private userApi: UserApi, private accessTokenApi: AccessTokenApi) {

  }

  getUser(): void {
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
  }

  getDevAccessToken(): void{
    this.userApi.getAccessTokens(this.user.id,{where:{"ttl":-1}}).subscribe((accessToken: AccessToken) => {
      console.log(accessToken);
      this.devAccessToken = accessToken[0];
    });
  }

  createDevAccessToken(): void {
    let newAccessToken = {
      ttl: -1
    };
    this.userApi.createAccessTokens(this.user.id, newAccessToken).subscribe((accessToken: AccessToken) => {
      this.devAccessToken = accessToken;
    });
  }

  deleteDevAccessToken(): void {
    //this.accessTokenApi.deleteById(this.devAccessToken.id).subscribe();
    this.userApi.deleteAccessTokens(this.devAccessToken.id).subscribe();
  }

  /*  getUser(): void {
      let userId = this.userApi.getCachedCurrent().id;
      this.userApi.findById(userId).subscribe((user: User) => {
        this.user = user;
        console.log(this.user);
      });
    }*/

  ngOnInit() {
    // Get the logged in User object (avatar, email, ...)
    this.getUser();
    this.getDevAccessToken();

    this.callbackURL = this.document.location.origin + "/api/Messages/sigfox";
    //this.accessTokens = this.user.accessTokens;
  }

  ngOnDestroy(){

  }
}
