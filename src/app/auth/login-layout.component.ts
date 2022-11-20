import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthenticationService } from "../services";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-layout",
  templateUrl: "./login-layout.component.html",
  styleUrls: ["./login-layout.component.css"],
})
export class LoginLayoutComponent implements OnInit {
  constructor(
    private router: ActivatedRoute,
    private authService: AuthenticationService,
    private route: Router
  ) {}
  // user: any;
  ngOnInit() {
    // const user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log("hi this is ", user.id);
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
