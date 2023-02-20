import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {InterceptorService} from "./services/interceptor/interceptor.service";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatBadgeModule} from "@angular/material/badge";
import {AutoFocusDirective} from "./components/directives/auto-focus.directive";
import {LoaderComponent} from "./components/loader/loader.component";
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

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    LoaderComponent,
    Page404Component,
    HomeComponent,
    NavigationComponent,
    LoginComponent,
    LogoutDialog
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

    // users modules
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
  ],
  exports:      [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [
    {
      provide:  MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {duration: 2500}
    },
    {
      provide:  HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:    true
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: {hasBackdrop: false}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
