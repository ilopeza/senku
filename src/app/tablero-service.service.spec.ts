import { TestBed, inject } from '@angular/core/testing';

import { TableroServiceService } from './tablero-service.service';

describe('TableroServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableroServiceService]
    });
  });

  it('should be created', inject([TableroServiceService], (service: TableroServiceService) => {
    expect(service).toBeTruthy();
  }));
});
