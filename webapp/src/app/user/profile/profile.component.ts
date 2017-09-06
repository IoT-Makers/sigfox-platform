import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/sdk/models/User";
import {isNullOrUndefined} from "util";
import {UserApi} from "../../shared/sdk/services/custom/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = new User();

  constructor(private userApi: UserApi) { }

  ngOnInit() {
    this.user = this.userApi.getCachedCurrent();
  }
}
