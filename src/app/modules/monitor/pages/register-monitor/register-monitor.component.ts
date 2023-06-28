import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../api/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../api/services/api.service';
import {Observable} from 'rxjs';
import {GoogleAnalyticsService} from '../../../../services/google-analytics.service';
import {PhoneInputComponent, PhoneNumber} from "../../../shared/components/phone-input/phone-input.component";
import {HttpErrorResponse} from "@angular/common/http";
import {BreakpointService, Devices} from "../../../../services/breakpoint.service";
import {StepperOrientation} from "@angular/cdk/stepper";

@Component(
  {
    selector: 'app-register-monitor',
    templateUrl: './register-monitor.component.html',
    styleUrls: ['./register-monitor.component.scss']
  }
)
export class RegisterMonitorComponent implements OnInit {

  stepperOrientation: StepperOrientation = 'horizontal';

  hidePassword = true;
  hidePassword2 = true;

  showLoader = false;
  shaking = false;

  identityForm = this.fb.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
  });

  contactForm = this.fb.group({
    username: ['', [Validators.required, Validators.email], this.validateUsernameAvailable.bind(this)],
    phone: [new PhoneNumber('33', '', '', '', '', ''), [PhoneInputComponent.validator]],
  });

  passwordForm = this.fb.group(
    {
      password: ['', [Validators.required]],
      password2: ['', [Validators.required, this.validateSamePassword.bind(this)]],
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private api: ApiService,
    private gtag: GoogleAnalyticsService,
    private snackBar: MatSnackBar,
    private breakpointService: BreakpointService,
  ) {
    this
      .breakpointService
      .getDeviceSubject()
      .subscribe(device => {
        console.log(device);
        if (device === Devices.smallMobile || device === Devices.largeMobile) {
          this.stepperOrientation = 'vertical';
        } else {
          this.stepperOrientation = 'horizontal';
        }
      });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        if (params['username'] !== undefined) {
          this.getUsername()?.setValue(params['username']);
        }
      }
    );
  }

  validateUsernameAvailable(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable<ValidationErrors | null>(subscriber => {
      this
        .api
        .users()
        .checkAccountExist(control.value)
        .subscribe({
          next: () => {
            subscriber.next(null);
            subscriber.complete();
          },
          error: () => {
            subscriber.next({used: true});
            subscriber.complete();
          },
        });
    });
  }

  validateSamePassword(control: AbstractControl): ValidationErrors | null {
    if (control.value === '' || control.value === null) {
      return {
        ['invalid']: 'invalid format'
      };
    }

    if (this.getPassword()?.value !== control.value) {
      return {
        ['different']: 'password different'
      };
    }

    return null;
  }

  getFirstname(): AbstractControl | null {
    return this.identityForm.get('firstname');
  }

  getLastname(): AbstractControl | null {
    return this.identityForm.get('lastname');
  }

  getUsername(): AbstractControl | null {
    return this.contactForm.get('username');
  }

  getPhone(): AbstractControl | null {
    return this.contactForm.get('phone');
  }

  getPassword(): AbstractControl | null {
    return this.passwordForm.get('password');
  }

  getPassword2(): AbstractControl | null {
    return this.passwordForm.get('password2');
  }

  /**
   * triggered when field invalid an edited
   */
  hasError(field: AbstractControl | null): boolean {
    if (field === null) {
      return false;
    }

    return (field.dirty || field.touched) && !field.valid;
  }

  hasErrorInForm() {
    return this.hasError(this.getUsername()) ||
      this.hasError(this.getPassword2());
  }

  isRegisterValid() {
    // as it was programmatically called, form can be set as dirty
    this.getFirstname()?.markAsDirty();
    this.getLastname()?.markAsDirty();

    this.getUsername()?.markAsDirty();
    this.getPhone()?.markAsDirty();

    this.getPassword()?.markAsDirty();
    this.getPassword2()?.markAsDirty();

    // trigger form validation
    this.identityForm.updateValueAndValidity();
    this.contactForm.updateValueAndValidity();
    this.passwordForm.updateValueAndValidity();

    return this.identityForm.valid && this.contactForm.valid && this.passwordForm.valid;
  }

  onSubmit() {
    if (!this.isRegisterValid()) {
      return;
    }

    this.showLoader = true;

    this
      .auth
      .registerMonitor(
        this.getFirstname()?.value,
        this.getLastname()?.value,
        this.getPhone()?.value.toString(),
        this.getUsername()?.value,
        this.getPassword()?.value
      )
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.showLoader = false;
          this.shaking = true;
          this.snackBar.open(`[${err.status}] Une erreur est survenue lors de l'inscription`, 'OK');
        }
      });
  }

}
