import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../api/guards/auth.guard";
import {RegisterMonitorComponent} from "./pages/register-monitor/register-monitor.component";
import {MyMonitorAccountComponent} from "./pages/my-monitor-account/my-monitor-account.component";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [AuthGuard.isConnected(false)],
    component: RegisterMonitorComponent,
    data: {
      animation: 'registerMonitor',
    }
  },
  {
    path: 'account',
    canActivate: [AuthGuard.isConnected(true)],
    component: MyMonitorAccountComponent,
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
export class MonitorRoutingModule {
}
