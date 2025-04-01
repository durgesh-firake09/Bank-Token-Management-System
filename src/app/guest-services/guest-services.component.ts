import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-guest-services',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './guest-services.component.html',
  styleUrl: './guest-services.component.css',
})
export class GuestServicesComponent {
  guestServiceForm: FormGroup;
  guestService: any = '';
  state: any;
  errMsg: string = '';
  showAlert: boolean = false;
  alertType: string = 'success';
  alertMessage: string = '';
  duration: number = 5000;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private customerapiServiceService: CustomerapiServiceService
  ) {
    this.guestServiceForm = this.fb.group({
      guestService: ['', [Validators.required]],
    });
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (!this.state) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.guestServiceForm = this.fb.group({
      serviceId: ['', [Validators.required]],
    });
    this.customerapiServiceService
      .customer_landingService('NON_ACCOUNT_HOLDER')
      .subscribe((response) => {
        this.guestService = response;
        console.log(response);
      });
  }

  guestServiceservice() {}

  guestServiceSubmit() {
    if (this.guestServiceForm.valid) {
      const userData = this.guestServiceForm.value;
      userData.email = this.state.email;
      userData.name = this.state.name;
      userData.mobile = this.state.mobile;

      console.log(userData);
      this.alertMessage = 'Please Wait for your token number';
      this.alertType = 'success';
      // this.duration = 100000;
      this.showAlert = false;
      this.showAlert = true;

      this.customerapiServiceService.issueToken(userData).subscribe({
        next: (response) => {
          console.log(response);
          console.log('account holder calls custmer api service');
          if (response.tokenNumber) {
            this.alertType = 'success';
            this.alertMessage = 'Token Number Issued Successfully';
            this.showAlert = true;
            this.router.navigate(['/displayToken'], { state: response });
          }
        },
        error: (error) => {
          console.log('unable to call account holder from customer apiservice');
        },
      });
    } else {
      console.log('invalid account holder fields');
      this.showAlert = true;
      this.alertMessage = 'Please select a service';
      this.alertType = 'error';
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }
}
