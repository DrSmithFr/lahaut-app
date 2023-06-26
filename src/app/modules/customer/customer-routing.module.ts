import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyCustomerAccountComponent} from "./pages/my-customer-account/my-customer-account.component";
import {AuthGuard} from "../api/guards/auth.guard";
import {RegisterCustomerPage} from "./pages/register-customer-page/register-customer.page";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [AuthGuard.isConnected(false)],
    component: RegisterCustomerPage,
    data: {
      animation: 'registerCustomer',
    }
  },
  {
    path: 'account',
    canActivate: [AuthGuard.isConnected(true)],
    component: MyCustomerAccountComponent,
    data: {
      animation: 'account',
    }
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class CustomerRoutingModule {
}
