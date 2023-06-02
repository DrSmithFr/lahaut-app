import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NavigationService {

  public isNavigationVisible: BehaviorSubject<boolean>;

  public isLogoVisible: BehaviorSubject<boolean>;

  public isMenuButtonVisible: BehaviorSubject<boolean>;
  public isMenuOpen: BehaviorSubject<boolean>;

  constructor() {
    this.isNavigationVisible = new BehaviorSubject<boolean>(false);

    this.isLogoVisible = new BehaviorSubject<boolean>(true);

    this.isMenuButtonVisible = new BehaviorSubject<boolean>(false);
    this.isMenuOpen = new BehaviorSubject<boolean>(false);
  }

  hide() {
    this.isNavigationVisible.next(false);
  }

  show() {
    this.isNavigationVisible.next(true);
  }

  hideLogo() {
    this.isLogoVisible.next(false);
  }

  showLogo() {
    this.isLogoVisible.next(true);
  }

  showMenuButton() {
    this.isMenuButtonVisible.next(true);
  }

  hideMenuButton() {
    this.isMenuButtonVisible.next(false);
  }
}
