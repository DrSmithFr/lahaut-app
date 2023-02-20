import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsDisconnectedGuard} from '../../guards/is-disconnected-guard.service';
import {RegisterCustomerComponent} from './components/register/register-customer.component';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [IsDisconnectedGuard],
    component: RegisterCustomerComponent,
    data: {
      animation: 'register',
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
