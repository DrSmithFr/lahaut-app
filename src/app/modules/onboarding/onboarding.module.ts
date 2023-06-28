import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { OnboardingPage } from './pages/onboarding/onboarding.page';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../shared/shared.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    OnboardingPage
  ],
  imports: [
    CommonModule,
    OnboardingRoutingModule,
    MatProgressBarModule,
    SharedModule,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class OnboardingModule { }
