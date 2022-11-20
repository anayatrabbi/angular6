import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { IUser } from "../user/IUser";
import { Observable } from "rxjs";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UserService
  ) {}

  login(logInuser) {

    return this.userService.getUsers().subscribe((data) => {
      data.map((data) => {
        console.log(data);
        if (
          data.email == logInuser.email &&
          data.password == logInuser.password
        ) {
          localStorage.setItem(
            "currentUser",
            JSON.stringify({
              email: data.email,
              password: data.password,
              role: data.role,
              id: data.id,
            })
          );
          console.log("validate data", data);
          if (data.role == "admin") {
            this.router.navigate(["/user"]);
          } else if (data.role == "user") {
            this.router.navigate([`/user/${data.id}`]);
          }
        }
      });
    });
  }

  logout() {
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }
}
