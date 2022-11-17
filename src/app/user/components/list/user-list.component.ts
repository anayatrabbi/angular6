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
  ) {}

  ngOnInit() {
    //as it is observable so we need to subscribe on it
    //now we are using resolver so we dont need to use service here
    // this._useService
    //   .getUsers()
    //   .subscribe((userList) => (this.users = userList));
    this.users = this._route.snapshot.data["userList"];
    console.log(this.users);
  }

  editUser(user: IUser) {}

  deleteUser(user: IUser) {
    this._useService.deleteUser(user.id).subscribe(() => {
      console.log(`employee id  ${user.id} is deleted`);
      const i = this.users.findIndex((e) => e.id === user.id);
      if (i !== -1) {
        this.users.splice(i, 1);
      }
    });
  }
}
