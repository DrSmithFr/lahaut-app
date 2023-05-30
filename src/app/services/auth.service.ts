import {Injectable} from '@angular/core';
import {StateService} from './state.service';
import {Observable} from 'rxjs';
import {ApiService} from './api.service';
import {UserModel} from '../models/user.model';
import {TokenModel} from "../models/token.model";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  constructor(
    private api: ApiService,
    private state: StateService
  ) {
  }

  connect(login: string, password: string): Observable<UserModel> {
    return new Observable(observer => {
      this
        .api
        .login(login, password)
        .subscribe({
          next: () => {
            this
              .api
              .getCurrentUser()
              .subscribe({
                next: user => observer.next(user),
                error: e => observer.error(e),
              });
          },
          error: e => observer.error(e)
        });
    });
  }

  reconnect(): Observable<TokenModel> {
    return new Observable(observer => {
      const token = this.state.TOKEN.getValue();

      if (null === token) {
        observer.error('No token found');
        observer.complete();
        return;
      }

      return this
        .api
        .reconnect(token.refresh_token)
        .subscribe({
          next: (token: TokenModel) => {
            observer.next(token);
            observer.complete();
          },
          error: e => observer.error(e)
        });
    });
  }

  registerCustomer(email: string, password: string) {
    return this
      .api
      .registerCustomer(email, password);
  }

  registerMonitor(
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string
  ) {
    return this
      .api
      .registerMonitor(
        firstname,
        lastname,
        phone,
        email,
        password
      );
  }

  getUser(): UserModel | null {
    return this.state.LOGGED_USER.getValue();
  }

  getToken(): TokenModel | null {
    return this.state.TOKEN.getValue();
  }

  isLogged(): boolean {
    return this.state.LOGGED_USER.getValue() !== null && this.state.TOKEN.getValue() !== null;
  }

  clearSession() {
    this.state.TOKEN.next(null);
    this.state.LOGGED_USER.next(null);
  }

  isGranted(...roles: string[]) {
    const user = this.getUser();

    if (!user) {
      return false;
    }

    for (const role of roles) {
      if (!user.roles.includes(role)) {
        return false;
      }
    }

    return true;
  }

  isCustomer(): boolean {
    return this.isGranted('ROLE_CUSTOMER');
  }

  isMonitor(): boolean {
    return this.isGranted('ROLE_MONITOR');
  }
}
