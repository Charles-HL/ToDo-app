import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { Signup } from 'src/app/shared/models/dto/signup';
import { environment } from 'src/environments/environment';
import { Logout } from 'src/app/shared/models/dto/logout';
import { Task } from 'src/app/shared/models/dto/task';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

    protected baseUrl = environment.API_BASE_PATH;
    defaultHeaders: HttpHeaders = new HttpHeaders();

    constructor(protected http: HttpClient) {
    }
    
    public postAuthlogin(loginDto: Login): Observable<any> {
        const url = `${this.baseUrl}/login`;
        const body = this.dtoToFormData(loginDto);
        let headers = this.defaultHeaders;
        headers.append('Content-Type','application/json');
        return this.http.post(url, body, {headers});
    }

    public getTasks(): Observable<any> {
        const url = `${this.baseUrl}/tasks`;
        let headers = this.defaultHeaders;
        headers.append('Content-Type','application/json');
        return this.http.get(url, {headers});
    }
    
    public postAuthLogout(logoutDto: Logout): Observable<any> {
        const url = `${this.baseUrl}/signout`;
        let headers = this.defaultHeaders;
        headers.append('Content-Type','application/json');
        return this.http.post(url, this.dtoToFormData(logoutDto) , { headers });
    }

    public postSignup(signupDto: Signup): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        const body = this.dtoToFormData(signupDto);
        let headers = this.defaultHeaders;
        headers.append('Content-Type','application/json');
        return this.http.post(url, body, { headers });
    }

    public postKeepAlive(): Observable<any> {
        const url = `${this.baseUrl}/keep-alive`;
        let headers = this.defaultHeaders;
        headers.append('Content-Type','application/json');
        return this.http.post(url, { headers });
    }

    private dtoToFormData(dto: any) {
        let data = new FormData();
        for (let key in dto) {
            data.append(key, (dto as any)[key]);
        }
        return data;
    }

}