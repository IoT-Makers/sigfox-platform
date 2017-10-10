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
  private userRef: FireLoopRef<User>;

  private callbackURL;

  constructor(@Inject(DOCUMENT) private document: any,private userApi: UserApi) {

  }

  ngOnInit() {

    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id).subscribe((user: User)=>{
      console.log(user);
      this.user = user;
    });
    this.callbackURL = this.document.location.origin + "/api/users/" + this.user.id + "/Messages?access_token=";

  }
}
