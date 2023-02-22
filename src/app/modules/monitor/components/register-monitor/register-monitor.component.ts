import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from '../../../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../../../../services/api.service';
import {Observable} from 'rxjs';
import {GoogleAnalyticsService} from '../../../../services/google-analytics.service';

@Component(
  {
    selector: 'app-register-monitor',
    templateUrl: './register-monitor.component.html',
    styleUrls: ['./register-monitor.component.scss']
  }
)
export class RegisterMonitorComponent implements OnInit {

  hidePassword = true;
  hidePassword2 = true;

  showLoader = false;
  shaking = false;

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.email], this.validateUsernameAvailable.bind(this)],
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
  ) {
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
        .checkAccountExist(control.value)
        .subscribe(
          () => {
            subscriber.next(null);
            subscriber.complete();
          },
          () => {
            subscriber.next({used: true});
            subscriber.complete();
          },
        );
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
      .registerMonitor(
        this.getUsername()?.value,
        this.getPassword()?.value
      )
      .subscribe(
        () => {
          this
            .auth
            .connect(
              this.getUsername()?.value,
              this.getPassword()?.value
            )
            .subscribe(() => {
              this
                .gtag
                .event(
                  "register",
                  {
                    event_category: "users",
                    event_label: 'New users ' + this.getUsername()?.value,
                    value: 'valid'
                  })

              this.router.navigateByUrl('/home');
            });
        },
        () => {
          this.showLoader = false;
          this.shaking = true;
          this.snackBar.open('Une erreur est survenue');
        }
      );
  }

}
