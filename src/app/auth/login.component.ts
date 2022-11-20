import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../services";
import { AlertService } from "../services/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private authservice: AuthenticationService , private _alertService: AlertService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  onSubmit(): void {
    if(this.loginForm.dirty){
      this.authservice.login({
        email: this.loginForm.get("email").value,
        password: this.loginForm.get("password").value,
      });
    }
    else{
      this._alertService.error("please fill all the fields correctly" , true)
    }
  }

  onLogout(): void {
    this.authservice.logout();
  }
}
