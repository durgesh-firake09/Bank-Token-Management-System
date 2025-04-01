import { Component, OnInit } from '@angular/core';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { AdminapiServiceService } from '../services/adminapi-service.service';
import { CommonModule } from '@angular/common';
import { count, time } from 'console';
import { jwtDecode } from 'jwt-decode';

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
  counterId: any;
  //timer logic
  timerId: any;
counterEmail: any;
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
        // this.nextHandler();
      }
    };

    countdown(); // Start the countdown
  }

  getTokenQueue() {
    this.adminService.getTokenQueue(this.counterId).subscribe((data) => {
      console.log(data);
      this.pendingTokenQueue = data;
      // if (this.pendingTokenQueue.length > 0) {
      //   this.currentToken = this.pendingTokenQueue[0];
      // }
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const email = jwtDecode(token).sub?.split(':')[0];
    this.counterEmail = email;
    this.adminService.getCounter(email).subscribe((data) => {
      console.log(data);
      this.counterId = data.id;

      this.getTokenQueue();
    });
  }

  callTokens() {
    this.getTokenQueue();
    if (this.pendingTokenQueue.length > 0) {
      this.currentToken = this.pendingTokenQueue[0];
    }
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
      this.startTimer();
    } else {
      this.currentToken = null;
      // stop timer
      clearTimeout(this.timerId);
      this.timerId = null;
      this.timeLeft = 0;
    }
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
      this.startTimer();
    } else {
      this.currentToken = null;
      // stop timer
      clearTimeout(this.timerId);
      this.timerId = null;
      this.timeLeft = 0;
    }
  }
}
