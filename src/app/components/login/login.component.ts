import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {PasswordResetDialog} from "../password-reset/password-reset-dialog.component";
import {PasswordResetRequestDialog} from "../password-reset-request/password-reset-request.dialog";
import {HttpErrorResponse} from "@angular/common/http";

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
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        if (params['username'] !== undefined) {
          this.getUsername()?.setValue(params['username']);
        }

        if (params['token'] !== undefined) {
          this.openPasswordResetDialog(params['token']);
        }
      }
    )
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
      .subscribe({
        error: (err: HttpErrorResponse) => {
          this.showLoader = false;

          if (err.status === 401) {
            this.snackBar.open('Les identifiants de connexion sont incorrects', 'OK');

            this.passwordField.nativeElement.focus();
            this.getPassword()?.setValue('');

            this.shakeForm();
          } else {
            this.snackBar.open(`[${err.status}] Une erreur est survenue`, 'OK');
          }
        }
      });
  }

  shakeForm() {
    this.shaking = true;
  }

  openPasswordResetRequestDialog() {
    this.dialog.open(
      PasswordResetRequestDialog,
      {
        height: '480px',
        width: '600px',
        data: {
          email: this.getUsername()?.value,
        }
      }
    );
  }

  openPasswordResetDialog(token: string) {
    this.dialog.open(
      PasswordResetDialog,
      {
        height: '680px',
        width: '600px',
        data: {
          token: token,
        }
      }
    );
  }
}
