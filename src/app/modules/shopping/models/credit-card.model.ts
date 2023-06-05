export class CreditCardModel {
  constructor(
    public holderName: string,
    public cardNumber: string,
    public expirationDate: string,
    public securityCode: string,
  ) {
  }
}
