import { Component, OnInit } from '@angular/core';
import {UserApi} from "../shared/sdk/services/custom/User";
import {Router} from "@angular/router";

@Component({
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  constructor(private userApi: UserApi, private router: Router) { }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};


  ngOnInit(): void {}

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
