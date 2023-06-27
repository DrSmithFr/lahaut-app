import {UserModel} from "../user.model";

export class BookingModel {
  constructor(
    public id: number,
    public customer: UserModel,
    public status: string,
  ) {
  }
}
