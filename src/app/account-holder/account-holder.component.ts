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
import { error } from 'console';
import { Route, Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-account-holder',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './account-holder.component.html',
  styleUrl: './account-holder.component.css',
})
export class AccountHolderComponent implements OnInit {
  accountHolderForm!: FormGroup;
  state: any;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private customerapiServiceService: CustomerapiServiceService
  ) {
    this.state = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.state);

    if (this.state == undefined) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.accountHolderForm = this.fb.group({
      accountNumber: ['', [Validators.required]],
      ifscCode: ['', [Validators.required]],
    });
  }

  account_holder() {}

  accountHolderSubmit() {
    if (this.accountHolderForm.valid) {
      const userData = this.accountHolderForm.value;
      console.log('called');
      this.customerapiServiceService.account_holder(userData).subscribe({
        next: (response) => {
          console.log(response);
          if (response.email) {
            console.log('account holder calls customer api service');
            this.router.navigate(['account-holder-service'], {
              state: {
                customerType: this.state.customerType,
                accountNumber: this.accountHolderForm.value.accountNumber,
                ifscCode: this.accountHolderForm.value.ifscCode,
                email: response.email,
                name: response.name,
                mobile: response.mobile,
              },
            });
          } else {
            this.router.navigate(['customer'], {
              state: { error: 'Account holder not found' },
            });
          }
        },
        error: (error) => {
          console.log('unable to call account holder from customer apiservice');
        },
      });
    } else {
      console.log('invalid account holder fields');
    }
  }
}
