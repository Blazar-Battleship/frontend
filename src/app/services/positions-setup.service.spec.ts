import { TestBed } from '@angular/core/testing';

import { PositionsSetupService } from './positions-setup.service';

describe('PositionsSetupService', () => {
  let service: PositionsSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PositionsSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
