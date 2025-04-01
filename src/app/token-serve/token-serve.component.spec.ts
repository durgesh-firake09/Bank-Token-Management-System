import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenServeComponent } from './token-serve.component';

describe('TokenServeComponent', () => {
  let component: TokenServeComponent;
  let fixture: ComponentFixture<TokenServeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenServeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TokenServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
