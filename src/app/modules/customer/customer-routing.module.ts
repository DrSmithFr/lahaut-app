import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterCustomerComponent} from './components/register-customer/register-customer.component';
import {MyCustomerAccountComponent} from "./components/my-customer-account/my-customer-account.component";
import {RoleGuard} from "../../guards/role-guard.service";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [RoleGuard.isConnected(false)],
    component: RegisterCustomerComponent,
    data: {
      animation: 'register',
    }
  },
  {
    path: 'account',
    canActivate: [RoleGuard.isConnected(true)],
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
