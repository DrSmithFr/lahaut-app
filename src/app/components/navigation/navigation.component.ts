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

  isLogged() {
    return this.auth.isLogged();
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialog);
  }

  getBadgeCount() {
    if (this.isLogged()) {
      return this.getBadgeCountForBooking() + this.getBadgeCountForMessage();
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
