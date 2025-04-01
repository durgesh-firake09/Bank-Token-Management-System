import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDaySummaryComponent } from './manager-day-summary.component';

describe('ManagerDaySummaryComponent', () => {
  let component: ManagerDaySummaryComponent;
  let fixture: ComponentFixture<ManagerDaySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDaySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
