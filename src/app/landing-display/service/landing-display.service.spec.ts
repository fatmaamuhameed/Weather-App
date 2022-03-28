import { TestBed } from '@angular/core/testing';

import { LandingDisplayService } from './landing-display.service';

describe('LandingDisplayService', () => {
  let service: LandingDisplayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LandingDisplayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
