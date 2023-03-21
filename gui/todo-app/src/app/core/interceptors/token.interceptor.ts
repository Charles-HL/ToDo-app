/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { catchError, tap } from 'rxjs/operators';
import { PopupService } from '../services/popup.service';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private popupService: PopupService,
    private loading: LoadingService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let doNotShowPopupErrorOn404 = false;
    let doNotHandleError401 = false;
    if (request.headers.has('do-not-show-popup-error-on-404')) {
      doNotShowPopupErrorOn404 = true;
      // remove the value as its not a valid header for the server
      request = request.clone({headers: request.headers.delete('do-not-show-popup-error-on-404')});
    }
    if (request.headers.has('do-not-handle-error-401')) {
      doNotHandleError401 = true;
      // remove the value as its not a valid header for the server
      request = request.clone({headers: request.headers.delete('do-not-handle-error-401')});
    }
    const token = this.authService.getToken();
    const username = this.authService.getLoggedUsername();
    if (token && username) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token,
        },
      });
    }
    console.debug('New request', request);
    if (!request.url.endsWith('/keep-alive')) {
      this.loading.setLoading(true, request.url);
    }
    return next.handle(request).pipe(
      tap((httpEvent: HttpEvent<any>) => {
          console.debug('Data received', httpEvent)
          if (httpEvent instanceof HttpResponse) {
            this.loading.setLoading(false, request.url);
          }
        }
      ),
      catchError((err: HttpErrorResponse) => {
        this.loading.setLoading(false, request.url);
        console.warn(request, err)
        if (doNotShowPopupErrorOn404 && err.status === 404 || doNotHandleError401 && err.status === 401) {
          return throwError(() => err);
        }
        if (err.status === 500) {
          this.authService.internalServerError(err);
        } else if (err.status === 401) {
          this.authService.unautorizedAccess(err);
        } else if (err.status === 403) {
          this.popupService.callPopupDetails(
            'You does not have access rights to the requested resource' +
              ' : ' +
              err.url,
            err.message + '\n' + JSON.stringify(err.error)
          );
        } else if (err.status === 503) {
          this.authService.serverUnavailable();
        } else if (err.status === 502) {
          this.authService.badGateway(err);
        } else if (err.status === 0) {
          this.authService.connectionRefused();
        } else {
          if (isErrorStringHtml(err)) {
            // if error message is an html page
            this.popupService.callPopupDetails(
              'An error occured during the request.',
              err.message + '\n' + err.error,
              undefined,
              err.error
            );
          } else {
            this.popupService.callPopupDetails(
              'An error occured during the request.',
              err.message + '\n' + err.error,
              err.error
            );
          }
        }
        return throwError(() => err);
      })
    );
  }
}

export const isErrorStringHtml = (err: HttpErrorResponse): boolean => {
  return (
    err.error &&
    typeof err.error &&
    Array.from(
      new DOMParser().parseFromString(err.error, 'text/html').body.childNodes
    ).some((node) => node.nodeType === 1)
  );
};
