import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from "./components/payment/payment.component";
import {CartComponent} from "./components/cart/cart.component";
import {AuthGuard} from "../../guards/auth-guard.service";
import {QuickConnectComponent} from "./components/quick-connect/quick-connect.component";

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'connect',
    canActivate: [AuthGuard.isConnected(false, '/shopping/payment')],
    component: QuickConnectComponent,
  },
  {
    path: 'payment',
    canActivate: [AuthGuard.isConnected(true, '/shopping/connect')],
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
