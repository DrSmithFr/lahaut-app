import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {InterceptorService} from "./services/interceptor/interceptor.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {AutoFocusDirective} from "./components/directives/auto-focus.directive";
import {Page404Component} from "./components/page404/page404.component";
import {HomeComponent} from "./components/home/home.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {LogoutDialog} from "./components/logout-dialog/logout.dialog";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {LoginComponent} from "./components/login/login.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {PasswordResetDialog} from "./components/password-reset/password-reset-dialog.component";
import {PasswordResetRequestDialog} from "./components/password-reset-request/password-reset-request.dialog";
import {GtagModule} from "angular-gtag";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import fr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    Page404Component,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    LogoutDialog,
    PasswordResetRequestDialog,
    PasswordResetDialog,
  ],
  imports: [
    // routing main module
    AppRoutingModule,

    // http client for api calls
    HttpClientModule,

    // loading browser modules
    BrowserModule,
    BrowserAnimationsModule,

    // importing reactive form
    FormsModule,
    ReactiveFormsModule,

    // Material modules
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatToolbarModule,

    // PWA service worker (cache management)
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Google Analytics
    GtagModule.forRoot({trackingId: 'UA-132202996-1', trackPageviews: true}),
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {
        hasBackdrop: true
      }
    },
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
