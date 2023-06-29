import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShoppingRoutingModule} from './shopping-routing.module';
import {CartPage} from './pages/cart-page/cart.page';
import {PaymentComponent} from './pages/payment/payment.component';
import {CreditCardFormComponent} from "./components/credit-card-form/credit-card-form.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxMaskModule} from "ngx-mask";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../_shared/shared.module";
import {QuickConnectComponent} from './pages/quick-connect/quick-connect.component';
import {CustomerModule} from "../customer/customer.module";
import {ConnectModule} from "../connect/connect.module";
import {MatTabsModule} from "@angular/material/tabs";
import {BookingPage} from "./pages/booking-page/booking.page";


@NgModule({
  declarations: [
    CartPage,
    QuickConnectComponent,
    BookingPage,
    PaymentComponent,
    CreditCardFormComponent
  ],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MatProgressBarModule,
    SharedModule,
    CustomerModule,
    ConnectModule,
    MatTabsModule,
  ]
})
export class ShoppingModule {
}
