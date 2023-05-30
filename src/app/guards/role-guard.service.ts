import {inject, Injectable} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {AuthService} from "../services/auth.service";

export enum Roles {
  customer = 'ROLE_CUSTOMER',
  monitor = 'ROLE_MONITOR',
  admin = 'ROLE_ADMIN',
  super_admin = 'ROLE_SUPER_ADMIN'
}

@Injectable()
export class RoleGuard {

  static isConnected(state: boolean): CanActivateFn {
    return () => {
      return inject(AuthService).isLogged() === state;
    };
  }

  static forRoles(...roles: Roles[]): CanActivateFn {
    return () => {
      return inject(AuthService).isGranted(...roles);
    };
  }
}
