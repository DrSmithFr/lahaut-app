import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class IsDisconnectedGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
  ) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isDisconnected();
  }

  async canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isDisconnected();
  }

  // security : forcing users to login
  // redirect connected users to the dashboard
  async isDisconnected() {
    return !this.auth.isLogged();
  }
}
