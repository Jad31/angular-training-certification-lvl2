import { TestBed } from '@angular/core/testing';

import { FreeNbaApiService } from './free-nba-api.service';

describe('FreeNbaApiService', () => {
  let service: FreeNbaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeNbaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
