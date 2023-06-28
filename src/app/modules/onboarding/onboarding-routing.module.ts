import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../api/guards/auth.guard";
import {OnboardingPage} from "./pages/onboarding/onboarding.page";

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard.isConnected(true)],
    component: OnboardingPage,
    data: {
      animation: 'onboarding',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule {
}
