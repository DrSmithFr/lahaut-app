import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../api/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../api/services/api.service';
import {Observable} from 'rxjs';
import {GoogleAnalyticsService} from '../../../../services/google-analytics.service';
import {HttpErrorResponse} from "@angular/common/http";
import {UnsubscribeOnDestroyComponent} from "../../../_shared/components/unsubscribe-on-destroy.component";

@Component(
  {
    selector: 'app-register-customer',
    templateUrl: './register-customer.component.html',
    styleUrls: ['./register-customer.component.scss']
  }
)
export class RegisterCustomerComponent extends UnsubscribeOnDestroyComponent implements OnInit {
  @Input() autoRedirect = true;
  @Output() registration = new EventEmitter<void>();

  showLoader = false;
  shaking = false;

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.email], this.validateUsernameAvailable.bind(this)],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required, this.validateSamePassword.bind(this)]],
    }
  );

  hidePassword = true;
  hidePassword2 = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private api: ApiService,
    private gtag: GoogleAnalyticsService,
    private snackBar: MatSnackBar,
  ) {
    super();
  }

  ngOnInit(): void {
    const s = this
      .route
      .queryParams
      .subscribe(params => {
          if (params['username'] !== undefined) {
            this.getUsername()?.setValue(params['username']);
          }
        }
      );

    this.unsubscribeOnDestroy(s);
  }

  validateUsernameAvailable(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable<ValidationErrors | null>(subscriber => {
      const s = this
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

      this.unsubscribeOnDestroy(s);
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

  getUsername(): AbstractControl | null {
    return this.registerForm.get('username');
  }

  getPassword(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  getPassword2(): AbstractControl | null {
    return this.registerForm.get('password2');
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

  isFormValid() {
    // as it was programmatically called, form can be set as dirty
    this.getUsername()?.markAsDirty();
    this.getPassword()?.markAsDirty();
    this.getPassword2()?.markAsDirty();

    // trigger form validation
    this.registerForm.updateValueAndValidity();

    return this.registerForm.valid;
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.showLoader = true;

    this
      .auth
      .registerCustomer(
        this.getUsername()?.value,
        this.getPassword()?.value,
        this.autoRedirect
      )
      .subscribe({
        next: () => {
          this.showLoader = false;
          this.registration.emit();
        },
        error: (err: HttpErrorResponse) => {
          this.showLoader = false;
          this.shaking = true;
          this.snackBar.open(`[${err.status}] Une erreur est survenue lors de l'inscription`, 'OK');
        }
      })
      .unsubscribe();
  }

}
