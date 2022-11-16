import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { IUser } from "../../IUser";
import { UserService } from "../../user.service";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: IUser[];
  constructor(
    private _useService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.users = this._route.snapshot.data["userList"];
  }

  ngOnInit() {
    //as it is observable so we need to subscribe on it
    //now we are using resolver so we dont need to use service here
    // this._useService
    //   .getUsers()
    //   .subscribe((userList) => (this.users = userList));
    console.log(this.users);
  }
}
