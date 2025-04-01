import { TestBed } from '@angular/core/testing';

import { AdminapiServiceService } from './adminapi-service.service';

describe('AdminapiServiceService', () => {
  let service: AdminapiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminapiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
