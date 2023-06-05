import {creditCardImages} from "./credit-card-svg";

export type CreditCardType = {
  name: string;
  mask: string;
  regex: RegExp|null;
  color: string;
  images: {
    svg: string|null,
    logo: string|null,
  };
}
export const creditCardTypes: CreditCardType[] = [
  {
    name: 'default',
    mask: '0000 0000 0000 0000',
    regex: null,
    color: 'grey',
    images: {
      svg: null,
      logo: null,
    }
  },
  {
    name: 'american express',
    mask: '0000 000000 00000',
    regex: /^3[47]\d{0,13}/,
    color: 'green',
    images: creditCardImages.amex
  },
  {
    name: 'discover',
    mask: '0000 0000 0000 0000',
    regex: /^(?:6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
    color: 'purple',
    images: creditCardImages.discover
  },
  {
    name: 'diners',
    mask: '0000 000000 0000',
    regex: /^3(?:0([0-5]|9)|[689]\d?)\d{0,11}/,
    color: 'orange',
    images: creditCardImages.diners
  },
  {
    name: 'mastercard',
    mask: '0000 0000 0000 0000',
    regex: /^(5[1-5]\d{0,2}|22[2-9]\d{0,1}|2[3-7]\d{0,2})\d{0,12}/,
    color: 'lightblue',
    images: creditCardImages.mastercard
  },
  {
    name: 'jcb15',
    mask: '0000 000000 00000',
    regex: /^(?:2131|1800)\d{0,11}/,
    color: 'red',
    images: creditCardImages.jcb
  },
  {
    name: 'jcb',
    mask: '0000 0000 0000 0000',
    regex: /^(?:35\d{0,2})\d{0,12}/,
    color: 'red',
    images: creditCardImages.jcb
  },
  {
    name: 'maestro',
    mask: '0000 0000 0000 0000',
    regex: /^(?:5[0678]\d{0,2}|6304|67\d{0,2})\d{0,12}/,
    color: 'yellow',
    images: creditCardImages.maestro
  },
  {
    name: 'visa',
    mask: '0000 0000 0000 0000',
    regex: /^4\d{0,15}/,
    color: 'lime',
    images: creditCardImages.visa
  },
  {
    name: 'unionpay',
    mask: '0000 0000 0000 0000',
    regex: /^62\d{0,14}/,
    color: 'cyan',
    images: creditCardImages.unionpay
  },
]
