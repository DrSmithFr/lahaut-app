import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {ActivityService} from "./activity/activity.service";
import {ChatService} from "./chat/chat.service";
import {HttpClient} from "@angular/common/http";
import {UrlService} from "./utils/url.service";
import {ApiVersionModel} from "../models/api-version.model";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ApiService {
  constructor(
    private user: UserService,
    private chat: ChatService,
    private activity: ActivityService,
    private http: HttpClient,
    private url: UrlService,
  ) {
  }

  public getApiVersion()  {
    return this
      .http
      .get<ApiVersionModel>(this.url.urlFormUri('/public/version'));
  }

  public users(): UserService {
    return this.user;
  }

  public chats(): ChatService {
    return this.chat;
  }

  public activities(): ActivityService {
    return this.activity;
  }
}
