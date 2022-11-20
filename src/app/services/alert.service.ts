import { Injectable } from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Injectable()
export class AlertService{
    private subject = new Subject<any>();
    private keepAfterNavigation = false;

    constructor(private router: Router){
        router.events.subscribe(event =>{
            if(event instanceof NavigationStart){
                if(this.keepAfterNavigation){
                    this.keepAfterNavigation = false;
                }
                else{
                    this.subject.next()
                }
            }
        });
    }

    success(message: string , keepAfterNavigation = false){
        this.keepAfterNavigation = keepAfterNavigation;
        this.subject.next({type:'success' , text: message});
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigation = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}