//when we create a service we decoreate with injectable decoreator
//this decorator only needed if we habe any dependency

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { of } from "rxjs";
import { retryWhen, map, mergeMap, delay, catchError } from "rxjs/operators";
import { IUser } from "./IUser";

@Injectable()
export class UserService {
  constructor(private _httpClient: HttpClient) {}
  private listOfUser: IUser[] = [
    {
      id: 1,
      firstName: "anayat",
      lastName: "khan",
      email: "ana@asthait.com",
      password: "12345",
      role: "admin",
      skills: 
        {
          skillName: "c#",
          experience: 3,
        },
    },
  ];

  baseUrl = "http://localhost:3000/user";
  //we need to use observable as at real world we will get data from a server
  //and angular retrun observable
  getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this.baseUrl);
    // return of(this.listOfUser);
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.log("client side error", errorResponse.error);
    } else {
      console.log("server side error", errorResponse.error);
    }

    return throwError("there is a problem with service");
  }

  getUser(id: number): Observable<IUser> {
    return this._httpClient.get<IUser>(`${this.baseUrl}/${id}`);
  }

  deleteUser(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: IUser): Observable<void> {
    return this._httpClient
      .put<void>(`${this.baseUrl}/${user.id}`, user, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(this.handleError));
  }

  addUser(user: IUser): Observable<IUser> {
    console.log("registration method is callled", user);
    // this.listOfUser.push(user);
    return this._httpClient.post<IUser>(this.baseUrl, user, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    });
  }

  // registerUser() {
  //   console.log("lets register the value");
  // }
}

//aftere creating a service to use we need to register it
//we can reister a service at component level(only availabel at component)
// or module level(available at all component under this module level)
//we will use it at root module as we will use it at all module
//after register we can use it any component. so we will use it at listOf user component
