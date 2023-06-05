import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {Page404Component} from "./components/page404/page404.component";
import {LoginComponent} from "./components/login/login.component";
import {RoleGuard, Roles} from "./guards/role-guard.service";

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
    path: 'chat',
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'planning',
    canActivate: [RoleGuard.forRoles(Roles.monitor)],
    canActivateChild: [RoleGuard.forRoles(Roles.monitor)],
    loadChildren: () => import('./modules/planning/planning.module').then(m => m.PlanningModule),
  },
  {
    path: 'dashboard',
    canActivate: [RoleGuard.forRoles(Roles.monitor)],
    canActivateChild: [RoleGuard.forRoles(Roles.monitor)],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'payment',
    loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
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
    redirectTo: '/search'
  },
  {path: '**', pathMatch: 'full', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
