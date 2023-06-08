import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-quick-connect',
  templateUrl: './quick-connect.component.html',
  styleUrls: ['./quick-connect.component.scss']
})
export class QuickConnectComponent {

  constructor(
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar,
  ) {
  }

  onConnect() {
    if (this.auth.isMonitor()) {
      this.snackBar.open('Impossible d\'effectuer une réservation avec un compte moniteur', 'OK');
    }

    this.router.navigateByUrl('/shopping/payment');
  }
}
