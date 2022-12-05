import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { forkJoin, Observable, of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import { IUser } from "./IUser";
import { UserService } from "./user.service";

@Injectable()
export class UserListResolverService implements Resolve<any> {
  constructor(private _userService: UserService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return forkJoin([
      this._userService.getUsers(),
      this._userService.getAllUsers(),
    ]).pipe(
      mergeMap((x) => {
        if (x) {
          let result: any = {
            users: x[0],
            count: x[1].length,
          };
          return of(result);
        }
      })
    );
  }
}

//step-1 create a resolver
//step-2 register route resolver service
