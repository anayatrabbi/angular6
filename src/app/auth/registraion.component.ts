import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validator,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
      email: ["", [Validators.required, emailDomain("dell.com")]],
      password: [""],
      role: ["admin", [Validators.required]],
      skills: this.fb.group({
        skillName: [""],
        experience: [""],
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
        this.user = {
          id: null,
          firstName: "",
          lastName: "",
          password: "",
          email: "",
          skills: [],
          role: "",
        };
      }
    });
  }

  getUser(id: number) {
    this._userService.getUser(id).subscribe((user: IUser) => {
      this.editUser(user);
      console.log(user);
      this.user = user;
      console.log(this.user);
    });
  }

  editUser(user: IUser) {
    this.registrationForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
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
    if (this.registrationForm.dirty) {
      this.logKeyValuePayers(this.registrationForm);
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
      this._alert.error("plese fill all the field", true);
    }
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
