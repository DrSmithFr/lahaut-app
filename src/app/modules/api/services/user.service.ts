import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenModel} from '../models/token.model';
import {Observable} from 'rxjs';
import {UserModel} from '../models/user.model';
import {MessageModel} from "../models/chat/message.model";
import {DateService} from "./utils/date.service";
import {UrlService} from "./utils/url.service";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class UserService {
  constructor(
    private http: HttpClient,
    private dateService: DateService,
    private url: UrlService,
  ) {
  }

  // Login
  login(username: string, password: string): Observable<TokenModel> {
    return this
      .http
      .post<TokenModel>(
        this.url.urlFormUri('/auth/login'),
        {username, password}
      );
  }

  // Refresh token
  reconnect(token: string): Observable<TokenModel> {
    return this
      .http
      .post<TokenModel>(
        this.url.urlFormUri('/auth/login/refresh'),
        {
          refresh_token: token,
        }
      );
  }

  getCurrentUser(): Observable<UserModel> {
    return this
      .http
      .get<UserModel>(this.url.urlFormUri('/user/information'));
  }

  // Register
  checkAccountExist(email: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.url.urlFormUri('/auth/register/available'), {username: email});
  }

  registerCustomer(username: string, password: string): Observable<UserModel> {
    return this
      .http
      .post<UserModel>(
        this.url.urlFormUri('/auth/register/customer'),
        {username, password}
      );
  }

  registerMonitor(
    firstname: string,
    lastname: string,
    phone: string,
    username: string,
    password: string
  ): Observable<UserModel> {
    return this
      .http
      .post<UserModel>(
        this.url.urlFormUri('/auth/register/monitor'),
        {
          firstname,
          lastname,
          phone,
          username,
          password
        }
      );
  }

  // Password Reset
  resetPasswordRequest(email: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.url.urlFormUri('/auth/reset_password'), {username: email});
  }

  checkPasswordResetTokenValidity(token: string): Observable<MessageModel> {
    return this
      .http
      .post<MessageModel>(this.url.urlFormUri('/auth/reset_password/validity'), {token});
  }

  resetPassword(token: string, password: string): Observable<MessageModel> {
    return this
      .http
      .patch<MessageModel>(this.url.urlFormUri('/auth/reset_password'), {token, password});
  }

  // Account Management
  updatePassword(token: string, oldPassword: string, newPassword: string): Observable<MessageModel> {
    return this
      .http
      .patch<MessageModel>(
        this.url.urlFormUri('/public/user/password_update'),
        {oldPassword, newPassword},
      );
  }
}
