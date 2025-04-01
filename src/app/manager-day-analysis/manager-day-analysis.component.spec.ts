import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDayAnalysisComponent } from './manager-day-analysis.component';

describe('ManagerDayAnalysisComponent', () => {
  let component: ManagerDayAnalysisComponent;
  let fixture: ComponentFixture<ManagerDayAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerDayAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerDayAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
