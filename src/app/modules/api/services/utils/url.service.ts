import { Injectable } from '@angular/core';
import {environment} from "../../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  readonly API_URL = environment.url_api;

  urlFormUri(uri: string): string {
    return this.API_URL + uri;
  }
}
