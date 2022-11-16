import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-registraion",
  templateUrl: "./registraion.component.html",
  styleUrls: ["./registraion.component.css"],
})
export class RegistraionComponent implements OnInit {
  registrationForm: FormGroup;
  //we need to inject service class at constructor
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _route: Router
  ) {}

  //Invoked when given component has been initialized.
  //This hook is only called once after the first ngOnChanges
  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      lastName: ["", [Validators.required]],
      email: ["", [Validators.required, emailDomain("dell.com")]],
      password: [""],
      role: ["admin", [Validators.required]],
      skills: this.fb.group({
        skillName: [""],
        experience: [""],
      }),
    });
    //we can observe any form control and group also by valueChanges we can use it at error validation and many task
    // this.registrationForm.get('firstName').valueChanges.subscribe((value: string)=>{
    //   console.log(value)
    // })

    this.registrationForm.valueChanges.subscribe((data: any) => {
      this.logKeyValuePayers(this.registrationForm);
    });
  }

  //we can keep some validation msg , and checking it for loop we will populate anothe object and will show it at browser

  validationMessages = {
    firstName: {
      required: "Full Name is required",
      minlength: "minimun length",
      maxlength: "maximum length",
    },
    lastName: {
      required: "Last Name is required",
    },
    email: {
      required: "email is required",
      emailDomain: "you are not varified",
    },
    role: {
      required: "Role is required",
    },
  };

  formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };
  //passing default value here
  logKeyValuePayers(group: FormGroup = this.registrationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControll = group.get(key);
      if (abstractControll instanceof FormGroup) {
        this.logKeyValuePayers(abstractControll);
      } else {
        this.formErrors[key] = "";
        // console.log('key =' + key+ 'value =' + abstractControll)
        if (
          abstractControll &&
          !abstractControll.valid &&
          (abstractControll.touched || abstractControll.dirty)
        ) {
          const message = this.validationMessages[key];
          console.log(message);
          for (const errorKey in abstractControll.errors) {
            console.log(errorKey);
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + " ";
            }
          }
        }
      }
    });
  }

  onSubmit(): void {
    this.logKeyValuePayers(this.registrationForm);
    console.log(this.formErrors);
    this._userService.registerUser();
    this._route.navigate(["user"]);
  }
}

function emailDomain(domainName: string) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf("@") + 1);
    if (email == "" || domain.toLowerCase() === domainName) {
      return null;
    } else {
      return { emailDomain: true };
    }
  };
}
