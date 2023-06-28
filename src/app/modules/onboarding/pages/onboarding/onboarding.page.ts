import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BreakpointService, Devices} from "../../../../services/breakpoint.service";
import {StepperOrientation} from "@angular/cdk/stepper";

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss']
})
export class OnboardingPage {
  stepperOrientation: StepperOrientation = 'horizontal';

  firstFormGroup = this.fb.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private breakpointService: BreakpointService,
  ) {
    this
      .breakpointService
      .getDeviceSubject()
      .subscribe(device => {
        console.log(device);
        if (device === Devices.smallMobile || device === Devices.largeMobile) {
          this.stepperOrientation = 'vertical';
        } else {
          this.stepperOrientation = 'horizontal';
        }
      });
  }
}
