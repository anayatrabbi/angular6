import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { RegistraionComponent } from "./registraion.component";
import { LoginLayoutComponent } from "./login-layout.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  imports: [ReactiveFormsModule, AppRoutingModule],
  declarations: [LoginComponent, RegistraionComponent, LoginLayoutComponent],
})
export class LoginModule {}
