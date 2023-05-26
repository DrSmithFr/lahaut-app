export class UserModel {
  constructor(
    public uuid: string,
    public roles: string[],
    public identity: UserIdentityModel,
  ) {
  }
}

export class UserIdentityModel {
  firstName: string;
  lastName: string;
  anniversary: string;
  nationality: string;
}
