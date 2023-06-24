import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalService} from "./local.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  DARK_MODE: BehaviorSubject<boolean>;

  constructor(
    private localService: LocalService
  ) {
    this.DARK_MODE = new BehaviorSubject<boolean>(
      this.localService.getObject<boolean>('STATE_DARK_MODE') || false
    );

    this.DARK_MODE.subscribe((isDark: boolean) => {
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }

      this.localService.setObject('STATE_DARK_MODE', isDark);
    });
  }

  setDarkMode(darkMode: boolean) {
    this.DARK_MODE.next(darkMode);
  }

  getDarkModeSubject() {
    return this.DARK_MODE;
  }

  toggleDarkMode() {
    this.DARK_MODE.next(this.DARK_MODE.value);
  }
}
