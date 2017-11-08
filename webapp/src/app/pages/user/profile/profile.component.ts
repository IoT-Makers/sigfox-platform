import {Component, OnDestroy, OnInit, Inject} from '@angular/core';
import {User, FireLoopRef} from "../../../shared/sdk/models";
import {UserApi} from "../../../shared/sdk/services/custom/User";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private callbackURL;
  private accessTokens;

  constructor(@Inject(DOCUMENT) private document: any, private userApi: UserApi) {

  }

  getUser(): void {
    this.user = this.userApi.getCachedCurrent();
    console.log(this.user);
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

    this.callbackURL = this.document.location.origin + "/api/Messages/";
    this.accessTokens = this.user.accessTokens;
  }

  ngOnDestroy(){

  }
}
