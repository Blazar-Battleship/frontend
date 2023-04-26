import { TestBed } from '@angular/core/testing';

import { QuitService } from './quit.service';

describe('QuitService', () => {
  let service: QuitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
