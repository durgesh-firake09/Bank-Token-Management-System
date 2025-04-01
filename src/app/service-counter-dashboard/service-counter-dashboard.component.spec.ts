import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCounterDashboardComponent } from './service-counter-dashboard.component';

describe('ServiceCounterDashboardComponent', () => {
  let component: ServiceCounterDashboardComponent;
  let fixture: ComponentFixture<ServiceCounterDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceCounterDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCounterDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
