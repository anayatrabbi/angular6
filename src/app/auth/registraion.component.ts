import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { DISABLED } from "@angular/forms/src/model";
import { ActivatedRoute, Router } from "@angular/router";
import { Console } from "console";
import { Observable, of, Subject } from "rxjs";
import { AlertService } from "../services/alert.service";
import { IUser } from "../user/IUser";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-registraion",
  templateUrl: "./registraion.component.html",
  styleUrls: ["./registraion.component.css"],
})
export class RegistraionComponent implements OnInit {
  registrationForm: FormGroup;
  user: IUser;
  pageTitle: string = "Registration";
  buttonTitle: string = "Registration";
  disableEmailAtEdit = false;
  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _route: Router,
    private _alert: AlertService,
    private activateRoute: ActivatedRoute
  ) {}

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
      email: ["", [Validators.required, emailDomain("asthait.com")]],
      password: ["", [Validators.required]],
      role: ["admin", [Validators.required]],
      skills: this.fb.group({
        skillName: ["", Validators.required],
        experience: [
          0,
          [Validators.required, Validators.max(5), Validators.min(0)],
        ],
      }),
    });

    this.registrationForm.valueChanges.subscribe((data: any) => {
      this.logKeyValuePayers(this.registrationForm);
    });
    this.activateRoute.paramMap.subscribe((params) => {
      const id = +params.get("id");
      if (id) {
        this.getUser(id);
        this.pageTitle = "Edit user";
        this.buttonTitle = "Edit";
      } else {
        this.disableEmailAtEdit = false;
        this.user = {
          id: null,
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          skills: {
            skillName: "",
            experience: 0,
          },
          role: "",
        };
      }
    });
  }

  getUser(id: number) {
    this._userService.getUser(id).subscribe((user: IUser) => {
      this.editUser(user);
      this.user = user;
    });
  }

  editUser(user: IUser) {
    this.registrationForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role,
      skills: {
        skillName: user.skills["skillName"],
        experience: user.skills["experience"],
      },
    });
  }

  mapFormDataToUserModel() {
    this.user.firstName = this.registrationForm.value.firstName;
    this.user.lastName = this.registrationForm.value.lastName;
    this.user.email = this.registrationForm.value.email;
    this.user.password = this.registrationForm.value.password;
    this.user.role = this.registrationForm.value.role;
    this.user.skills = this.registrationForm.value.skills;
  }

  validationMessages = {
    firstName: {
      required: "Full Name is required",
      minlength: "minimun length is 4 letter",
      maxlength: "maximum length is 10 letter",
    },
    lastName: {
      required: "Last Name is required",
    },
    email: {
      required: "email is required",
      emailDomain: "your domain should have asthait.com",
    },
    password: {
      required: "Password is required",
    },
    role: {
      required: "Role is required",
    },
    skillName: {
      required: "SkillName is required",
    },
    experience: {
      required: "experience is required",
      min: "minimum experience is 0",
      max: "maximum experience is 5",
    },
  };

  formErrors = {
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    skillName: "",
    experienced: "",
  };

  logKeyValuePayers(group: FormGroup = this.registrationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControll = group.get(key);
      if (abstractControll instanceof FormGroup) {
        this.logKeyValuePayers(abstractControll);
      } else {
        this.formErrors[key] = "";
        if (
          abstractControll &&
          !abstractControll.valid &&
          (abstractControll.touched || abstractControll.dirty)
        ) {
          const message = this.validationMessages[key];
          for (const errorKey in abstractControll.errors) {
            if (errorKey) {
              this.formErrors[key] += message[errorKey] + " ";
            }
          }
        }
      }
    });
  }

  onSubmit(): void {
    this.mapFormDataToUserModel();
    this.logKeyValuePayers(this.registrationForm);
    if (this.registrationForm.dirty && this.registrationForm.valid) {
      this.uniqueEmailCheck(this.user.email).subscribe((uniqueEmail) => {
        if (uniqueEmail || this.user.id) {
          if (this.user.id) {
            this._userService.updateUser(this.user).subscribe((data) => {
              this._alert.success("user updated", true);
              this._route.navigate(["user"]);
            });
          } else {
            this._userService.addUser(this.user).subscribe((data: IUser) => {
              this._alert.success("registration successfull", true);
              this._route.navigate(["login"]);
            });
          }
        } else {
          this._alert.error("plese Enter a unique Email", true);
        }
      });
    } else {
      this._alert.error("plese fill all the field", true);
    }
  }

  uniqueEmailCheck(emailName: string): Observable<boolean> {
    let uniqueEmail = new Subject<boolean>();

    this._userService.getUsers().subscribe((data: IUser[]) => {
      const sameEmilaUser = data.filter((data: IUser) => {
        return data.email == emailName;
      });
      if (sameEmilaUser.length == 0) {
        uniqueEmail.next(true);
        uniqueEmail.complete();
      } else {
        uniqueEmail.next(false);
        uniqueEmail.complete();
      }
    });
    return uniqueEmail.asObservable();
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
