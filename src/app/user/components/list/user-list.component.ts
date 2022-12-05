import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewChildren,
} from "@angular/core";
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
  userList: any;
  totaluser: number;
  activePageNumber: number = 0;
  @ViewChild("teams") el: ElementRef;

  constructor(
    private _useService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  displayActivePageNumber(activeNumber: number) {
    this.activePageNumber = activeNumber;
    this._useService.getUsers(activeNumber, 5).subscribe((userList) => {
      this.users = userList;
      this.onSelected(this.el.nativeElement.value);
    });
  }

  ngOnInit() {
    this.userList = this._route.snapshot.data["userList"];
    this.users = this.userList.users;
    this.totaluser = this.userList.count;
  }

  editUser(user: IUser) {
    this._router.navigate(["edit", user.id]);
  }

  onSelected(selectedvalue: string) {
    const others = [];
    const filteredUsers = this.users.filter((item) => {
      if (item.role.toLowerCase() === selectedvalue.toLowerCase()) {
        return item;
      } else {
        others.push(item);
        return;
      }
    });
    this.users = [...filteredUsers, ...others];
  }

  deleteUser(user: IUser) {
    this._useService.deleteUser(user.id).subscribe(() => {
      const i = this.users.findIndex((e) => e.id === user.id);
      if (i !== -1) {
        this.users.splice(i, 1);
      }
    });
  }
}
