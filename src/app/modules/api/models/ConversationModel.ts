import {UserModel} from "./user.model";
import {ConversationMessageModel} from "./ConversationMessageModel";

export class ConversationModel {
  constructor(
    public id: string,
    public participants: UserModel[],
    public lastMessage: ConversationMessageModel|null,
  ) {
  }
}
