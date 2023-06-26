import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../modules/api/services/auth.service";

export enum Roles {
  customer = 'ROLE_CUSTOMER',
  monitor = 'ROLE_MONITOR',
  admin = 'ROLE_ADMIN',
  super_admin = 'ROLE_SUPER_ADMIN'
}

@Injectable()
export class AuthGuard {

  static isConnected(state: boolean, redirectTo: string | null = null): CanActivateFn {
    return () => {
      const can = inject(AuthService).isLogged() === state;

      if (!can && redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return can;
    };
  }

  static hasRoles(roles: Roles[], redirectTo: string | null = null): CanActivateFn {
    return () => {
      const can = inject(AuthService).isGranted(...roles);

      if (!can && redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return can;
    };
  }

  static IsDisconnectedOrHasRoles(roles: Roles[], redirectTo: string | null = null): CanActivateFn {
    return () => {
      const can = !inject(AuthService).isLogged() || inject(AuthService).isGranted(...roles);

      if (!can && redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return can;
    };
  }
}
