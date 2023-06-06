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

  // navigation visibility
  isNavigationVisibleSubject() {
    return this.isNavigationVisible;
  }

  setNavigationVisibility(value: boolean) {
    this.isNavigationVisibleSubject().next(value);
  }

  // logo visibility
  isLogoVisibleSubject() {
    return this.isLogoVisible;
  }

  setLogoVisibility(value: boolean) {
    this.isLogoVisibleSubject().next(value);
  }

  // menu button visibility
  isMenuButtonVisibleSubject() {
    return this.isMenuButtonVisible;
  }

  setMenuButtonVisibility(value: boolean) {
    this.isMenuButtonVisibleSubject().next(value);
  }

  // menu open state
  isMenuOpenStateSubject() {
    return this.isMenuOpen;
  }

  setMenuOpenState(value: boolean) {
    this.isMenuOpenStateSubject().next(value);
  }
}
