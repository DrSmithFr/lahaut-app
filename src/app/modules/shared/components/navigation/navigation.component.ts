import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../../api/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialog} from "../../../../dialogs/logout-dialog/logout.dialog";
import {Roles} from "../../../api/guards/auth.guard";
import {NavigationService} from "../../../../services/navigation.service";
import {ShoppingService} from "../../../shopping/services/shopping.service";
import {CartModel} from "../../../shopping/models/cart.model";
import {NavigationEnd, Router} from "@angular/router";
import {environment} from "../../../../../environments/environment";
import {ThemeService} from "../../../../services/theme.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('navWrapper', {static: false}) navWrapper: ElementRef<HTMLInputElement>;

  logoUrl = environment.logo;

  isLogged = false;
  isCustomer = false;
  isMonitor = false;

  @Input() transparent = true;
  @Input() sticky = true;
  @Input() showLogo = true;
  @Input() showMenuButton = false;
  @Input() isMenuOpen = false;
  @Input() showPreviousButton = false;
  @Input() showShoppingCartButton = true;

  showShoppingCart = false;
  shoppingCartCount = 0;

  currentUrl = '';
  previousUrl = '';

  isDarkMode = false;

  constructor(
    private auth: AuthService,
    private navigationService: NavigationService,
    private shoppingService: ShoppingService,
    private router: Router,
    public dialog: MatDialog,
    private themeService: ThemeService
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

    this
      .themeService
      .getDarkModeSubject()
      .subscribe((isDark) => {
        this.isDarkMode = isDark;
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

  setDarkMode(darkMode: boolean) {
    this.themeService.setDarkMode(darkMode);
  }
}
