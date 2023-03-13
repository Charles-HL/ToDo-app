import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { LoginResponse } from 'src/app/shared/models/dto/loginResponse';
import { ApiService } from './api.service';
import { PopupService } from './popup.service';
import { KeepAliveAuthService } from './keep-alive-auth.service';

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
    private popupService: PopupService,
    private keepAliveService: KeepAliveAuthService
  ) {
    keepAliveService.init(this.isLoggedSubject$);
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
    this.apiService.postAuthLogout({username: this.getLoggedUsername()!}).subscribe();
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


  internalServerError(err: HttpErrorResponse) {
    this.logoutGui();
    this.popupService.callPopupDetails(
      'Internal sever error occured.',
      err.error
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
