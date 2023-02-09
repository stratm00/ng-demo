import { TestBed } from '@angular/core/testing';

import { MockPersonBackendService } from './mock-person-backend.service';

describe('MockPersonBackendService', () => {
  let service: MockPersonBackendService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockPersonBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
