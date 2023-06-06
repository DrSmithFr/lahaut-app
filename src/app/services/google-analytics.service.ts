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
    console.debug('gtag event:', action, params);
    this
      .gtag
      .event(action, params);
  }

  pageview(params: GtagPageview): void {
    console.debug('gtag pageview:', params);
    this
      .gtag
      .pageview(params);
  }
}
