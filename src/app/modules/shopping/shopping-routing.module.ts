import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentComponent} from "./components/payment/payment.component";
import {AuthGuard} from "../../guards/auth.guard";
import {QuickConnectComponent} from "./components/quick-connect/quick-connect.component";
import {CartPage} from "./components/cart-page/cart.page";
import {ShoppingGuard} from "../../guards/shopping.guard";
import {BookingPage} from "./components/booking-page/booking.page";

const routes: Routes = [
  {
    path: 'cart',
    canActivate: [
      AuthGuard.isConnected(false, '/shopping/booking'),
      ShoppingGuard.hasItemInCart('/')
    ],
    component: CartPage,
    data: {
      animation: 'cart'
    }
  },
  {
    path: 'connect',
    canActivate: [AuthGuard.isConnected(false, '/shopping/payment')],
    component: QuickConnectComponent,
    data: {
      animation: 'quickConnect'
    }
  },
  {
    path: 'booking',
    canActivate: [
      AuthGuard.isConnected(true, '/shopping/cart'),
      ShoppingGuard.hasItemInCart('/')
    ],
    component: BookingPage,
    data: {
      animation: 'booking'
    }
  },
  {
    path: 'payment',
    canActivate: [AuthGuard.isConnected(true, '/shopping/connect')],
    component: PaymentComponent,
    data: {
      animation: 'payment'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule {
}
