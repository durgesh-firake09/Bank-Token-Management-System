import { Component, OnInit } from '@angular/core';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { ManagerDashboardComponent } from '../manager-dashboard/manager-dashboard.component';
import { ManagerAnalysisCounterwiseComponent } from "../manager-analysis-counterwise/manager-analysis-counterwise.component";

@Component({
  selector: 'app-manager-day-analysis',
  imports: [CommonModule, CanvasJSAngularChartsModule, ManagerAnalysisCounterwiseComponent],
  templateUrl: './manager-day-analysis.component.html',
  styleUrl: './manager-day-analysis.component.css',
})
export class ManagerDayAnalysisComponent implements OnInit {
  constructor(private customerapiservice: CustomerapiServiceService, private router: Router) {
  }
  chartOptions: any = {};
  
  ngOnInit(): void {
    
    this.dayAnalysis();
  }
  dataPoints: any = [];

  dayAnalysis() {
    this.customerapiservice.tokenStatistics().subscribe({
      next: (response: any) => {
        console.log(response.servicesCount);
        // console.log(response)
        console.log(response.priorityServicesCount);
        for (let i = 0; i < response.servicesCount.length; i++) {
          this.dataPoints.push({
            y: response.servicesCount[i].tokenCount,
            name: response.servicesCount[i].serviceName,
          });
        }
        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: 'Tokens serviced',
          },
          data: [
            {
              type: 'doughnut',
              yValueFormatString: "#,###.##",
              indexLabel: '{name}',
              dataPoints: this.dataPoints,
            },
          ],
        };
        console.log(this.dataPoints);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  // chartOptions = {
  //   animationEnabled: true,
  //   title: {
  //     text: 'Project Cost Breakdown',
  //   },
  //   data: [
  //     {
  //       type: 'doughnut',
  //       yValueFormatString: "#,###.##'%'",
  //       indexLabel: '{name}',
  //       dataPoints: this.dataPoints,
  //     },
  //   ],
  // };


  counterwiseAnalysis(){
    this.router.navigate(['/manager-dashboard/manager-counter-analysis'])
  }
}
