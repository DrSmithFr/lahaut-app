import {Injectable} from '@angular/core';

declare let gtag: any;

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GoogleAnalyticsService {
  public eventEmitter(
    eventName: string,
    eventCategory: string,
    eventAction: string,
    eventLabel: string|null = null,
    eventValue: number|null = null) {
    gtag('event', eventName, {
      eventCategory,
      eventLabel,
      eventAction,
      eventValue
    });
  }
}
