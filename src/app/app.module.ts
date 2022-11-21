import { BrowserModule } from "@angular/platform-browser";
import {
  Input,
  NgModule,
  Output,
  EventEmitter,
  Pipe,
  PipeTransform,
} from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";

import { UserService } from "./user/user.service";
import { UserListResolverService } from "./user/user-list-resolver.service";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login.component";
import { RegistraionComponent } from "./auth/registraion.component";
import { LoginLayoutComponent } from "./auth/login-layout.component";
import { AlertService } from "./services/alert.service";
import { AlertComponent } from "./directives";
import { ErrorInterceptor } from "./helper/error.interceptor";
import { HighLightError } from "./directives/error-highlight.directives";

@Pipe({
  name: "Uppercase",
})
export class UpperCase implements PipeTransform {
  transform(value: string): string {
    return value.toUpperCase();
  }
}

@NgModule({
  //The list of components or directives belonging to this module.
  declarations: [
    AppComponent,
    LoginComponent,
    RegistraionComponent,
    LoginLayoutComponent,
    AlertComponent,
    HighLightError,
  ],
  //the other angualr modules that export material we need in this angular module.
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [RegistraionComponent],
  providers: [
    UpperCase,
    UserService,
    UserListResolverService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  //Identifies the root component that Angular should bootstrap when it starts the application.
  bootstrap: [AppComponent],
})
export class AppModule {}
