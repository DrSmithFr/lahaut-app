import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TokenModel} from '../models/token.model';
import {UserModel} from '../models/user.model';
import {LocalService} from "./local.service";

// allow values and objects to be store on client side
// using BehaviorSubject to keep the all thing synchronous
@Injectable(
  {
    providedIn: 'root'
  }
)
export class StateService {

  REDIRECT_AFTER_LOGIN: BehaviorSubject<string>;
  TOKEN: BehaviorSubject<TokenModel|null>;
  LOGGED_USER: BehaviorSubject<UserModel|null>;

  constructor(
    private localService: LocalService
  ) {
    this.REDIRECT_AFTER_LOGIN = new BehaviorSubject<string>('/home');

    this.TOKEN = new BehaviorSubject<TokenModel|null>(
      this.localService.getObject<TokenModel>('STATE_TOKEN') || null
    );

    this.LOGGED_USER = new BehaviorSubject<UserModel|null>(
      this.localService.getObject<UserModel>('STATE_USER') || null
    );

    // trigger persist data to localstorage when updated
    this.TOKEN.subscribe((token: TokenModel|null) => {
      this.localService.setObject('STATE_TOKEN', token);
    });

    this.LOGGED_USER.subscribe((user: UserModel|null) => {
      this.localService.setObject('STATE_USER', user);
    });
  }
}
