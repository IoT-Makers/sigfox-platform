import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserApi} from "../shared/sdk/services/custom/User";
import {Router} from "@angular/router";
import {User} from "../shared/sdk/models/User";
import {DeviceApi} from "../shared/sdk/services/custom/Device";
import {MessageApi} from "../shared/sdk/services/custom/Message";

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit, OnDestroy {

  public user: User = new User();
  private countDevices: number = 0;
  private countMessages: number = 0;

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  constructor(private userApi: UserApi,
              private deviceApi: DeviceApi,
              private messageApi: MessageApi,
              private router: Router) { }

  ngOnInit(): void {
    this.user = this.userApi.getCachedCurrent();
    this.deviceApi.count().subscribe(result => {
      this.countDevices = result.count;
    });
    this.messageApi.count().subscribe(result => {
      this.countMessages = result.count;
    });
  }

  ngOnDestroy(): void {
  }

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  onLogout(): void {
    this.userApi.logout().subscribe(() => {
      // some actions on logout
      this.router.navigate(['/login']);
    });
  }
}
