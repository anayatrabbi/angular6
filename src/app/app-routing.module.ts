import { NgModule } from "@angular/core";
//step1 import routermodule and routes
import { RouterModule, Routes } from "@angular/router";
import { LoginLayoutComponent } from "./auth/login-layout.component";
import { LoginComponent } from "./auth/login.component";
import { RegistraionComponent } from "./auth/registraion.component";
import { UserLayoutComponent } from "./user/components/Layout/user-layout.component";
import { UserListComponent } from "./user/components/list/user-list.component";
import { UserProfileComponent } from "./user/components/profile/user-profile.component";
import { UserListResolverService } from "./user/user-list-resolver.service";
//step-2
const routes: Routes = [
  {
    path: "",
    component: LoginLayoutComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "registration", component: RegistraionComponent },
    ],
  },
  {
    path: "user",
    component: UserLayoutComponent,
    children: [
      {
        path: "",
        component: UserListComponent,
        resolve: { userList: UserListResolverService },
      },
      { path: ":id", component: UserProfileComponent },
    ],
  },

  // { path: "", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [
    //step-4
    RouterModule.forRoot(routes),
  ],
  //we dont need declaration as we dont declare any components
  declarations: [],
  //step5
  //if we use <router-outlet> without exprting it we wont get that so we have to export it
  exports: [RouterModule],
})
export class AppRoutingModule {}
