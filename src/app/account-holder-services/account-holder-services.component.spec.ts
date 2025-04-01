import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHolderServicesComponent } from './account-holder-services.component';

describe('AccountHolderServicesComponent', () => {
  let component: AccountHolderServicesComponent;
  let fixture: ComponentFixture<AccountHolderServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountHolderServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountHolderServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
