import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerapiServiceService } from '../services/customerapi-service.service';
import { AdminapiServiceService } from '../services/adminapi-service.service';
import { CommonModule } from '@angular/common';
import { count, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-display-token-number',
  imports: [CommonModule],
  templateUrl: './display-token-number.component.html',
  styleUrl: './display-token-number.component.css',
})
export class DisplayTokenNumberComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  counters:any=[];
  constructor(
    private customerService: CustomerapiServiceService,
    private adminService: AdminapiServiceService
  ) {
    // setTimeout(() => {
    //   this.getCounters();
    // }, 1000);
    this.counters$=this.adminService.getCountersShow(this.destroy$);
    this.counters$.subscribe((data) => {
      console.log(data);
      this.counters = data;
    })
  }

  ngOnInit(): void {
    this.getCounters();
  }
  tempTokenObj: any = {};
  getTokenList() {
    this.tokens = [];
    // this.tokensObject = {};
    if (this.counters.length == 0) {
      alert('No counters available');
      return;
    }
    this.tempTokenObj={}
    for (let i = 0; i < this.counters.length; i++) {
      this.getCurrentTokenNumber(this.counters[i].id);
    }
    this.tokensObject=this.tempTokenObj;
    this.tokenList = this.tokens;
  }
  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.getCounters();
    // }, 1000);
  }
  currentToken: any;
  counters$: Observable<any>;
  tokenList: any = [];
  tokens: any = [];
  tokensObject: any = {};
  getCurrentTokenNumber(counterNumber: any) {
    this.customerService

      .getCurrentTokenNumber(counterNumber)
      .subscribe((response) => {
        console.log(response);
        this.tokens.push(response);
        this.tempTokenObj[counterNumber] = response;
        console.log(this.tokensObject);
      });
  }

  getCounters() {
    // clear tokenlist
    this.adminService
      .getCountersShow(this.destroy$)
      .subscribe((response: any) => {
        console.log(response);
        this.counters$ = response;
        this.counters = response;
        this.getTokenList();
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
