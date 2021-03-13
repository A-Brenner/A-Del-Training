import { TestBed } from '@angular/core/testing';

import { IndustriesToSectionsService } from './industries-to-sections.service';

describe('IndustriesToSectionsService', () => {
  let service: IndustriesToSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustriesToSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
