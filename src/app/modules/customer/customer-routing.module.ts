import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyCustomerAccountComponent} from "./components/my-customer-account/my-customer-account.component";
import {AuthGuard} from "../../guards/auth.guard";
import {RegisterCustomerPage} from "./components/register-customer-page/register-customer.page";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [AuthGuard.isConnected(false)],
    component: RegisterCustomerPage,
    data: {
      animation: 'register',
    }
  },
  {
    path: 'account',
    canActivate: [AuthGuard.isConnected(true)],
    component: MyCustomerAccountComponent,
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
