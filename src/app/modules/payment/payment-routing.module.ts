import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from "./components/payment/payment.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: '',
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
