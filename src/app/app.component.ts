import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'bank-token-management-system';
  showNavbar = true; // Initially true

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       // Hide navbar if on homepage ("/" route)
  //       this.showNavbar = event.url !== '/';
  //     }
  //   });
  // }

  ngOnInit(): void {
    if (window.location.href.includes('home-page')) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
  isHomePage(): boolean {
    return window.location.href.includes('home-page');
  }
  // ngOnInit(): void {
  ngDoCheck(): void {
    if (window.location.href.includes('home-page')) {
      this.showNavbar = false;
    } else {
      this.showNavbar = true;
    }
  }
}
