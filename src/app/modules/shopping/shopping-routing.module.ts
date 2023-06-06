import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from "./components/payment/payment.component";
import {CartComponent} from "./components/cart/cart.component";
import {RoleGuard} from "../../guards/role-guard.service";
import {QuickConnectComponent} from "./components/quick-connect/quick-connect.component";

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'connect',
    canActivate: [RoleGuard.isConnected(false, '/shopping/payment')],
    component: QuickConnectComponent,
  },
  {
    path: 'payment',
    canActivate: [RoleGuard.isConnected(true, '/shopping/connect')],
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
