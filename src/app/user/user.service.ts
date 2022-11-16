//when we create a service we decoreate with injectable decoreator
//this decorator only needed if we habe any dependency

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs";
import { retryWhen, map, mergeMap, delay } from "rxjs/operators";
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
      skills: [
        {
          skillName: "c#",
          experience: "3",
        },
      ],
    },
  ];

  baseUrl = "http://localhost:3000/user";
  //we need to use observable as at real world we will get data from a server
  //and angular retrun observable
  getUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(this.baseUrl);
    // return of(this.listOfUser);
  }

  //   registerUser(user: IUser) {
  //     this.listOfUser.push(user);
  //   }
  registerUser() {
    console.log("lets register the value");
  }
}

//aftere creating a service to use we need to register it
//we can reister a service at component level(only availabel at component)
// or module level(available at all component under this module level)
//we will use it at root module as we will use it at all module
//after register we can use it any component. so we will use it at listOf user component
