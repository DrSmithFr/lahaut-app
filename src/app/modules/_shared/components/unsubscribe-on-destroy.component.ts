import {Component, OnDestroy} from "@angular/core";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-unsubscribe-on-destroy',
  template: ''
})
export class UnsubscribeOnDestroyComponent implements OnDestroy {
  protected subscriptionList: Subscription[];

  constructor() {
    this.subscriptionList = [];
  }

  public unsubscribeOnDestroy(subscription: Subscription|Subscription[]): void {
    if (subscription instanceof Array) {
      this.subscriptionList.push(...subscription);
    } else {
      this.subscriptionList.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptionList.forEach(subscription => subscription.unsubscribe());
  }
}
