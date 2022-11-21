import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services";
import { AlertService } from "../services/alert.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.error instanceof ErrorEvent) {
          this.alertService.error(`${err.error.message}`, false);
        } else {
          this.alertService.error(
            `message: ${err.error.message} code: ${err.error.status}`,
            false
          );
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
