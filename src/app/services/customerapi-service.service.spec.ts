import { TestBed } from '@angular/core/testing';

import { CustomerapiServiceService } from './customerapi-service.service';

describe('CustomerapiServiceService', () => {
  let service: CustomerapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
