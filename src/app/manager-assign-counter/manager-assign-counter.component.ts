import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { AdminapiServiceService } from '../services/adminapi-service.service';
import { CommonModule } from '@angular/common';
import { ManagerDashboardComponent } from '../manager-dashboard/manager-dashboard.component';
import { response } from 'express';

@Component({
  selector: 'app-manager-assign-counter',
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagerDashboardComponent,
  ],
  templateUrl: './manager-assign-counter.component.html',
  styleUrl: './manager-assign-counter.component.css',
})
export class ManagerAssignCounterComponent implements OnInit {
  constructor(
    private router: RouterModule,
    private fb: FormBuilder,
    private adminapiServiceService: AdminapiServiceService
  ) {
    this.adminAssignCounterForm = this.fb.group({});
  }

  adminAssignCounterForm!: FormGroup;
  serviceList: any;
  counterList: any;

  ngOnInit(): void {
    this.getCounters();
    this.fetchServiceList();
  }
  fetchServiceList() {
    if (this.adminAssignCounterForm.valid) {
      this.adminapiServiceService.fetchServiceList().subscribe({
        next: (response: any) => {
          console.log(response);
          this.serviceList = response;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else {
      console.log('error in assigning counter');
    }
  }

  deleteService() {
    if (this.adminAssignCounterForm.valid) {
      this.adminapiServiceService.deleteCounterService(1).subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
  assignCounterService(e: any, serviceId: any) {
    if (this.adminAssignCounterForm.valid) {
      this.adminapiServiceService
        .assignCounterService({
          serviceId: serviceId,
          counterId: e.target.value,
        })
        .subscribe({
          next: (response: any) => {
            this.serviceList.filter((service: any) => {
              if (service.id === serviceId) {
                service.counterId = e.target.value;
              }
            });
            console.log(response);
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    }
  }

  getCounters() {
    // this.adminapiServiceService.getCounters().subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.counterList=response;
    //   },
    //   error: (error: any) => {
    //     console.log(error);
    //   },
    // });
    this.adminapiServiceService.getCounters().subscribe((response) => {
      console.log(response);
      this.counterList = response;
    });
  }
}
