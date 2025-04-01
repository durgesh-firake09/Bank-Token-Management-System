import { Routes } from '@angular/router';
import { CustomerLandingComponent } from './customer-landing/customer-landing.component';
import { AccountHolderServicesComponent } from './account-holder-services/account-holder-services.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AccountHolderComponent } from './account-holder/account-holder.component';
import { GuestComponent } from './guest/guest.component';
import { GuestServicesComponent } from './guest-services/guest-services.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { TokenServeComponent } from './token-serve/token-serve.component';
import { DisplayTokenComponent } from './display-token/display-token.component';
import { DisplayTokenNumberComponent } from './display-token-number/display-token-number.component';
import { ManagerAddServiceComponent } from './manager-add-service/manager-add-service.component';
import { ServiceCounterDashboardComponent } from './service-counter-dashboard/service-counter-dashboard.component';
import { ManagerAssignCounterComponent } from './manager-assign-counter/manager-assign-counter.component';
import { ManagerDaySummaryComponent } from './manager-day-summary/manager-day-summary.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagerDayAnalysisComponent } from './manager-day-analysis/manager-day-analysis.component';
import { ManagerAnalysisCounterwiseComponent } from './manager-analysis-counterwise/manager-analysis-counterwise.component';

export const routes: Routes = [
  { path: 'customer', component: CustomerLandingComponent },
  { path: 'account-holder', component: AccountHolderComponent },
  { path: 'account-holder-service', component: AccountHolderServicesComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'guest', component: GuestComponent },
  { path: 'guest-service', component: GuestServicesComponent },
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'manager-add-service', component: ManagerAddServiceComponent },
      { path: 'manager-day-summary', component: ManagerDaySummaryComponent },
      {
        path: 'manager-assign-counter',
        component: ManagerAssignCounterComponent,
      },
      {
        path: 'manager-token-statistics',
        component: ManagerDayAnalysisComponent,
      },
      {
        path: 'manager-counter-analysis',
        component: ManagerAnalysisCounterwiseComponent,
      },
    ],
  },
  { path: 'token-serve', component: TokenServeComponent },
  { path: 'displayToken', component: DisplayTokenComponent },
  { path: 'display-token-number', component: DisplayTokenNumberComponent },

  {
    path: 'service-counter-dashboard',
    component: ServiceCounterDashboardComponent,
  },
  { path: '', component: HomePageComponent },
];
