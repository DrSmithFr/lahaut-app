export type CreditCardType = {
  name: string;
  mask: string;
  regex: RegExp|null;
  color: string;
  images: string;
}
export const creditCardTypes: CreditCardType[] = [
  {
    name: 'credit card',
    mask: '0000 0000 0000 0000',
    regex: null,
    color: 'grey',
    images: `assets/payment/cb.svg`
  },
  {
    name: 'american express',
    mask: '0000 000000 00000',
    regex: /^3[47]\d{0,13}/,
    color: 'green',
    images: `assets/payment/amex.svg`
  },
  {
    name: 'discover',
    mask: '0000 0000 0000 0000',
    regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
    color: 'purple',
    images: `assets/payment/discover.svg`
  },
  {
    name: 'diners',
    mask: '0000 000000 0000',
    regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
    color: 'orange',
    images: `assets/payment/diners.svg`
  },
  {
    name: 'mastercard',
    mask: '0000 0000 0000 0000',
    regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
    color: 'lightblue',
    images: `assets/payment/mastercard.svg`
  },
  {
    name: 'jcb15',
    mask: '0000 000000 00000',
    regex: /^(?:2131|1800)\d{0,11}/,
    color: 'red',
    images: `assets/payment/jcb.svg`
  },
  {
    name: 'jcb',
    mask: '0000 0000 0000 0000',
    regex: /^(?:35\d{0,2})\d{0,12}/,
    color: 'red',
    images: `assets/payment/jcb.svg`
  },
  {
    name: 'maestro',
    mask: '0000 0000 0000 0000',
    regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
    color: 'yellow',
    images: `assets/payment/maestro.svg`
  },
  {
    name: 'visa',
    mask: '0000 0000 0000 0000',
    regex: /^4\d{0,15}/,
    color: 'lime',
    images: `assets/payment/visa.svg`
  },
  {
    name: 'unionpay',
    mask: '0000 0000 0000 0000',
    regex: /^62\d{0,14}/,
    color: 'cyan',
    images: `assets/payment/unionpay.svg`
  },
]
