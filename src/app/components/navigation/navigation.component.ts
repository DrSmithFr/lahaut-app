import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialog} from "../logout-dialog/logout.dialog";
import {Roles} from "../../guards/auth.guard";
import {NavigationService} from "../../services/navigation.service";
import {ShoppingService} from "../../services/shopping.service";
import {CartModel} from "../../models/cart.model";
import {NavigationEnd, Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  logoUrl = environment.logo;

  isLogged = false;
  isCustomer = false;
  isMonitor = false;

  showLogo = true;

  showMenuButton = false;
  isMenuOpen = false;

  showShoppingCart = false;
  shoppingCartCount = 0;

  showPreviousButton = false;
  showShoppingCartButton = true;
  currentUrl = '';
  previousUrl = '';

  constructor(
    private auth: AuthService,
    private navigationService: NavigationService,
    private shoppingService: ShoppingService,
    private router: Router,
    public dialog: MatDialog
  ) {
    router
      .events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          // Ignore shopping pages
          if (!event.url.startsWith('/shopping')) {
            this.previousUrl = this.currentUrl;
            this.currentUrl = event.url;
          }

          console.log('NavigationEnd:', event.url);
          console.log('PreviousPage:', this.previousUrl);
        }
      });
  }

  ngOnInit() {
    this
      .auth
      .getUserSubject()
      .subscribe((user) => {
        this.isCustomer = user?.roles.includes(Roles.customer) ?? false;
        this.isMonitor = user?.roles.includes(Roles.monitor) ?? false;
        this.isLogged = user !== null;
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

    this
      .shoppingService
      .getCartSubject()
      .subscribe((cart) => {
        this.showShoppingCart = cart !== null && !CartModel.isEmpty(cart);
        this.shoppingCartCount = cart?.items?.length ?? 0;
      });

    this
      .navigationService
      .isPreviousButtonVisibleSubject()
      .subscribe((show) => {
        this.showPreviousButton = show;
      });

    this
      .navigationService
      .isShoppingCartVisibleSubject()
      .subscribe((show) => {
        this.showShoppingCartButton = show;
      });
  }

  openLogoutDialog() {
    this.dialog.open(LogoutDialog);
  }

  getBadgeCount() {
    if (this.isCustomer) {
      return this.getBadgeCountForBooking() + this.getBadgeCountForMessage();
    }

    if (this.isMonitor) {
      return this.getBadgeCountForMessage() + 1;
    }

    return 0;
  }

  getBadgeCountForMessage() {
    return this.isLogged ? 12 : 0;
  }

  getBadgeCountForBooking() {
    return this.isLogged ? 1 : 0;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    this
      .navigationService
      .setMenuOpenState(this.isMenuOpen);
  }

  goToShoppingCart() {
    console.log('displayShoppingCart', this.shoppingService.getCart());
    this.router.navigate(['/shopping/cart']);
  }

  goToPreviousPage() {
    console.log('goToPreviousPage', this.previousUrl);
    this.router.navigateByUrl(this.previousUrl);
  }
}
