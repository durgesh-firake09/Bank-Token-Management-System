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
import { Router } from '@angular/router';
import { response } from 'express';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-customer-landing',
  imports: [CommonModule, FormsModule, HttpClientModule, ReactiveFormsModule, AlertComponent],
  templateUrl: './customer-landing.component.html',
  styleUrl: './customer-landing.component.css',
})
export class CustomerLandingComponent  {
  customerTypeForm: FormGroup;
  showAlert: boolean = false;
state:any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerapiServiceService: CustomerapiServiceService
  ) {
   
    this.customerTypeForm = this.fb.group({
      customerType: ['', Validators.required],
    });
    this.state = this.router.getCurrentNavigation()?.extras.state;
    if(this.state && this.state.error){
      console.log(this.state.error);
      // alert(this.state.error);
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 5000);

    }

  }

  customerTypeSubmit() {
    if (this.customerTypeForm.valid) {
      const selectedOption = this.customerTypeForm.value.customerType;
      console.log('Selected option is:', selectedOption);
      
      if(selectedOption == "Account Holder"){
        this.router.navigate(['account-holder'], {
        state: { customerType: selectedOption },
      });}
      if(selectedOption == "Non Account Holder"){
        this.router.navigate(['guest'], {
          state: { customerType: selectedOption },
        });
      }
    } else {
      console.log('Form is invalid. Please select an option.');
    }
  }
}
