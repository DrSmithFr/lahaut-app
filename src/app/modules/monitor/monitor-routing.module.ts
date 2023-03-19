import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsDisconnectedGuard} from '../../guards/is-disconnected-guard.service';
import {RegisterMonitorComponent} from './components/register-monitor/register-monitor.component';
import {IsConnectedGuard} from "../../guards/is-connected-guard.service";
import {MyMonitorAccountComponent} from "./components/my-monitor-account/my-monitor-account.component";

const routes: Routes = [
  {
    path: 'register',
    canActivate: [IsDisconnectedGuard],
    component: RegisterMonitorComponent,
    data: {
      animation: 'register',
    }
  },
  {
    path: 'account',
    canActivate: [IsConnectedGuard],
    component: MyMonitorAccountComponent,
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
