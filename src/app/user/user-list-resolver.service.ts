import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { IUser } from "./IUser";
import { UserService } from "./user.service";

@Injectable()
export class UserListResolverService implements Resolve<IUser[]> {
  constructor(private _userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUser[]> {
    return this._userService.getUsers();
  }
}

//step-1 create a resolver
//step-2 register route resolver service
