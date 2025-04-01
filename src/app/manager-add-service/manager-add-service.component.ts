import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AdminapiServiceService } from '../services/adminapi-service.service';
import { response } from 'express';
import { error } from 'console';
import { ManagerDashboardComponent } from '../manager-dashboard/manager-dashboard.component';

@Component({
  selector: 'app-manager-add-service',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manager-add-service.component.html',
  styleUrl: './manager-add-service.component.css'
})
export class ManagerAddServiceComponent implements OnInit {
  adminAddServiceForm!: FormGroup;

constructor(private router: Router, private http: HttpClient, private fb : FormBuilder, private adminapiServiceService: AdminapiServiceService ){
}

ngOnInit(){
  this.adminAddServiceForm = this.fb.group({
    customerType: ['',[Validators.required]],
    serviceName: ['',[Validators.required]]
  })
} 

addService(){
 if(this.adminAddServiceForm.valid){
  const userData :any={}
  userData.serviceType = this.adminAddServiceForm.value.customerType;
  // userData.serviceType = 'ACCOUNT_HOLDER';
  userData.name = this.adminAddServiceForm.value.serviceName;

  console.log("userdata is: "+userData);
console.log(userData)
  this.adminapiServiceService.managerAddService(userData).subscribe({
    next: (response) => {
      console.log(response);
      this.router.navigate(['/manager-dashboard/manager-assign-counter'])
    },
    error: (error) =>{
      console.log("error in adding service");
    }
  })
 }
  // this.router.navigate(["/manager-dashboard"])
}


}
