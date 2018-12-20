import {Injectable} from '@angular/core';
import {User} from "../shared/sdk/models";

@Injectable({
  providedIn: 'root',
})

export class UserService {

  public user: User;

  constructor() {
  }
}
