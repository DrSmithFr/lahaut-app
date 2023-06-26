import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component(
  {
    selector: 'app-register-customer-page',
    templateUrl: './register-customer.page.html',
    styleUrls: ['./register-customer.page.scss']
  }
)
export class RegisterCustomerPage {

  showOverlay = true;

  constructor(
    private router: Router,
  ) {
  }

  onSuccess() {
    console.log('register success');
  }

  hideOverlay() {
    this.showOverlay = false;
  }
}
