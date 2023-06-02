import {UserModel} from "../user.model";

export class ConversationMessageModel {
  constructor(
    public content: number,
    public user: UserModel,
    public sentAt: string,
  ) {
  }
}
