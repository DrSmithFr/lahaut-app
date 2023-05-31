/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-non-null-assertion */

import {Component, ElementRef, HostBinding, Inject, Input, OnDestroy, Optional, Self, ViewChild} from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgControl,
  ReactiveFormsModule, ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  MAT_FORM_FIELD,
  MatFormField,
  MatFormFieldControl,
} from '@angular/material/form-field';
import { Subject } from 'rxjs';

/** Data structure for holding telephone number. */
export class PhoneNumber {
  constructor(
    public indicative: string,
    public type: string,
    public part1: string,
    public part2: string,
    public part3: string,
    public part4: string,
  ) {
  }

  toString(): string {
    return `+${this.indicative}${this.type}${this.part1}${this.part2}${this.part3}${this.part4}`;
  }
}

/** Custom `MatFormFieldControl` for telephone number input. */
@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
  providers: [{provide: MatFormFieldControl, useExisting: PhoneInputComponent}],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class PhoneInputComponent implements ControlValueAccessor, MatFormFieldControl<PhoneNumber>, OnDestroy {
  @HostBinding('id') htmlId = `app-phone-input-${PhoneInputComponent.nextId++}`;
  @HostBinding('class.floating') floating = this.shouldLabelFloat;

  static validator(control: AbstractControl): ValidationErrors | null {
    if (
      control.value === null ||
      control.value.indicative === '' || control.value.indicative === null ||
      control.value.type === '' || control.value.type === null ||
      control.value.part1 === '' || control.value.part1 === null ||
      control.value.part2 === '' || control.value.part2 === null ||
      control.value.part3 === '' || control.value.part3 === null ||
      control.value.part4 === '' || control.value.part4 === null
    ) {
      return {
        ['invalid']: 'invalid number'
      };
    }

    return null;
  }

  static nextId = 0;
  @ViewChild('indicatif') indicatifInput: HTMLInputElement;
  @ViewChild('type') typeInput: HTMLInputElement;
  @ViewChild('part1') part1Input: HTMLInputElement;
  @ViewChild('part2') part2Input: HTMLInputElement;
  @ViewChild('part3') part3Input: HTMLInputElement;
  @ViewChild('part4') part4Input: HTMLInputElement;

  parts: FormGroup<{
    indicatif: FormControl<string | null>;
    type: FormControl<string | null>;
    part1: FormControl<string | null>;
    part2: FormControl<string | null>;
    part3: FormControl<string | null>;
    part4: FormControl<string | null>;
  }>;

  stateChanges = new Subject<void>();
  focused = false;
  touched = false;
  controlType = 'app-phone-input';
  id = `app-phone-input-${PhoneInputComponent.nextId++}`;
  onChange = (_: any) => {};
  onTouched = () => {};

  get empty() {
    const {
      value: {indicatif, type, part1, part2, part3, part4},
    } = this.parts;

    return !indicatif && !type && !part1 && !part2 && !part3 && !part4;
  }

  get shouldLabelFloat() {
    return true;
  }

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  private _placeholder: string;

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input()
  get value(): PhoneNumber | null {
    if (this.parts.valid && this.parts.dirty) {
      const {
        value: {indicatif, type, part1, part2, part3, part4},
      } = this.parts;

      return new PhoneNumber(indicatif!, type!, part1!, part2!, part3!, part4!);
    }

    return null;
  }
  set value(tel: PhoneNumber | null) {
    const {indicative, type, part1, part2, part3, part4} = tel || new PhoneNumber('', '', '', '', '', '');
    this.parts.setValue({indicatif: indicative, type, part1, part2, part3, part4});
    this.stateChanges.next();
  }

  get errorState(): boolean {
    return this.parts.invalid && this.parts.dirty && this.touched;
  }

  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Inject(MAT_FORM_FIELD) public _formField: MatFormField,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.parts = formBuilder.group({
      indicatif: ['', [Validators.required, Validators.pattern(/\d{2}/), Validators.minLength(2), Validators.maxLength(2)]],
      type: ['', [Validators.required, Validators.pattern(/\d/), Validators.minLength(1), Validators.maxLength(1)]],
      part1: ['', [Validators.required, Validators.pattern(/\d{2}/), Validators.minLength(2), Validators.maxLength(2)]],
      part2: ['', [Validators.required, Validators.pattern(/\d{2}/), Validators.minLength(2), Validators.maxLength(2)]],
      part3: ['', [Validators.required, Validators.pattern(/\d{2}/), Validators.minLength(2), Validators.maxLength(2)]],
      part4: ['', [Validators.required, Validators.pattern(/\d{2}/), Validators.minLength(2), Validators.maxLength(2)]],
    });
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  onFocusIn() {
    if (!this.focused) {
      this.focused = true;
      this.stateChanges.next();
    }
  }

  onFocusOut(event: FocusEvent) {
    if (!this._elementRef.nativeElement.contains(event.relatedTarget as Element)) {
      this.touched = true;
      this.focused = false;
      this.onTouched();
      this.stateChanges.next();
    }
  }

  autoFocusNext(control: AbstractControl, nextElement?: HTMLInputElement): void {
    if (!control.errors && nextElement) {
      this._focusMonitor.focusVia(nextElement, 'program');
    }
  }

  autoFocusPrev(control: AbstractControl, prevElement: HTMLInputElement): void {
    if (control.value.length < 1) {
      this._focusMonitor.focusVia(prevElement, 'program');
    }
  }

  setDescribedByIds(ids: string[]) {
    const controlElement = this._elementRef.nativeElement.querySelector(
      '.phone-input-container',
    )!;
    controlElement.setAttribute('aria-describedby', ids.join(' '));
  }

  onContainerClick() {
    if (this.parts.controls.part4.valid) {
      this._focusMonitor.focusVia(this.part4Input, 'program');
    } else if (this.parts.controls.part3.valid) {
      this._focusMonitor.focusVia(this.part3Input, 'program');
    } else if (this.parts.controls.part2.valid) {
      this._focusMonitor.focusVia(this.part2Input, 'program');
    } else if (this.parts.controls.part1.valid) {
      this._focusMonitor.focusVia(this.part1Input, 'program');
    } else if (this.parts.controls.type.valid) {
      this._focusMonitor.focusVia(this.part1Input, 'program');
    } else if (this.parts.controls.indicatif.valid) {
      this._focusMonitor.focusVia(this.typeInput, 'program');
    } else {
      this._focusMonitor.focusVia(this.indicatifInput, 'program');
    }
  }

  writeValue(tel: PhoneNumber | null): void {
    this.value = tel;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(control: AbstractControl, nextElement?: HTMLInputElement): void {
    this.autoFocusNext(control, nextElement);
    this.onChange(this.value);
  }
}
