import { Component, Input, OnInit } from "@angular/core";
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from "@angular/forms";

@Component({
  selector: "input-increment",
  template: `
    <!-- <input id="password" type="password" class="form-control" />
    <div>{{ password }}</div> -->
    <button class="btn btn-primary" (click)="onSubstruction()">-</button>
    {{ quantity }}<button class="btn btn-primary" (click)="onAdd()">+</button>
  `,
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
export class InputPasswordComponent
  implements OnInit, ControlValueAccessor, Validator
{
  quantity: number;

  onChange = (value: number) => {};
  onTouch = () => {};

  ngOnInit() {
    this.quantity = 0;
  }

  onAdd() {
    this.quantity += 1;
    console.log(this.quantity);
    this.onChange(this.quantity);
  }
  onSubstruction() {
    this.quantity -= 1;
    this.onChange(this.quantity);
  }
  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      console.log(control.value);
      return {
        mustBepositive: quantity,
      };
    }
    return control.value;
  }

  writeValue(value: number): void {
    this.quantity = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
}
