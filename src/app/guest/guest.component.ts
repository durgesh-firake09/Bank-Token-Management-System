import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  EmailValidator,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-guest',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AlertComponent,
  ],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css',
})
export class GuestComponent {
  guestForm: FormGroup;
  state: any;
  showAlert: boolean = false;
  errMsg: string = '';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private customerapiServiceService: CustomerapiServiceService
  ) {
    this.guestForm = this.fb.group({
      email: ['', [Validators.required,Validators.email]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    });
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if (this.state) {
    } else {
      this.router.navigate(['/']);
    }
  }

  guestService() {}

  guestSubmit() {
    if (this.guestForm.valid) {
      this.router.navigate(['guest-service'], {
        state: {
          customerType: this.state.customerType,
          email: this.guestForm.value.email,
          name: this.guestForm.value.name,
          mobile: this.guestForm.value.mobile,
        },
      });
      console.log('invalid account holder fields');
    } else {
      this.showAlert = true;
      this.errMsg = 'Please fill all the fields correctly';
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);
    }
  }
}
