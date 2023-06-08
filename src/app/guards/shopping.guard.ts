import {inject, Injectable} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {ShoppingService} from "../services/shopping.service";

@Injectable()
export class ShoppingGuard {

  static hasItemInCart(redirectTo: string | null = null): CanActivateFn {
    return () => {
      const cart = inject(ShoppingService).getCart();
      const can = cart !== null && cart.items.length > 0

      if (!can && redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return can;
    };
  }

  static hasActiveBooking(redirectTo: string | null = null): CanActivateFn {
    return () => {
      const can = false;

      if (can && redirectTo !== null) {
        return inject(Router).parseUrl(redirectTo);
      }

      return can;
    }
  }
}
