import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {StateService} from './state.service';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../models/token.model';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {map, tap} from 'rxjs/operators';
import {ReconnectModel} from '../models/reconnect.model';
import {MessageModel} from "../models/message.model";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
    {
        providedIn: 'root'
    }
)
export class ApiService {
    readonly API_URL = environment.url_api;

    constructor(
        protected state: StateService,
        protected http: HttpClient
    ) {
    }

    login(username: string, password: string): Observable<TokenModel> {
        return this
            .http
            .post<TokenModel>(
                this.API_URL + '/login',
                {username, password}
            )
            .pipe(
                tap(tokens => {
                    // updating session with current token
                    this.state.TOKEN.next(tokens);
                })
            );
    }

    getCurrentUser(): Observable<UserModel> {
        return this
            .http
            .get<UserModel>(this.API_URL + '/user/information')
            .pipe(
                tap(user => {
                    // updating session with current user information
                    this.state.LOGGED_USER.next(user);
                }),
            );
    }

    registerCustomer(username: string, password: string): Observable<UserModel> {
        return this
            .http
            .post<UserModel>(
                this.API_URL + '/register/customer',
                {username, password}
            )
            .pipe(
                tap(user => {
                    // updating session with current user information
                    this.state.LOGGED_USER.next(user);
                }),
            );
    }

  registerMonitor(username: string, password: string): Observable<UserModel> {
    return this
      .http
      .post<UserModel>(
        this.API_URL + '/register/monitor',
        {username, password}
      )
      .pipe(
        tap(user => {
          // updating session with current user information
          this.state.LOGGED_USER.next(user);
        }),
      );
  }

    reconnect(token: string): Observable<UserModel> {
        return this
            .http
            .post<ReconnectModel>(
                this.API_URL + '/login/refresh',
                {
                    refresh_token: token,
                }
            )
            .pipe(
                tap(data => {
                    this.state.TOKEN.next(data.token);
                    this.state.LOGGED_USER.next(data.user);
                })
            )
            .pipe(
                map(data => data.user)
            );
    }

    updatePassword(token: string, oldPassword: string, newPassword: string): Observable<MessageModel> {
        return this
            .http
            .patch<MessageModel>(
                this.API_URL + '/user/password_update',
                {oldPassword, newPassword},
            );
    }

    checkAccountExist(email: string): Observable<MessageModel> {
        return this
            .http
            .post<MessageModel>(this.API_URL + '/register/available', {username: email});
    }
}
