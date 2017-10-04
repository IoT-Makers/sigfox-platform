import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, FireLoopRef} from "../../../shared/sdk/models";
import {UserApi} from "../../../shared/sdk/services/custom/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private userRef: FireLoopRef<User>;

  constructor(private userApi: UserApi) {

  }

  ngOnInit() {
    this.user = this.userApi.getCachedCurrent();
    this.userApi.findById(this.user.id).subscribe((user: User)=>{
      console.log(user);
      this.user = user;
    });

  }
}
