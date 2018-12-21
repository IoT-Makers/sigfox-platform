import {Injectable} from '@angular/core';
import {User} from "../shared/sdk/models";

@Injectable({
  providedIn: 'root',
})

export class UserService {

  private user: User;
  private admin: Boolean = false;

  constructor() {
  }

  setAdmin(isAdmin: Boolean): void {
    this.admin = isAdmin;
  }

  isAdmin(): Boolean {
    return this.admin;
  }

  setCurrentUser(user: User): void {
    this.user = user;
  }

  getCurrentUser(): User {
    return this.user;
  }
}
