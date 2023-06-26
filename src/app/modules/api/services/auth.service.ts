import {Injectable} from '@angular/core';
import {BehaviorSubject, concatMap, Observable, throwError} from 'rxjs';
import {CallService} from './call.service';
import {UserModel} from '../../../models/user.model';
import {TokenModel} from "../../../models/token.model";
import {LocalService} from "./local.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {GoogleAnalyticsService} from "../../../services/google-analytics.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthService {

  TOKEN: BehaviorSubject<TokenModel | null>;
  LOGGED_USER: BehaviorSubject<UserModel | null>;

  constructor(
    private api: CallService,
    private router: Router,
    private localService: LocalService,
    private gtag: GoogleAnalyticsService,
  ) {
    this.TOKEN = new BehaviorSubject<TokenModel | null>(
      this.localService.getObject<TokenModel>('STATE_TOKEN') || null
    );

    this.LOGGED_USER = new BehaviorSubject<UserModel | null>(
      this.localService.getObject<UserModel>('STATE_USER') || null
    );

    this.TOKEN.subscribe((token: TokenModel | null) => {
      this.localService.setObject('STATE_TOKEN', token);
    });

    this.LOGGED_USER.subscribe((user: UserModel | null) => {
      this.localService.setObject('STATE_USER', user);
    });
  }

  // State management
  getUserSubject(): BehaviorSubject<UserModel | null> {
    return this.LOGGED_USER;
  }

  getTokenSubject(): BehaviorSubject<TokenModel | null> {
    return this.TOKEN;
  }

  getUser(): UserModel | null {
    return this.getUserSubject().getValue();
  }

  getToken(): TokenModel | null {
    return this.getTokenSubject().getValue();
  }

  saveUser(user: UserModel | null): void {
    console.debug('user saved', user);
    this.getUserSubject().next(user);
  }

  saveToken(token: TokenModel | null): void {
    console.debug('token saved', token);
    this.getTokenSubject().next(token);
  }

  getRedirectUrlForUser() {
    return this.isMonitor() ? '/dashboard' : '/search';
  }

  connect(login: string, password: string, autoRedirect = true): Observable<UserModel> {
    console.time('connect: token');
    const observable = this
      .api
      .login(login, password)
      .pipe(
        // saving token in session
        tap(tokens => {
          console.timeEnd('connect: token');
          this.saveToken(tokens);
        }),
        // getting current user information
        concatMap(() => {
          console.time('connect: user infos');
          return this.api.getCurrentUser();
        }),
        // updating session with current users information
        tap(user => {
          console.timeEnd('connect: user infos');
          this.saveUser(user);
        }),
        // tracking login event
        tap({
          next: (user) => {
            this
              .gtag
              .event(
                "login",
                {
                  event_category: this.isMonitor() ? "monitors" : "customers",
                  event_label: user.uuid,
                  value: "valid"
                })
          },
          error: error => {
            this
              .gtag
              .event(
                "login",
                {
                  event_category: "users",
                  event_label: 'Error' + error.status,
                  value: error.status
                })
          }
        }),
      );

    if (autoRedirect) {
      return observable
        .pipe(
          // redirecting after login
          tap(() => {
            const uri = this.getRedirectUrlForUser();
            console.log('redirecting after login:', uri);
            this.router.navigateByUrl(uri);
          })
        )
    }

    return observable;
  }

  reconnect(): Observable<TokenModel> {
    const token = this.getToken();

    if (null === token) {
      return throwError(() => new Error('No token found'));
    }

    console.time('reconnect')

    return this
      .api
      .reconnect(token.refresh_token)
      .pipe(
        tap(data => {
          console.timeEnd('reconnect')
          this.saveToken(data);
        })
      )
  }

  registerCustomer(email: string, password: string, autoRedirect = true) {
    console.time('registerCustomer')
    return this
      .api
      .registerCustomer(email, password)
      .pipe(
        tap(() => {
          console.timeEnd('registerCustomer')
        }),
        concatMap(() => this.connect(email, password, autoRedirect)),
        tap({
          next: () => {
            this
              .gtag
              .event(
                "register",
                {
                  event_category: "customers",
                  event_label: 'New customer ' + email,
                  value: 'valid'
                })
          },
          error: (err: HttpErrorResponse) => {
            this
              .gtag
              .event(
                "register",
                {
                  event_category: "customers",
                  event_label: 'Subscription error for ' + email,
                  value: 'error: ' + err.message
                })
          }
        })
      )
  }

  registerMonitor(
    firstname: string,
    lastname: string,
    phone: string,
    email: string,
    password: string
  ) {
    console.time('registerMonitor')

    return this
      .api
      .registerMonitor(
        firstname,
        lastname,
        phone,
        email,
        password
      )
      .pipe(
        tap(() => {
          console.timeEnd('registerMonitor')
        }),
        concatMap(() => this.connect(email, password)),
        tap({
          next: () => {
            this
              .gtag
              .event(
                "register",
                {
                  event_category: "customers",
                  event_label: 'New customer ' + email,
                  value: 'valid'
                })
          },
          error: (err: HttpErrorResponse) => {
            this
              .gtag
              .event(
                "register",
                {
                  event_category: "customers",
                  event_label: 'Subscription error for ' + email,
                  value: 'error: ' + err.message
                })
          }
        })
      )
  }

  isLogged(): boolean {
    return this.getUser() !== null && this.getToken() !== null;
  }

  disconnect() {
    console.log('clearing session');
    this.saveUser(null);
    this.saveToken(null);

    console.log('redirecting to home page');
    this.router.navigate(['']);
  }

  isGranted(...roles: string[]) {
    const user = this.getUser();

    if (!user) {
      console.warn('not logged');
      return false;
    }

    if (roles.length === 0) {
      console.warn('user roles empty');
      return false;
    }

    for (const role of roles) {
      if (!user.roles.includes(role)) {
        console.warn('user not granted:', role)
        return false;
      }
    }

    console.debug('user granted:', roles)

    return true;
  }

  isCustomer(): boolean {
    return this.isGranted('ROLE_CUSTOMER');
  }

  isMonitor(): boolean {
    return this.isGranted('ROLE_MONITOR');
  }
}
