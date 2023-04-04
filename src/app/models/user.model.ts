export class UserModel {
  uuid: string;
  roles: string[];
  identity: UserIdentityModel;
}

export class UserIdentityModel {
  firstName: string;
  lastName: string;
  anniversary: string;
  nationality: string;
}
