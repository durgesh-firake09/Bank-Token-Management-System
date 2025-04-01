import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { randomBytes } from 'crypto';
import { threadId } from 'worker_threads';
import { ajax } from 'rxjs/ajax';
//192.168.122.59
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.adminUrl + '/auth';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    // return this.http.post(`http://localhost:8080/login`, {
    //       : 'durgesh',
    //   password: 'durgesh',
    // });
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
