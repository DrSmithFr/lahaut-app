import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class IsMonitorGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedMonitor();
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLoggedMonitor();
  }

  // security : forcing users to login
  // redirect users to the login page if no session is initialise
  // passing url referer as URL param
  async isLoggedMonitor() {
    return this.auth.isLogged() && this.auth.isMonitor();
  }
}
