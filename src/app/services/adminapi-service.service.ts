import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { switchMap, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminapiServiceService {
  private apiUrl = environment.adminUrl + '/api/admin';
  private customerUrl = environment.customerUrl + '/api/customer';
  constructor(private http: HttpClient) {}
  cred = btoa('admin@gmail.com:admin');
  managerAddService(userData: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.post<any>(`${this.apiUrl}/service/create`, userData, {
      headers,
    });
  }

  getTokenQueue(counterId: any) {
    return this.http.get<any>(`${this.customerUrl}/token/${counterId}/PENDING`);
  }

  assignCounterService(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/counter/assign`, userData, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
    });
  }

  changeTokenStatus(userData: any) {
    return this.http.post<any>(`${this.customerUrl}/token/modifier`, userData);
  }
  deleteCounterService(serviceId: any) {
    return this.http.delete<any>(
      `${(this, this.customerUrl)}/service/delete/${serviceId}`
    );
  }
  fetchServiceList() {
    return this.http.get<any>(`${this.customerUrl}/services/all`);
  }

  getCounters() {
    const headers = new HttpHeaders({
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<any>(`${this.apiUrl}/counters/all`, {
      headers,
    });
  }

  getCountersShow(destroy$:any) {
    return timer(0, 5000).pipe(
      // Poll API every 3 seconds
      switchMap(() => this.http.get<any>(`${this.apiUrl}/counters/all`)),
      takeUntil(destroy$) // Unsubscribe when destroy$ emits
    );
  }
  getCounter(email: any) {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    return this.http.get<any>(`${this.apiUrl}/counter/${email}`, {
      headers,
    });
  }

  getCounterWiseAnalysis(){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });
    return this.http.get<any>(`${this.apiUrl}/analysis/counterwise`, {
      headers,
    });
  }
}
