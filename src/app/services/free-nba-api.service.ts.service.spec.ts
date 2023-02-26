import { TestBed } from '@angular/core/testing';

import { FreeNbaApiServiceTsService } from './free-nba-api.service.ts.service';

describe('FreeNbaApiServiceTsService', () => {
  let service: FreeNbaApiServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreeNbaApiServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
