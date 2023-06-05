import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CreditCardModel} from "../../models/credit-card.model";
import {FormBuilder, Validators} from "@angular/forms";
import {CreditCardType, creditCardTypes} from "./credit-card-types";

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss']
})
export class CreditCardFormComponent implements OnInit {
  @Input() price: number;
  @Input() loading: boolean;

  @Output() paymentReady = new EventEmitter<CreditCardModel>();

  preload = true;
  cardFlipped = false;
  cardType: CreditCardType = creditCardTypes[0];

  creditCardForm = this.fb.group({
    holderName: ['', [Validators.required]],
    cardNumber: ['', [Validators.required]],
    expirationDate: ['', [Validators.required]],
    securityCode: ['', [Validators.required]],
  });

  holderNameOnFocus = false;
  cardNumberOnFocus = false;
  expirationDateOnFocus = false;
  securityCodeOnFocus = false;

  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.preload = false;
  }

  onSubmit() {
    console.log(this.creditCardForm.value);
  }

  checkCardType() {
    const cardNumber = this.creditCardForm.value.cardNumber || '';

    if (cardNumber === '') {
      this.cardType = creditCardTypes[0];
      return;
    }

    for (const cardType of creditCardTypes) {
      if (!cardType.regex) {
        continue;
      }

      const regex = new RegExp(cardType.regex);
      if (regex.test(cardNumber)) {
        this.cardType = cardType;
        return;
      }
    }

    this.cardType = creditCardTypes[0];
  }

  randomCardNumber() {
    const testCards = [
      '4000056655665556',
      '5200828282828210',
      '371449635398431',
      '6011000990139424',
      '30569309025904',
      '3566002020360505',
      '6200000000000005',
      '6759649826438453',
    ];

    const randomNumber = Math.floor(Math.random() * testCards.length);

    this.creditCardForm.setValue({
      holderName: 'Bob Doe',
      cardNumber: testCards[randomNumber],
      expirationDate: '1225',
      securityCode: '123',
    })

    setTimeout(() => {
      // Let time for the form validator to update
      this.creditCardForm.updateValueAndValidity()
    }, 150);

    this.checkCardType();
  }
}
