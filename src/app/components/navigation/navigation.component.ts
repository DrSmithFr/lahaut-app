import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialog} from "../logout-dialog/logout.dialog";
import {Roles} from "../../guards/role-guard.service";
import {NavigationService} from "../../services/navigation.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  showLogo = true;
  showMenuButton = false;

  isMenuOpen = false;

  public isLoggedCustomer = false;
  public isLoggedMonitor = false;

  constructor(
    private auth: AuthService,
    private navigationService: NavigationService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this
      .auth
      .getUserSubject()
      .subscribe((user) => {
        this.isLoggedCustomer = user?.roles.includes(Roles.customer) ?? false;
        this.isLoggedMonitor = user?.roles.includes(Roles.monitor) ?? false;
      });

    this
      .navigationService
      .isLogoVisibleSubject()
      .subscribe((show) => {
        this.showLogo = show;
      });

    this
      .navigationService
      .isMenuButtonVisibleSubject()
      .subscribe((show) => {
        this.showMenuButton = show;
      });

    this
      .navigationService
      .isMenuOpenStateSubject()
      .subscribe((isOpened) => {
        this.isMenuOpen = isOpened;
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    this
      .navigationService
      .setMenuOpenState(this.isMenuOpen);
  }
}
