import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptorService} from "./modules/api/services/interceptor/auth-interceptor.service";
import {AutoFocusDirective} from "./modules/_shared/directives/auto-focus.directive";
import {Page404Component} from "./pages/page404/page404.component";
import {LogoutDialog} from "./dialogs/logout-dialog/logout.dialog";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {LoginPage} from "./pages/login/login.page";
import {GtagModule} from "angular-gtag";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import fr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {NgxMaskModule} from "ngx-mask";
import {SharedModule} from "./modules/_shared/shared.module";
import {ConnectModule} from "./modules/connect/connect.module";
import {MatButtonModule} from "@angular/material/button";
import {environment} from "../environments/environment";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    Page404Component,
    LoginPage,
    LogoutDialog,
  ],
  imports: [
    // routing main module
    AppRoutingModule,

    // shared module
    SharedModule,
    ConnectModule,

    // http client for api calls
    HttpClientModule,

    // loading browser modules
    BrowserModule,
    BrowserAnimationsModule,

    // material modules
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,

    // PWA service worker (cache management)
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 5 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:5000'
    }),

    // Google Analytics
    GtagModule.forRoot({trackingId: environment.google.analytics, trackPageviews: true}),

    // Init ngx-mask
    NgxMaskModule.forRoot(),
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    LoginPage,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true,
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '150ms',
      }
    },
    {provide: LOCALE_ID, useValue: environment.locale},
    {provide: MAT_DATE_LOCALE, useValue: environment.locale},
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
