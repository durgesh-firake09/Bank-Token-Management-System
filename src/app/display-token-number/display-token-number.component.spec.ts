import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTokenNumberComponent } from './display-token-number.component';

describe('DisplayTokenNumberComponent', () => {
  let component: DisplayTokenNumberComponent;
  let fixture: ComponentFixture<DisplayTokenNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayTokenNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayTokenNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
