import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {StateService} from '../../services/state.service';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {GoogleAnalyticsService} from '../../services/google-analytics.service';
import {PasswordResetDialog} from "../password-reset/password-reset-dialog.component";

@Component(
  {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  }
)
export class LoginComponent implements OnInit {
  @ViewChild('password') passwordField: ElementRef<HTMLInputElement>;

  hidePassword = true;
  shaking = false;
  showLoader = false;

  loginForm = this.fb.group(
    {
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    }
  );

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private state: StateService,
    public dialog: MatDialog,
    private ga: GoogleAnalyticsService,
    private route: ActivatedRoute
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

  getUsername(): AbstractControl | null {
    return this.loginForm.get('username');
  }

  getPassword(): AbstractControl | null {
    return this.loginForm.get('password');
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

  isFormValid() {
    // as it was programmatically called, form can be set as dirty
    this.getUsername()?.markAsDirty();
    this.getPassword()?.markAsDirty();

    // trigger form validation
    this.loginForm.updateValueAndValidity();

    return this.loginForm.valid;
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.shaking = false;
    this.showLoader = true;

    this
      .auth
      .connect(
        this.getUsername()?.value,
        this.getPassword()?.value,
      )
      .subscribe(
        () => {
          const redirect = this.state.REDIRECT_AFTER_LOGIN.getValue();

          this.ga.eventEmitter(
            'login',
            'users',
            'valid',
            'Login ' + this.getUsername()?.value
          );

          this.router.navigateByUrl(redirect);
        },
        error => {
          this.showLoader = false;

          this.ga.eventEmitter(
            'login',
            'users',
            error.status,
            'Error' + error.status + ' for ' + this.getUsername()?.value
          );

          if (error.status === 401) {
            this.snackBar.open('Les identifiants de connexion sont incorrects');

            this.passwordField.nativeElement.focus();
            this.getPassword()?.setValue('');

            this.shakeForm();
          } else {
            console.error(error);
            this.snackBar.open('Une erreur est survenue');
          }
        }
      );
  }

  shakeForm() {
    this.shaking = true;
  }

  openPasswordResetDialog() {
    this.dialog.open(
      PasswordResetDialog,
      {
        height: '480px',
        width: '600px',
        data: {
          email: this.getUsername()?.value,
        }
      }
    );
  }
}
