import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class IsConnectedGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLogged(route);
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLogged(childRoute);
  }

  // security : forcing users to login
  // redirect users to the login page if no session is initialise
  // passing url referer as URL param
  async isLogged(route: ActivatedRouteSnapshot) {
    return this.auth.isLogged();
  }
}
