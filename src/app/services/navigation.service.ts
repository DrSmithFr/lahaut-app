import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NavigationService {

  public showNavigation: BehaviorSubject<boolean>;

  constructor() {
    this.showNavigation = new BehaviorSubject<boolean>(false);
  }

  hide() {
    this.showNavigation.next(false);
  }

  show() {
    this.showNavigation.next(true);
  }
}
