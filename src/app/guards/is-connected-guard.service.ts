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
    return this.isLogged();
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isLogged();
  }

  // security : forcing users to login
  // redirect users to the login page if no session is initialise
  // passing url referer as URL param
  async isLogged() {
    return this.auth.isLogged();
  }
}
