import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {AdvancedPage} from "./pages/advanced/advanced.page";
import {AuthGuard, Roles} from "../api/guards/auth.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardPage,
    data: {
      animation: 'admin-dashboard'
    },
  },
  {
    path: 'advanced',
    component: AdvancedPage,
    canActivate: [AuthGuard.hasRoles([Roles.super_admin], '/')],
    data: {
      animation: 'admin-advanced'
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
