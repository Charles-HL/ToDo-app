/**
 * -------------------------------------------------------------------------
 * Copyright (c) 2023 Charles HL. All rights reserved
 * -------------------------------------------------------------------------
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/shared/models/dto/login';
import { Signup } from 'src/app/shared/models/dto/signup';
import { environment } from 'src/environments/environment';
import { Logout } from 'src/app/shared/models/dto/logout';
import { Task } from 'src/app/shared/models/dto/task';

/**
 * API service
 */
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
        return this.http.get(url, {headers: headers});
    }


    /**
     * Create a new task
     * @param task the task to create
     * @returns Observable of the created task
     */
    public putTask(task: Task): Observable<any> {
        const url = `${this.baseUrl}/task`;
        let headers = this.defaultHeaders;
        const body = this.dtoToFormData(task);
        return this.http.put(url, body, {headers});
    }

    /**
     * Update the status done of a task
     * @param id task id
     * @param isDone true if the task is done, false otherwise
     * @returns Observable of the updated task
     */
    public postIsTaskDone(id: number, isDone: boolean): Observable<any> {
        const url = `${this.baseUrl}/task/${id}/done/${isDone}`;
        let headers = this.defaultHeaders;
        
        return this.http.post(url, { headers });
    }

    /**
     * Get tasks
     * @returns Observable of the list of tasks
     */
    public getTasks(): Observable<any> {
        const url = `${this.baseUrl}/tasks`;
        let headers = this.defaultHeaders;
        
        return this.http.get(url, {headers});
    }
    
    /**
     * Post a logout request to the server
     * @param logoutDto the logout dto
     * @returns Observable of the response
     */
    public postAuthLogout(logoutDto: Logout): Observable<any> {
        const url = `${this.baseUrl}/signout`;
        let headers = this.defaultHeaders;
        
        return this.http.post(url, this.dtoToFormData(logoutDto) , { headers });
    }

    /**
     * Post a signup request to the server
     * @param signupDto the signup dto
     * @returns Observable of the response
     */
    public postSignup(signupDto: Signup): Observable<any> {
        const url = `${this.baseUrl}/signup`;
        const body = this.dtoToFormData(signupDto);
        let headers = this.defaultHeaders;
        
        return this.http.post(url, body, { headers });
    }

    /**
     * Post a keep-alive request to the server
     * @returns Observable of the response
     */
    public postKeepAlive(): Observable<any> {
        const url = `${this.baseUrl}/keep-alive`;
        let headers = this.defaultHeaders;
        
        return this.http.post(url, { headers });
    }

    /**
     * Convert a dto to a FormData object
     * @param dto the dto to convert
     * @returns the FormData object
     */
    private dtoToFormData(dto: Object): FormData {
        let data = new FormData();
        for (let key in dto) {
            data.append(key, (dto as any)[key]);
        }
        return data;
    }

}