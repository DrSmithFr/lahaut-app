/// <reference types="@angular/localize" />



import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {environment} from "./environments/environment";

/* eslint-disable */
if (environment.production) {
  window.console.log = function () {};
  window.console.debug = function () {};
  window.console.warn = function () {};
  window.console.error = function () {};
  window.console.time = function () {};
  window.console.timeEnd = function () {};
}
/* eslint-enable */

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
