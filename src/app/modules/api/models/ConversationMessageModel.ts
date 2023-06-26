import {UserModel} from "./user.model";

export class ConversationMessageModel {
  constructor(
    public content: string,
    public user: UserModel,
    public sentAt: string,
  ) {
  }
}
