import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialog} from "../logout-dialog/logout.dialog";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private auth: AuthService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialog);
  }

  isLogged() {
    return this.auth.isLogged();
  }

  isLoggedCustomer() {
    return this.auth.isLogged() && this.auth.isCustomer();
  }

  isLoggedMonitor() {
    return this.auth.isLogged() && this.auth.isMonitor();
  }

  getBadgeCount() {
    if (this.isLoggedCustomer()) {
      return this.getBadgeCountForBooking() + this.getBadgeCountForMessage();
    }

    if (this.isLoggedMonitor()) {
      return this.getBadgeCountForMessage() + 1;
    }

    return 0;
  }

  getBadgeCountForMessage() {
    return this.isLogged() ? 12 : 0;
  }

  getBadgeCountForBooking() {
    return this.isLogged() ? 1 : 0;
  }
}
