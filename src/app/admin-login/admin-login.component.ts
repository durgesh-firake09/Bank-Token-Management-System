import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';
import { link } from 'fs';
import { jwtDecode } from 'jwt-decode';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-admin-login',
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css',
})
export class AdminLoginComponent {
  credentials: any = {
    email: '',
    password: '',
  };

  showAlert: boolean = false;
  errMsg: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    // console.log(environment.adminUrl);
    if (localStorage.getItem('token')) {
      const token: string = localStorage.getItem('token') || '';
      const role = jwtDecode(token).sub?.split(':')[1];
      if (role == 'ROLE_MANAGER') {
        this.router.navigate(['/manager-dashboard']);
      } else if (role == 'ROLE_SERVICE_COUNTER') {
        this.router.navigate(['/service-counter-dashboard']);
      }
    }
  }

  adminlogin() {
    if (this.credentials.email == '' || this.credentials.password == '') {
      this.errMsg = 'Please enter all fields';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
      return;
    }
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        console.log(response);
        console.log(jwtDecode(response.token));
        const user = jwtDecode(response.token).sub?.split(':')[0];
        const role = jwtDecode(response.token).sub?.split(':')[1];
        if (role == 'ROLE_MANAGER') {
          this.router.navigate(['/manager-dashboard']);
        } else if (role == 'ROLE_SERVICE_COUNTER') {
          this.router.navigate(['/service-counter-dashboard']);
        }
      },
      (error) => {
        console.log('Login error');
        this.errMsg = 'Invalid credentials';
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 5000);
        console.log(error);
      }
    );
  }

  adminloginSubmit() {}
}
