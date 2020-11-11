import { TestBed } from '@angular/core/testing';

import { GaurdMService } from './gaurd-m.service';

describe('GaurdMService', () => {
  let service: GaurdMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaurdMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
