import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAnalysisCounterwiseComponent } from './manager-analysis-counterwise.component';

describe('ManagerAnalysisCounterwiseComponent', () => {
  let component: ManagerAnalysisCounterwiseComponent;
  let fixture: ComponentFixture<ManagerAnalysisCounterwiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAnalysisCounterwiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAnalysisCounterwiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
