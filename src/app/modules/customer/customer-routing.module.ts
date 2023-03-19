import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsDisconnectedGuard} from '../../guards/is-disconnected-guard.service';
import {RegisterCustomerComponent} from './components/register-customer/register-customer.component';
import {IsConnectedGuard} from "../../guards/is-connected-guard.service";
import {MyCustomerAccountComponent} from "./components/my-customer-account/my-customer-account.component";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [IsDisconnectedGuard],
    component: RegisterCustomerComponent,
    data: {
      animation: 'register',
    }
  },
  {
    path: 'account',
    canActivate: [IsConnectedGuard],
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
