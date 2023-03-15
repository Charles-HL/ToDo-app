import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { Signup } from 'src/app/shared/models/dto/signup';
import { environment } from 'src/environments/environment';
import { Logout } from 'src/app/shared/models/dto/logout';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

    protected baseUrl = environment.API_BASE_PATH;
    readonly defaultHeaders: HttpHeaders = new HttpHeaders();

    constructor(protected http: HttpClient) {
    }
    
    public postAuthlogin(loginDto: Login): Observable<any> {
        const url = `${this.baseUrl}/login`;
        const body = this.dtoToFormData(loginDto);
        let headers = this.defaultHeaders;
        return this.http.post(url, body, {headers});
    }

    /**
     * Get a task by id
     * 
     * @param id task id
     * @param doNotShowPopupErrorOn404 if true, then no popup error will be shown if the task is not found (404)
     * @param doNotHandleError401 if true, then no popup error will be shown if the user is not authenticated (401)
     * @returns Observable of the task
     */
    public getTask(id: number, doNotShowPopupErrorOn404 = true, doNotHandleError401 = true): Observable<any> {
        const url = `${this.baseUrl}/task/${id}`;
        let headers = this.defaultHeaders;
        
        if (doNotShowPopupErrorOn404) {
            // this header is only used by the interceptor, it will be removed before sending the request to the server
            headers = headers.append('do-not-show-popup-error-on-404', 'true');
        }
        if (doNotHandleError401) {
            // this header is only used by the interceptor, it will be removed before sending the request to the server
            headers = headers.append('do-not-handle-error-401', 'true');
        }
        console.warn(doNotShowPopupErrorOn404, headers)
        return this.http.get(url, {headers: headers});
    }

    public postIsTaskDone(id: number, isDone: boolean): Observable<any> {
        const url = `${this.baseUrl}/task/${id}/done/${isDone}`;
        let headers = this.defaultHeaders;
        
        return this.http.post(url, { headers });
    }

    public getTasks(): Observable<any> {
        const url = `${this.baseUrl}/tasks`;
        let headers = this.defaultHeaders;
        
        return this.http.get(url, {headers});
    }
    
    public postAuthLogout(logoutDto: Logout): Observable<any> {
        const url = `${this.baseUrl}/signout`;
        let headers = this.defaultHeaders;
        
        return this.http.post(url, this.dtoToFormData(logoutDto) , { headers });
    }

    public postSignup(signupDto: Signup): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        const body = this.dtoToFormData(signupDto);
        let headers = this.defaultHeaders;
        
        return this.http.post(url, body, { headers });
    }

    public postKeepAlive(): Observable<any> {
        const url = `${this.baseUrl}/keep-alive`;
        let headers = this.defaultHeaders;
        
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