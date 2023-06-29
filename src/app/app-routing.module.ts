import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page404Component} from "./pages/page404/page404.component";
import {LoginPage} from "./pages/login/login.page";
import {AuthGuard, Roles} from "./modules/api/guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    data: {
      animation: 'login'
    },
  },
  {
    path: 'admin',
    canActivateChild: [AuthGuard.hasOneOfRoles([Roles.admin, Roles.super_admin], '/')],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: 'monitor',
    loadChildren: () => import('./modules/monitor/monitor.module').then(m => m.MonitorModule),
  },
  {
    path: 'customer',
    loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule),
  },
  {
    path: 'chat',
    canActivate: [AuthGuard.isConnected(true, '/')],
    canActivateChild: [AuthGuard.isConnected(true, '/')],
    loadChildren: () => import('./modules/chat/chat.module').then(m => m.ChatModule),
  },
  {
    path: 'search',
    canActivate: [AuthGuard.IsDisconnectedOrHasOneOfRoles([Roles.customer, Roles.admin, Roles.super_admin], '/dashboard')],
    canActivateChild: [AuthGuard.IsDisconnectedOrHasOneOfRoles([Roles.customer, Roles.admin, Roles.super_admin], '/dashboard')],
    loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule),
  },
  {
    path: 'planning',
    canActivate: [AuthGuard.hasRoles([Roles.monitor])],
    canActivateChild: [AuthGuard.hasRoles([Roles.monitor])],
    loadChildren: () => import('./modules/planning/planning.module').then(m => m.PlanningModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard.hasRoles([Roles.monitor])],
    canActivateChild: [AuthGuard.hasRoles([Roles.monitor])],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'onboarding',
    canActivate: [AuthGuard.hasRoles([Roles.monitor])],
    canActivateChild: [AuthGuard.hasRoles([Roles.monitor])],
    loadChildren: () => import('./modules/onboarding/onboarding.module').then(m => m.OnboardingModule),
  },
  {
    path: 'shopping',
    canActivate: [AuthGuard.IsDisconnectedOrHasRoles([Roles.customer], '/')],
    canActivateChild: [AuthGuard.IsDisconnectedOrHasRoles([Roles.customer], '/')],
    loadChildren: () => import('./modules/shopping/shopping.module').then(m => m.ShoppingModule),
  },
  {
    path: '404',
    component: Page404Component,
    data: {
      animation: '404'
    }
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
