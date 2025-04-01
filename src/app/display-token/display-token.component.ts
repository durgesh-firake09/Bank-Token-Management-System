import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-diaplay-token',
  providers:[DatePipe],
  templateUrl: './display-token.component.html',
  styleUrls: ['./display-token.component.css']
})
export class DisplayTokenComponent implements OnInit {
  state: any;
  token: any = {}; 

  constructor(
    private http: HttpClient,
    private router: Router,
    public datePipe:DatePipe
  ) {
 
    this.state = this.router.getCurrentNavigation()?.extras.state;

   
    if (this.state === undefined) {
      this.router.navigate(['/']);
    } else {
      
      this.token = typeof this.state === 'string' ? JSON.parse(this.state) : this.state;
    }

    console.log(this.state);
    console.log(this.token);
  }

  ngOnInit(): void {}

  downloadToken(): void {
    console.log("In download");
    const tokenData = this.token;
    const header = `Token \n\n`;


    const formattedToken = `
        
        Token Number: ${tokenData.tokenNumber}

        Customer Name: ${tokenData.customerName}

        Email: ${tokenData.email}

        Timestamp: ${this.datePipe.transform(tokenData.timestamp, 'medium')}

        Token Status: ${tokenData.tokenStatus}

        Expected Wait Time: ${tokenData.expectedWaitTime} 

        Service Type: ${tokenData.customerService.serviceType}

        Service Name: ${tokenData.customerService.name}

        Customer Service ID: ${tokenData.customerService.id}`;

    // const fullContent = header + formattedToken;

   
    // const blob = new Blob([fullContent], { type: 'text/pdf;charset=utf-8' });
    const doc = new jsPDF();
    doc.text(header + formattedToken,50, 50); 
    doc.save('token.pdf');
  
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'token.pdf'; 
    // a.click();

    // window.URL.revokeObjectURL(url);
    this.router.navigate(["/display-token-number"]);
  }


}
