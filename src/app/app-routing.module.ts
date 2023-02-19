import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IsConnectedGuard} from "./guards/is-connected-guard.service";
import {IsDisconnectedGuard} from "./guards/is-disconnected-guard.service";
import {HomeComponent} from "./components/home/home.component";
import {Page404Component} from "./components/page404/page404.component";

const routes: Routes = [
  {
    path:         'users',
    data:         {
      animation: 'disconnected'
    },
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule),
  },
  {
    path:        'home',
    component:   HomeComponent,
    data:        {
      animation: 'home'
    }
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path:        '',
    pathMatch:   'full',
    redirectTo:  '/home'
  },
  { path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
  providers: [IsConnectedGuard, IsDisconnectedGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
