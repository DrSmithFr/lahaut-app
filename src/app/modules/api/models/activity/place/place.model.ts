export class PlaceModel {
  constructor(
    public name: string,
    public description: string,
    public latitude: number,
    public longitude: number,
    public address: AddressModel,
  ) {
  }
}

export class AddressModel {
  constructor(
    public street: string,
    public city: string,
    public country: string,
    public zipCode: string,
  ) {
  }
}
