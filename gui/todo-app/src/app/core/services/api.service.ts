import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpContext, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParameterCodec, HttpResponse } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { Signup } from 'src/app/shared/models/dto/signup';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

    protected baseUrl = '/';
    public defaultHeaders = new HttpHeaders();

    constructor(protected http: HttpClient) {
    }
    
    public postAuthlogin(loginDto: Login): Observable<any> {
        const url = `${this.baseUrl}/login`;
        const body = loginDto;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers });
    }
    
    public postAuthLogout(): Observable<any> {
        const url = `${this.baseUrl}/logout`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, { headers });
    }

    public postSignup(signupDto: Signup): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        const body = signupDto;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, body, { headers });
    }

    public postKeepAlive(): Observable<any> {
        const url = `${this.baseUrl}/keep-alive`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post(url, { headers });
    }
}