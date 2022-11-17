import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IUser } from "../../IUser";
import { UserService } from "../../user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  user: IUser;

  constructor(
    private route: ActivatedRoute,
    private _userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this._userService.getUser(params.id).subscribe((data) => {
        this.user = data;
      });
    });
  }
}
