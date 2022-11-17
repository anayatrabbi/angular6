import { NgModule } from "@angular/core";
//step1 import routermodule and routes
import { RouterModule, Routes } from "@angular/router";
import { UserLayoutComponent } from "./components/Layout/user-layout.component";
import { UserListComponent } from "./components/list/user-list.component";
import { UserProfileComponent } from "./components/profile/user-profile.component";
import { UserListResolverService } from "./user-list-resolver.service";
//step-2
const routes: Routes = [
  {
    path: "",
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
    RouterModule.forChild(routes),
  ],
  //we dont need declaration as we dont declare any components
  declarations: [],
  //step5
  //if we use <router-outlet> without exprting it we wont get that so we have to export it
  exports: [RouterModule],
})
export class UserRoutingModule {}
