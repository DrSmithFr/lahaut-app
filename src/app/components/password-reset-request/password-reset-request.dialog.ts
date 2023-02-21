import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {AbstractControl, FormBuilder, ValidationErrors, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable} from "rxjs";
import {ApiService} from "../../services/api.service";

@Component(
  {
    selector: 'app-password-reset-request-dialog',
    templateUrl: './password-reset-request.dialog.html',
    styleUrls: ['./password-reset-request.dialog.scss']
  }
)
export class PasswordResetRequestDialog {
  @ViewChild('password') passwordField: ElementRef<HTMLInputElement>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { email: string },
    public dialogRef: MatDialogRef<PasswordResetRequestDialog>,
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.getUsername()?.setValue(data.email);
  }

  resetPasswordForm = this.fb.group(
    {
      username: ['', [Validators.required, Validators.email], this.validateUsernameExist.bind(this)],
    }
  );

  validateUsernameExist(control: AbstractControl): Observable<ValidationErrors | null> {
    return new Observable<ValidationErrors | null>(subscriber => {
      this
        .api
        .checkAccountExist(control.value)
        .subscribe(
          () => {
            subscriber.next({notFound: true});
            subscriber.complete();
          },
          () => {
            subscriber.next(null);
            subscriber.complete();
          },
        );
    });
  }

  getUsername(): AbstractControl | null {
    return this.resetPasswordForm.get('username');
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

    // trigger form validation
    this.resetPasswordForm.updateValueAndValidity();

    return this.resetPasswordForm.valid;
  }

  onSubmit() {
    if (!this.isFormValid()) {
      return;
    }

    this.api.resetPasswordRequest(this.getUsername()?.value).subscribe(
      () => {
        this.snackBar.open('Un email de réinitialisation de mot de passe vous a été envoyé', 'Close', {duration: 5000});
        this.closeModal();
      },
      () => {
        this.snackBar.open('Une erreur est survenue lors de la réinitialisation de votre mot de passe', 'Close', {duration: 5000});
        this.dialogRef.close();
      }
    );
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
