import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsConnectedGuard} from "./guards/is-connected-guard.service";
import {IsDisconnectedGuard} from "./guards/is-disconnected-guard.service";
import {HomeComponent} from "./components/home/home.component";
import {Page404Component} from "./components/page404/page404.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      animation: 'disconnected'
    },
  },
  {
    path: 'monitor',
    data: {
      animation: 'disconnected'
    },
    loadChildren: () => import('./modules/monitor/monitor.module').then(m => m.MonitorModule),
  },
  {
    path: 'customer',
    data: {
      animation: 'disconnected'
    },
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      animation: 'home'
    }
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {path: '**', pathMatch: 'full', component: Page404Component},
];

@NgModule({
  providers: [IsConnectedGuard, IsDisconnectedGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
