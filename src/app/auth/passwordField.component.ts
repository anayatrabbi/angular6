import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";

@Component({
  selector: "input-password",
  template: ` <input id="password" type="password" class="form-control" /> `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputPasswordComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputPasswordComponent,
    },
  ],
})
export class InputPasswordComponent implements ControlValueAccessor, Validator {

    onChange = (value: any) => {};
    onTouch = () => {};

  validate(control: AbstractControl): ValidationErrors {
    throw new Error("Method not implemented.");
  }
  registerOnValidatorChange?(fn: () => void): void {
    throw new Error("Method not implemented.");
  }
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  password = "";
}
