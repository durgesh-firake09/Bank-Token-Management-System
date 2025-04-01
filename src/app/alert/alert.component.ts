import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  @Input() message: string = 'This is an alert!';
  @Input() duration: number = 5000;
  @Input() type: string = 'error';
  showAlert: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.showAlert = false;
    }, this.duration);
  }
}
