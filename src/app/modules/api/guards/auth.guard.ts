import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

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

  static hasOneOfRoles(roles: Roles[], redirectTo: string | null = null): CanActivateFn {
    return () => {

      for (const role of roles) {
        if (inject(AuthService).isGranted(role)) {
          return true;
        }
      }

      if (redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return false;
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

  static IsDisconnectedOrHasOneOfRoles(roles: Roles[], redirectTo: string | null = null): CanActivateFn {
    return () => {
      if (!inject(AuthService).isLogged()) {
        return true;
      }

      for (const role of roles) {
        if (inject(AuthService).isGranted(role)) {
          return true;
        }
      }

      if (redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return false;
    };
  }
}
