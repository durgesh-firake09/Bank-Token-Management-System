import { Component, OnInit } from '@angular/core';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { ManagerDashboardComponent } from '../manager-dashboard/manager-dashboard.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { AdminapiServiceService } from '../services/adminapi-service.service';

@Component({
  selector: 'app-manager-analysis-counterwise',
  imports: [ManagerDashboardComponent, CanvasJSAngularChartsModule],
  templateUrl: './manager-analysis-counterwise.component.html',
  styleUrl: './manager-analysis-counterwise.component.css'
})
export class ManagerAnalysisCounterwiseComponent implements OnInit{
  chartOptions: any = {};
  dataPoints: any = [];

  constructor(private customerApiService: CustomerapiServiceService,private adminService:AdminapiServiceService) {}

  ngOnInit(): void {
    this.getCounterAnalysis();
  }

  getCounterAnalysis() {
    this.adminService.getCounterWiseAnalysis().subscribe({
      next: (response: any) => {
        console.log(response);
        
        for (let i = 0; i < response.length; i++) {
          this.dataPoints.push({
            y: response[i].totalTokens, // Display total tokens per counter
            name: `Counter ${response[i].counterId}`, // Counter ID as label
          });
        }

        this.chartOptions = {
          animationEnabled: true,
          title: {
            text: 'Counter-wise Token Distribution',
          },
          data: [
            {
              type: 'pie',
              yValueFormatString: "#,###",
              indexLabel: '{name}',
              dataPoints: this.dataPoints,
            },
          ],
        };
        console.log(this.dataPoints);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}


