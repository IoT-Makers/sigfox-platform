import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category, Device, FireLoopRef, User} from '../../shared/sdk/models';
import {CategoryApi, DeviceApi, RealTime, UserApi} from '../../shared/sdk/services';

@Component({
  selector: 'app-messages',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit, OnDestroy {

  private user: User;
  private users: User[] = [];


  constructor(private rt: RealTime,
              private userApi: UserApi) {

  }

  ngOnInit(): void {
    console.log('Admin: ngOnInit');

    // Real Time
    if (this.rt.connection.isConnected() && this.rt.connection.authenticated)
      this.setup();
    else
      this.rt.onAuthenticated().subscribe(() => this.setup());

  }

  setup(): void {
    this.user = this.userApi.getCachedCurrent();
    this.userApi.find({include: "roles", order: 'updatedAt DESC'}).subscribe((users: User[]) => {
      this.users = users;
      console.log(users);
    });
  }


  ngOnDestroy(): void {
    console.log('Admin: ngOnDestroy');
  }

}

