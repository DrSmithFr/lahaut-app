import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout.dialog.html',
  styleUrls: ['./logout.dialog.scss']
})
export class LogoutDialog {
  constructor(
    public dialogRef: MatDialogRef<LogoutDialog>,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
  }

  disconnect() {
    this.auth.clearSession();
    this.router.navigate(['/home']);
    this.snackBar.open('Vous êtes déconnecté', undefined, {duration: 2000});
    this.dialogRef.close();
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
