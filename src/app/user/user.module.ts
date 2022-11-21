import { NgModule } from "@angular/core";

import { UserListComponent } from "./components/list/user-list.component";
import { UserLayoutComponent } from "./components/Layout/user-layout.component";
import { UserProfileComponent } from "./components/profile/user-profile.component";
import { AppRoutingModule } from "../app-routing.module";
import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UpperCase } from "../app.module";
import { RegistraionComponent } from "../auth/registraion.component";

@NgModule({
  imports: [UserRoutingModule, SharedModule],
  declarations: [
    UserLayoutComponent,
    UserListComponent,
    UserProfileComponent,
    UpperCase,
  ],
})
export class UserModule {}
