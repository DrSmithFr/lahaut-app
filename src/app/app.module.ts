import {isDevMode, LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AuthInterceptorService} from "./modules/api/services/interceptor/auth-interceptor.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {AutoFocusDirective} from "./components/directives/auto-focus.directive";
import {Page404Component} from "./pages/page404/page404.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {LogoutDialog} from "./dialogs/logout-dialog/logout.dialog";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {LoginPage} from "./pages/login/login.page";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {GtagModule} from "angular-gtag";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import fr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
import {NgxMaskModule} from "ngx-mask";
import {ConnectModule} from "./modules/connect/connect.module";

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    Page404Component,
    NavigationComponent,
    LoginPage,
    LogoutDialog,
  ],
  imports: [
    // routing main module
    AppRoutingModule,

    // Connect module
    ConnectModule,

    // http client for api calls
    HttpClientModule,

    // loading browser modules
    BrowserModule,
    BrowserAnimationsModule,

    // importing reactive form
    FormsModule,
    ReactiveFormsModule,

    // Date modules
    MatNativeDateModule,

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

    // Init ngx-mask
    NgxMaskModule.forRoot(),
    ConnectModule
  ],
  exports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    LoginPage
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
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
