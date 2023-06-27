import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConversationModel} from "../../models/chat/conversation.model";
import {ConversationMessageModel} from "../../models/chat/conversation-message.model";
import {UrlService} from "../utils/url.service";

// contain every api call to be easily fake using angular provider mechanism
@Injectable(
  {
    providedIn: 'root'
  }
)
export class ChatService {
  constructor(
    private http: HttpClient,
    private url: UrlService,
  ) {
  }

  getConversations() {
    return this
      .http
      .get<ConversationModel[]>(this.url.urlFormUri('/conversations'));
  }

  getMessages(uuid: string) {
    return this
      .http
      .get<ConversationMessageModel[]>(this.url.urlFormUri('/conversations/' + uuid));
  }

  sendMessage(id: string, message: string) {
    return this
      .http
      .post<ConversationMessageModel>(this.url.urlFormUri('/conversations/' + id), {content: message});
  }
}
