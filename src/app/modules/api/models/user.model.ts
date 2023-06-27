export class UserModel {
  constructor(
    public uuid: string,
    public roles: string[],
    public identity: UserIdentityModel,
  ) {
  }
}

export class UserIdentityModel {
  constructor(
    public firstName: string,
    public lastName: string,
    public anniversary: string,
    public nationality: string,
  ) {
  }
}

export class MonitorModel extends UserModel {}
