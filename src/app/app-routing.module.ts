import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsConnectedGuard} from "./guards/is-connected-guard.service";
import {IsDisconnectedGuard} from "./guards/is-disconnected-guard.service";

const routes: Routes = [
  {
    path:         '',
    data:         {
      animation: 'disconnected'
    },
    loadChildren: () => import('./modules/minimal/minimal.module').then(m => m.MinimalModule),
  },
  {
    path:        '',
    pathMatch:   'full',
    redirectTo:  '/home'
  },
];

@NgModule({
  providers: [IsConnectedGuard, IsDisconnectedGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
