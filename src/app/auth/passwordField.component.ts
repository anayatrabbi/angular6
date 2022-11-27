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
    <button
      style="margin-right:10px;"
      class="btn btn-primary"
      type="button"
      (click)="onSubstruction()"
    >
      -
    </button>
    {{ quantity
    }}<button
      style="margin-left:10px;"
      class="btn btn-primary"
      type="button"
      (click)="onAdd()"
    >
      +
    </button>

    <div style="color:red;" *ngIf="formErrors.experience">
      {{ formErrors.experience }}
    </div>
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
  @Input() formErrors: any;
  @Input() quantity: number;

  onChange = (value: number) => {};
  onTouch = () => {};

  ngOnInit() {}

  onAdd() {
    this.quantity += 1;
    this.onChange(this.quantity);
  }
  onSubstruction() {
    this.quantity -= 1;
    this.onChange(this.quantity);
  }
  validate(control: AbstractControl): ValidationErrors | null {
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
