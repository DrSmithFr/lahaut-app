import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsDisconnectedGuard} from '../../guards/is-disconnected-guard.service';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [IsDisconnectedGuard],
    component: LoginComponent,
    data: {
      animation: 'login'
    }
  },
  {
    path: 'register',
    canActivate: [IsDisconnectedGuard],
    component: RegisterComponent,
    data: {
      animation: 'register'
    }
  },
];

@NgModule(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class UsersRoutingModule {
}
