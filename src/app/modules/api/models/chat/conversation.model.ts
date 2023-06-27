import {UserModel} from "../user.model";
import {ConversationMessageModel} from "./conversation-message.model";

export class ConversationModel {
  constructor(
    public id: string,
    public participants: UserModel[],
    public lastMessage: ConversationMessageModel|null,
  ) {
  }
}
