import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialog} from "../logout-dialog/logout.dialog";
import {StateService} from "../../services/state.service";
import {Roles} from "../../guards/role-guard.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public isLoggedCustomer = false;
  public isLoggedMonitor = false;

  constructor(
    private auth: AuthService,
    private stateService: StateService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.stateService.LOGGED_USER.subscribe((user) => {
      this.isLoggedCustomer = user?.roles.includes(Roles.customer) ?? false;
      this.isLoggedCustomer = user?.roles.includes(Roles.monitor) ?? false;
    });
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialog);
  }

  isLogged() {
    return this.isLoggedCustomer || this.isLoggedMonitor;
  }

  getBadgeCount() {
    if (this.isLoggedCustomer) {
      return this.getBadgeCountForBooking() + this.getBadgeCountForMessage();
    }

    if (this.isLoggedMonitor) {
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
