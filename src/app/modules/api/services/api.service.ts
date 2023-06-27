import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {ActivityService} from "./activity/activity.service";
import {ChatService} from "./chat/chat.service";

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
  ) {
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
