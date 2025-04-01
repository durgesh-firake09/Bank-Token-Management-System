import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomepageNavbarComponent } from '../homepage-navbar/homepage-navbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [HomepageNavbarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent //implements //OnInit, //OnDestroy {
{
  // homeActive: boolean = true;
  heroImage = 'familyphoto.jpeg';
  personalLoanImage = 'mpersonalloan.jpeg';
  homeLoanImage = 'homeloan.jpeg';
  goldLoanImage = 'goldloan.jpeg';
  backedLoanImage = 'backedloan.jpeg';
  fixedDepositImage = 'fixeddeposit.jpeg';
  mutualFundsImage = 'mutualfunds.jpeg';

  customerTypeForm!: FormGroup;
  // ngOnInit(): void {
  //   this.homeActive = true;
  // }
  // ngOnDestroy(): void {
  //   this.homeActive = false;
  // }
  constructor(private fb: FormBuilder, private router: Router) {}

  // ngOnInit(): void {

  //   this.customerTypeForm = this.fb.group({
  //     customerType: ['', Validators.required]
  //   });
  // }

  // customerTypeSubmit() {
  //   if (this.customerTypeForm.valid) {
  //     const selectedOption = this.customerTypeForm.value.customerType;
  //     console.log('Selected option is:', selectedOption);

  //     if (selectedOption === 'Account Holder') {
  //       this.router.navigate(['account-holder'], {
  //         state: { customerType: selectedOption }
  //       });
  //     } else if (selectedOption === 'Non Account Holder') {
  //       this.router.navigate(['guest'], {
  //         state: { customerType: selectedOption }
  //       });
  //     }
  //   } else {
  //     console.log('Form is invalid. Please select an option.');
  //   }
  // }
}
