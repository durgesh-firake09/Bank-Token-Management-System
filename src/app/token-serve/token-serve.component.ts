import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerapiServiceService } from '../services/customerapi-service.service';

@Component({
  selector: 'app-token-serve',
  imports: [CommonModule, FormsModule, HttpClientModule,ReactiveFormsModule],
  templateUrl: './token-serve.component.html',
  styleUrl: './token-serve.component.css'
})
export class TokenServeComponent {
  adminloginForm : FormGroup;
  
    constructor(private http: HttpClient, private fb: FormBuilder,private customerapiServiceService: CustomerapiServiceService){
      this.adminloginForm = this.fb.group({
        account_number: ['', [Validators.required]],
        ifsc_code:  ['', [Validators.required]],
      })
    }

    adminloginService(){
      if(this.adminloginForm.valid){
        const userData = this.adminloginForm.value;
        this.customerapiServiceService.adminloginService(userData).subscribe({
          next: (response:any) =>{
            console.log("Customer Api service called by admin Login")
          },

          error: (error:any) => {
            console.log("customer api does not cal;l itoken-serve")
          }
        })

     
      }
    }
  
    adminloginSubmit(){
      
    }

}
