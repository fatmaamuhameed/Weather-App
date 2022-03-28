import { TestBed } from '@angular/core/testing';

import { WeatherDashboardService } from './weather-dashboard.service';

describe('WeatherDashboardService', () => {
  let service: WeatherDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
