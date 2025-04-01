import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { Router, RouterModule } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-manager-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    AlertComponent
],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
})
export class ManagerDashboardComponent implements OnInit {
  // managerdashboardForm! : FormGroup;
  managerdashboard: any;
  showAlert: boolean = false;
  alertType: string = 'success';
  alertMessage: string = '';


  managerEmail:any;
  ngOnInit(): void {
    const token = localStorage.getItem('token')||'';
    this.managerEmail = jwtDecode(token).sub?.split(":")[0];

  }

  constructor(
    private router: Router,
    private client: HttpClient,
    private fb: FormBuilder,
    private customerapiService: CustomerapiServiceService
  ) {
    if (localStorage.getItem('token')) {
      const token: string = localStorage.getItem('token') || '';
      if (token.length == 0) {
        this.router.navigate(['/admin-login']);
      } else {
        this.showAlert = true;
        this.alertType = 'success';
        this.alertMessage = 'Login Successful';
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
      }
    }
  }

  managerDashboardService() {}

  addService() {
    console.log('ok 🙋‍♀️');
    this.router.navigate(['manager-dashboard/manager-add-service']);
  }

  daySummary() {
    this.router.navigate(['manager-dashboard/manager-day-summary']);
  }

  getAnalysis() {
    this.router.navigate(['manager-dashboard/manager-token-statistics']);
  }
  assignCounter() {
    this.router.navigate(['manager-dashboard/manager-assign-counter']);
  }
}
