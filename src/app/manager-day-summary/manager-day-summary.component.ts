import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AdminapiServiceService } from '../services/adminapi-service.service';
import { ManagerDashboardComponent } from '../manager-dashboard/manager-dashboard.component';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-day-summary',
  imports: [ManagerDashboardComponent, CommonModule],
  templateUrl: './manager-day-summary.component.html',
  styleUrl: './manager-day-summary.component.css'
})
export class ManagerDaySummaryComponent {


  daySummaryList: any[] =[];
  constructor(private http: HttpClient, private customerapiServiceService: CustomerapiServiceService ) {}

  ngOnInit(): void {
    this.fetchDaySummary(); 
  }

  fetchDaySummary(): void {
    this.customerapiServiceService.daySummary().subscribe({
      next: (response) => {
        this.daySummaryList = response;
        console.log('Day Summary:', this.daySummaryList);
      },
      error: (error) => {
        console.error('Error fetching day summary', error);
      }
    });
  }
}