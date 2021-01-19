import { TestBed } from '@angular/core/testing';

import { GuardInverseService } from './guard-inverse.service';

describe('GuardInverseService', () => {
  let service: GuardInverseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardInverseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
