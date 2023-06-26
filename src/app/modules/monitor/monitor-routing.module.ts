import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterMonitorComponent} from './components/register-monitor/register-monitor.component';
import {MyMonitorAccountComponent} from "./components/my-monitor-account/my-monitor-account.component";
import {AuthGuard} from "../../guards/auth.guard";

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
