import { Component, OnInit } from '@angular/core';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { AdminapiServiceService } from '../services/adminapi-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-service-counter-dashboard',
  imports: [CommonModule],
  templateUrl: './service-counter-dashboard.component.html',
  styleUrl: './service-counter-dashboard.component.css',
})
export class ServiceCounterDashboardComponent implements OnInit {
  pendingTokenQueue: any;
  constructor(private adminService: AdminapiServiceService) {}
  currentToken: any;
  timeLeft: any;
  //timer logic
  timerId: any;

  startTimer() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    // if(this.pendingTokenQueue.length === 0){
    //   return;
    // }
    this.timeLeft = 120;

    const countdown = () => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.timerId = setTimeout(countdown, 1000); // Store reference for future clearing
      } else {
        this.timerId = null; // Reset when timer completes
        this.nextHandler();
      }
    };

    countdown(); // Start the countdown
  }

  getTokenQueue() {
    this.adminService.getTokenQueue().subscribe((data) => {
      console.log(data);
      this.pendingTokenQueue = data;
      if (this.pendingTokenQueue.length > 0) {
        this.currentToken = this.pendingTokenQueue[0];
      }
    });
  }
  ngOnInit(): void {
    this.getTokenQueue();
    this.startTimer();
  }

  servicedHandler() {
    this.pendingTokenQueue.shift();

    console.log(this.pendingTokenQueue);
    // change current token to serviced
    const data: any = {
      tokenNumber: this.currentToken.tokenNumber,
      tokenStatus: 'SERVICED',
    };
    this.adminService.changeTokenStatus(data).subscribe((data) => {
      console.log(data);
    });

    if (this.pendingTokenQueue.length > 0) {
      this.currentToken = this.pendingTokenQueue[0];
    } else {
      this.currentToken = null;
    }
    this.startTimer();
  }

  nextHandler() {
    this.pendingTokenQueue.shift();
    console.log(this.pendingTokenQueue);
    // change current token to no show the next token
    const data: any = {
      tokenNumber: this.currentToken.tokenNumber,
      tokenStatus: 'NO_SHOW',
    };
    this.adminService.changeTokenStatus(data).subscribe((data) => {
      console.log(data);
    });

    if (this.pendingTokenQueue.length > 0) {
      this.currentToken = this.pendingTokenQueue[0];
    } else {
      this.currentToken = null;
    }
    this.startTimer();
  }
}
