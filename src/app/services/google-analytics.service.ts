import {Injectable} from '@angular/core';
import {Gtag} from "angular-gtag";
import {GtagEvent, GtagPageview} from "angular-gtag/src/interfaces";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GoogleAnalyticsService {
  constructor(private gtag: Gtag) {
  }

  event(action: string, params?: GtagEvent): void {
    this
      .gtag
      .event(action, params);
  }

  pageview(params: GtagPageview): void {
    this
      .gtag
      .pageview(params);
  }
}
