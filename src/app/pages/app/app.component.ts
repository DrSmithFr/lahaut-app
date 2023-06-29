import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SwPush, SwUpdate, VersionDetectedEvent, VersionReadyEvent} from '@angular/service-worker';
import {filter, map, tap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {trigger} from '@angular/animations';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleAnalyticsService} from "../../services/google-analytics.service";
import {routeAnimations} from "../../route.animations";
import {ApiService} from "../../modules/api/services/api.service";
import {
  IncompatibilityLevel,
  IncompatibilityType,
  VersionService
} from "../../modules/api/services/utils/version.service";

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('routeAnimations', routeAnimations)
    ]
  }
)
export class AppComponent implements OnInit {

  serverError = false;
  waitingForUpdate = false;
  updateAvailable = false;

  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private router: Router,
    private snackBar: MatSnackBar,
    private gtag: GoogleAnalyticsService,
    private api: ApiService,
    private version: VersionService,
  ) {
  }

  ngOnInit(): void {
    this.resetScrollAfterNavigationEnd();
    this.checkForApiMismatch();

    if (environment.production && this.swUpdate.isEnabled) {
      // PWA look for update
      this
        .swUpdate
        .versionUpdates
        .pipe(
          filter((evt): evt is VersionDetectedEvent => evt.type === 'VERSION_DETECTED'),
          tap(() => {
            this.waitingForUpdate = true;
          })
        ).subscribe();

      this
        .swUpdate
        .versionUpdates
        .pipe(
          filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
          map(
            evt => ({
              type: 'UPDATE_AVAILABLE',
              current: evt.currentVersion,
              available: evt.latestVersion,
            })
          ),
          tap(() => {
            this.updateAvailable = true;
          })
        ).subscribe();
    }
  }

  // resetting the scrollbar after navigation
  // due to the nested router use
  // + the fixed size of layout (to keep footer away during page transition)
  // this needed
  resetScrollAfterNavigationEnd() {
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
  }

  checkForApiMismatch() {
    this
      .api
      .getApiVersion()
      .subscribe({
        next: (version) => {
          const compatible = this.version.isCompatible(version);

          if (compatible === true) {
            console.log('APP fully compatible with API');
            return;
          }

          console.warn('APP not compatible with API', compatible);

          if (compatible.type === IncompatibilityType.client) {
            if (compatible.level > IncompatibilityLevel.patch) {
              this.waitingForUpdate = true;
            } else {
              this.snackBar.open(
                'Une nouvelle version est en cours de téléchargement.',
                'Ok',
                {
                  duration: 5000,
                }
              );
            }
          }

          if (compatible.type === IncompatibilityType.server) {
            if (compatible.level > IncompatibilityLevel.patch) {
              this.serverError = true;
            }
          }
        },
        error: () => {
          this.serverError = true;
        }
      });
  }

  refresh() {
    window.location.reload();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.activatedRouteData['animation'];
  }
}
