import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AlertService } from "../services/alert.service";

@Component({
    selector: 'alert',
    templateUrl:'./alert.component.html'
})
export class AlertComponent implements OnInit , OnDestroy{
    private subscription : Subscription;
    message: any;

    constructor(private alertService : AlertService){
        
    }

    ngOnInit(): void {
        this.subscription = this.alertService.getMessage().subscribe(message=>{
            this.message = message;
        })
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}