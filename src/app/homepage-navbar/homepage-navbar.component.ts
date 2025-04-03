import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-homepage-navbar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './homepage-navbar.component.html',
  styleUrl: './homepage-navbar.component.css',
})
export class HomepageNavbarComponent implements OnInit {
  customerTypeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.customerTypeForm = this.fb.group({
      customerType: ['', Validators.required],
    });
  }

  customerTypeSubmit() {
    if (this.customerTypeForm.valid) {
      const selectedOption = this.customerTypeForm.value.customerType;
      console.log('Selected option is:', selectedOption);

      if (selectedOption === 'Account Holder') {
        this.router.navigate(['account-holder'], {
          state: { customerType: selectedOption },
        });
      } else if (selectedOption === 'Non Account Holder') {
        this.router.navigate(['guest'], {
          state: { customerType: selectedOption },
        });
      }
    } else {
      console.log('Form is invalid. Please select an option.');
    }
  }

  isDropdownOpen = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  navigateTo(route: string) {
    this.router.navigate([route], { state: { customerType: route } });
  }
}
