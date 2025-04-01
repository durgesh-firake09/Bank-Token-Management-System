import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTokenComponent } from './display-token.component';

describe('DiaplayTokenComponent', () => {
  let component: DisplayTokenComponent;
  let fixture: ComponentFixture<DisplayTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTokenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
