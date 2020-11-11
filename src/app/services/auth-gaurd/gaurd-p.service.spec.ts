import { TestBed } from '@angular/core/testing';

import { GaurdPService } from './gaurd-p.service';

describe('GaurdPService', () => {
  let service: GaurdPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaurdPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
