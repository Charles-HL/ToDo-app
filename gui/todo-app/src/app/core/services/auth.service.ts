import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { LoginResponse } from 'src/app/shared/models/dto/loginResponse';
import { ApiService } from './api.service';
import { ServerError } from 'src/app/shared/models/dto/serverError';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.isAlreadyLoggedIn()
  );

  constructor(
    private router: Router,
    private apiService: ApiService,
    private popupService: PopupService
  ) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    let loginDto: Login = {
      username: username,
      password: password,
    };
    return this.apiService.postAuthlogin(loginDto).pipe(
      map((loginResponse: LoginResponse) => {
        if (loginResponse.success) {
          this.setSession(loginResponse);
        }
        return loginResponse;
      })
    );
  }

  /**
   * Logout method calling the API
   */
  logout() {
    this.apiService.postAuthLogout().subscribe();
    this.logoutGui();
  }

  /**
   * Logout without calling back
   */
  private logoutGui() {
    this.router.navigate(['/login']);
    this.removeSession();
    this.emitIsLoggedSubject(false);
  }

  isAlreadyLoggedIn() {
    let currentUser = this.getLoggedUsername();
    let currentToken = this.getToken();
    let isAlreadyLogged: boolean =
      currentUser !== null &&
      currentUser !== undefined &&
      currentToken !== null &&
      currentToken !== undefined;
    console.debug(
      'Auth service checking if user already logged in, result = ' +
        isAlreadyLogged
    );
    return isAlreadyLogged;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  getLoggedUsername() : string | null {
    const username = localStorage.getItem('currentUser');
    if (username) {
      return JSON.parse(username);
    }
    return null;
  }


  async internalServerError(err: HttpErrorResponse) {
    this.logoutGui();

    /* As angular cant handle multiple response type,
    if it requests a blob as success response but receives a json as error response,
    angular will interprets it as blob. A parsing is then needed.
     see: https://github.com/angular/angular/issues/19148 */
    let serverError: ServerError = err.error;
    if (typeof err.error === 'string') {
      serverError = JSON.parse(err.error);
    } else if (err.error instanceof Blob) {
      serverError = JSON.parse(await err.error.text());
    }

    let errorMessage: string = '';
    if (serverError && serverError.message) {
      errorMessage = errorMessage + serverError.message + '\n\n';
    }
    errorMessage = errorMessage + err.message + '\n';
    if (serverError && serverError.exceptionMessage) {
      errorMessage = errorMessage + serverError.exceptionMessage + '\n';
    }
    if (serverError && serverError.stacktrace) {
      errorMessage = errorMessage + serverError.stacktrace + '\n';
    }
    this.popupService.callPopupDetails(
      'Internal sever error occured.',
      errorMessage
    );
  }

  unautorizedAccess(err: HttpErrorResponse) {
    this.logoutGui();

    let description: string | undefined;

    if (err.error && typeof err.error === 'string') {
      description = err.error;
    }

    this.popupService.callPopupSimple(
      'You are unauthorized to access to this resource. Please try to login to your account again',
      description
    );
  }

  serverUnavailable() {
    this.logoutGui();
    this.popupService.callPopupSimple(
      'Server temporarily unavailable, under maintenance or not yet ready'
    );
  }

  connectionRefused() {
    this.logoutGui();
    this.popupService.callPopupSimple('Impossible to reach the server.');
  }

  badGateway(err: HttpErrorResponse) {
    this.logoutGui();
    this.popupService.callPopupDetails(
      'The proxy server received an invalid response from the  server. The  server may not be started.',
      JSON.stringify(err)
    );
  }

  browserTimeout() {
    if (this.isAlreadyLoggedIn()) {
      this.logout();
      this.popupService.callPopupSimple(
        'Your session expired because of inactivity in the browser'
      );
    }
  }

  private setSession(loginResponse: LoginResponse) {
    localStorage.setItem(
      'currentUser',
      JSON.stringify(loginResponse.username)
    );
    localStorage.setItem('id_token', loginResponse.token);
  }

  private removeSession() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('id_token');
  }

  emitIsLoggedSubject(isLogged: boolean): void {
    console.debug(
      'Auth service emmiting logged subject with value ' + isLogged
    );
    this.isLoggedSubject$.next(isLogged);
  }
}
