import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalService} from "../modules/api/services/utils/local.service";
import {environment} from "../../environments/environment";

export type Theme = 'light' | 'dark';

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
        this.changeTheme('dark')
      } else {
        this.changeTheme('light')
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

  changeTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);

    if (theme === 'dark') {
      this.changeThemeColor(environment.theme.dark);
    }

    if (theme === 'light') {
      this.changeThemeColor(environment.theme.light);
    }
  }

  private changeThemeColor(color: string) {
    const metaThemeColor = document
      .querySelector("meta[name=theme-color]");

    if (metaThemeColor !== null) {
      metaThemeColor.setAttribute("content", color);
    }
  }
}
