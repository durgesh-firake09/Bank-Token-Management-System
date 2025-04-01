import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { Router } from '@angular/router';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-account-holder-services',
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './account-holder-services.component.html',
  styleUrl: './account-holder-services.component.css',
})
export class AccountHolderServicesComponent implements OnInit {
  availableServiceForm!: FormGroup;
  customerServices: any;
  state: any;
  errMsg: string = '';
  showAlert: boolean = false;
  alertType: string = 'success';
  constructor(
    private fb: FormBuilder,
    private client: HttpClient,
    private router: Router,
    private customerapiServiceService: CustomerapiServiceService
  ) {
    console.log(this.router.getCurrentNavigation()?.extras.state);
    this.state = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.availableServiceForm = this.fb.group({
      serviceId: ['', [Validators.required]],
    });
    this.customerapiServiceService
      .customer_landingService('ACCOUNT_HOLDER')
      .subscribe((response) => {
        this.customerServices = response;
        console.log(response);
      });
  }

  account_holder_service() {}

  availableServiceSubmit() {



    if (this.availableServiceForm.valid) {
      this.showAlert = true;
      this.alertType = 'success';
      this.errMsg = 'Please wait while we process your request...';
      

      const userData = this.availableServiceForm.value;
      userData.email = this.state.email;
      userData.name = this.state.name;
      userData.mobile = this.state.mobile;

      console.log(userData);
      this.customerapiServiceService.issueToken(userData).subscribe({
        next: (response) => {
          console.log(response);
          console.log('account holder calls custmer api service');
          if (response.tokenNumber) {
            this.alertType = 'success';
            this.showAlert = true;
            this.errMsg = 'Token generated successfully!';
            this.router.navigate(['/displayToken'], { state: response });
            //print token and navigate to printing page
          }
        },
        error: (error) => {
          console.log('unable to call account holder from customer apiservice');
        },
      });
    } else {
      this.alertType = 'error';
      console.log('invalid account holder fields');
      this.showAlert=true;
      this.errMsg = 'Please select a service';
      setTimeout(() => {
        this.showAlert=false;
      }, 5000);

    }
  }
}
