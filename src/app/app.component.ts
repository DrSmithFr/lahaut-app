import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {SwPush, SwUpdate, VersionReadyEvent} from '@angular/service-worker';
import {filter, map} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {transition, trigger} from '@angular/animations';
import {fadeIn, fallIn, fallOut, slideIn, slideOut} from './animations/router-transitions';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GoogleAnalyticsService} from "./services/google-analytics.service";

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
      trigger('routeAnimations', [
        // Customer registration
        transition('registerCustomer => login', slideOut),
        transition('login => registerCustomer', slideIn),

        // Monitor registration
        transition('registerCustomer => registerMonitor', fallOut),
        transition('registerMonitor => registerCustomer', fallIn),

        transition('searchPage => login, searchPage => registerCustomer', slideOut),
        transition('login => searchPage, registerCustomer => searchPage, registerMonitor => searchPage', slideIn),

        // Monitor dashboard
        transition('dashboard => planning', slideIn),
        transition('planning => dashboard', slideOut),

        // Booking tunnel
        transition('searchPage => cart, cart => quickConnect, quickConnect => booking, booking => payment', slideIn),
        transition('payment => booking, booking => quickConnect, quickConnect => cart, cart => searchPage', slideOut),


        transition('* <=> *', fadeIn),
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
      // PWA look for update
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
          )
        ).subscribe(() => {
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
