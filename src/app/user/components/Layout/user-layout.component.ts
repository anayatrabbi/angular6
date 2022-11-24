import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.css"],
})
export class UserLayoutComponent implements OnInit {
  constructor(private authService: AuthenticationService , private route : Router) {}
  isAdmin: boolean = false;
  isUser: boolean = false;
  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    console.log(currentUser);
    if (currentUser.role == "admin") {
      this.isAdmin = true;
    } else {
      this.isUser = true;
    }
  }

  onProfileClick(): void {
    this.route.navigate([
      `user/${JSON.parse(localStorage.getItem("currentUser")).id}`,
    ]);
  }

  onLogout(): void {
    this.authService.logout();
  }
}
