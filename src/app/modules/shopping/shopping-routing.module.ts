import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from "./components/payment/payment.component";
import {CartComponent} from "./components/cart/cart.component";
import {RoleGuard, Roles} from "../../guards/role-guard.service";

const routes: Routes = [
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'payment',
    canActivate: [RoleGuard.forRoles([Roles.customer], '/shopping/cart')],
    component: PaymentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
