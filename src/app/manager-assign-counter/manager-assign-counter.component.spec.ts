import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAssignCounterComponent } from './manager-assign-counter.component';

describe('ManagerAssignCounterComponent', () => {
  let component: ManagerAssignCounterComponent;
  let fixture: ComponentFixture<ManagerAssignCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerAssignCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerAssignCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
