import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UrlService} from "../utils/url.service";

// handle API calls security token injection
// handle session renewal (when getting 401)
// sending back user to login page if refresh token is not valid
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  isRefreshingToken = false;

  constructor(
    private router: Router,
    private urlService: UrlService,
    private authService: AuthService,
    private readonly snackBar: MatSnackBar,
  ) {
  }

  intercept<T>(request: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    const apiUrl = this.urlService.urlFormUri('');

    // if not an api call, do nothing
    if (!request.url.startsWith(apiUrl)) {
      return next.handle(request);
    }

    // if public api call, do nothing
    if (request.url.startsWith(apiUrl + '/public')) {
      return next.handle(request);
    }

    return next
      .handle(this.updateAuthHeaders(request))
      .pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return this.handleUnauthorized<T>(request, next);
          }

          return throwError(() => err)
        })
      );
  }

  private handleUnauthorized<T>(request: HttpRequest<T>, next: HttpHandler) {
    if (this.isRefreshingToken) {
      return next.handle(this.updateAuthHeaders(request))
    }

    this.isRefreshingToken = true;

    return this
      .authService
      .reconnect()
      .pipe(
        switchMap(() => {
          this.isRefreshingToken = false;

          return next.handle(this.updateAuthHeaders(request));
        }),
        catchError((err) => {
          this.isRefreshingToken = false;

          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.redirectToLogin();
          }

          return throwError(() => err);
        })
      );
  }

  private updateAuthHeaders<T>(request: HttpRequest<T>): HttpRequest<T> {
    const token = this.authService.getToken();

    if (null !== token && null !== token.token) {
      request = request.clone(
        {
          setHeaders: {
            Authorization: `Bearer ${token.token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        }
      );
    }

    return request;
  }

  private redirectToLogin(): void {
    this.authService.disconnect();

    this
      .snackBar
      .open(
        'La sessions à expirée, veuillez vous reconnecter',
        'OK',
        {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      );

    this.router.navigate(['/login']);
  }
}
