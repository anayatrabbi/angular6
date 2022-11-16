import { BrowserModule } from '@angular/platform-browser';
import { Input, NgModule, Output , EventEmitter } from '@angular/core';

import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { LoginComponent } from './auth/login.component';
import { RegistraionComponent } from './auth/registraion.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginLayoutComponent } from './auth/login-layout.component';

// @Component({
//   selector:"joker",
//   template:`<div>
//   <h2>{{data.setup}}</h2>
//   <p [hidden]="data.hide">{{data.punchline}}</p>
//   <a (click)="data.toggle()">hide</a> </div>`,

// })
// export class JokerComponent{
//   //input to take input from anothee components
//   @Input('joke')data : jokes
//   //string interpolation
//   constructor(){
//   }
// }

// class jokes {
//   public setup: string;
//   public punchline: string;
//   public hide: boolean;

//   constructor(setup: string , punchline: string){
//     this.setup = setup;
//     this.punchline = punchline;
//     this.hide = true;
//   }

//   toggle(){
//     this.hide = !this.hide;
//   }
// }

// @Component({
//   selector:'joker-list',
//   template:`
//   <joker-form (jokerCreated)="addJoke($event)"></joker-form>
//   <joker *ngFor="let j of jokes" [joke]="j"></joker>
// `
// })

// export class JokerListComponents{
//   jokes:jokes[];
//   //() output property binding
//   //[] input property bindings
//   constructor(){
//     this.jokes = [
//       new jokes("What did the cheese say when it looked in the mirror?", "Hello-me (Halloumi)"),
//       new jokes("What kind of cheese do you use to disguise a small horse?", "Mask-a-pony (Mascarpone)"),
//       new jokes("A kid threw a lump of cheddar at me", "I thought ‘That’s not very mature’"),
//     ];
//   }

//   addJoke(joke: any){
//     this.jokes.unshift(joke)
//   }
// }

// @Component({
//   selector:"joker-form",
//   template: `
//   <div class="card card-block">
//     <h4 class="card-title">Create Joke</h4>
//     <div class="form-group">
//       <input type="text"
//              class="form-control"
//              placeholder="Enter the setup"
//              #setup>
//     </div>
//     <div class="form-group">
//       <input type="text"
//              class="form-control"
//              placeholder="Enter the punchline"
//              #punchline>
//     </div>
//     <button (click)="createJoke(setup.value , punchline.value)"> create</button>
//   </div>
//     `
// })
// class JokerForm{
//   @Output() jokerCreated = new EventEmitter<jokes>();

//   createJoke(setup: string , punchline: string ){
//     this.jokerCreated.emit(new jokes(setup , punchline));
//     console.log(setup)
//     console.log(punchline)
//   }
//   // createJoke(setup: string , punchline: string){
//   //   console.log(setup)
//   //   console.log(punchline)
//   // }
// }

@NgModule({
  //The list of components or directives belonging to this module.
  declarations: [
    AppComponent,
    LoginComponent,
    RegistraionComponent,
    LoginLayoutComponent
  ],
  //the other angualr modules that export material we need in this angular module.
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],

  providers: [],
  //Identifies the root component that Angular should bootstrap when it starts the application.
  bootstrap: [AppComponent]
})
export class AppModule { }
