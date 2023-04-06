import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SwPush, SwUpdate} from '@angular/service-worker';
import {filter} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {transition, trigger} from '@angular/animations';
import {fadeIn} from './animations/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleAnalyticsService} from "./services/google-analytics.service";

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('routeAnimations', [
        transition('disconnected <=> connected', fadeIn),
      ])
    ]
  }
)
export class AppComponent implements OnInit {

  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private router: Router,
    private snackBar: MatSnackBar,
    private gtag: GoogleAnalyticsService,
  ) {
  }

  ngOnInit(): void {
    // resetting the scrollbar after navigation
    // due to the nested router use
    // + the fixed size of layout (to keep footer away during page transition)
    // this needed
    this
      .router
      .events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.gtag.pageview({
            page_title: event.toString(),
            page_path: event.urlAfterRedirects,
          });
        }

        window.scrollTo(0, 0);
      });

    if (environment.production && this.swUpdate.isEnabled) {
      // // PWA notification clicked
      // this
      //   .swPush
      //   .notificationClicks
      //   .subscribe(() => {
      //     this.showUpdateBanner();
      //   });

      // PWA look for update
      this
        .swUpdate
        .activateUpdate()
        .then(() => {
          this.showUpdateBanner();
        });
    }
  }

  showUpdateBanner() {
    this
      .snackBar
      .open(
        'Mise à jour disponible !',
        'Appliquer',
      )
      .onAction()
      .subscribe(() => {
        this
          .swUpdate
          .activateUpdate()
          .then(() => {
            window.location.reload();
          });
      });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }
}
