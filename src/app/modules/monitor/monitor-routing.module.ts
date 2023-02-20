import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IsDisconnectedGuard} from '../../guards/is-disconnected-guard.service';
import {RegisterMonitorComponent} from './components/register/register-monitor.component';

const routes: Routes = [
  {
    path: 'register',
    canActivate: [IsDisconnectedGuard],
    component: RegisterMonitorComponent,
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
export class MonitorRoutingModule {
}
