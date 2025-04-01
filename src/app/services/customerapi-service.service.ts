import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomerapiServiceService {
  private apiUrl = environment.customerUrl + '/api/customer';
  //port:1000
  constructor(private http: HttpClient) {}

  account_holder(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post<any>(`${this.apiUrl}/verify`, userData);
  }

  account_holder_service(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/services`, userData);
  }

  customer_landingService(userData: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/services/` + userData);
  }

  guestservicesService(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/issue`, userData);
  }

  issueToken(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/token/issue`, userData);
  }
  guestService(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/token/issue`, userData);
  }

  adminloginService(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/token/issue`, userData);
  }

  managerDashboardService(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/token/issue`, userData);
  }

  managerGetService(userData: any) {
    return this.http.get<any>(`${this.apiUrl}/manager/getService`, userData);
  }
  daySummary() {
    return this.http.get<any>(`${this.apiUrl}/daysummary`);
  }

  getCurrentTokenNumber(tokenNumber: any) {
    return this.http.get(`${this.apiUrl}/counter/token/current/${tokenNumber}`);
  }
  tokenStatistics(){
    return this.http.get<any>(`${this.apiUrl}/token/statistics`)
  }
}
