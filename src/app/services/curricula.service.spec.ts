import { TestBed } from '@angular/core/testing';

import { CurriculaService } from './curricula.service';

describe('CurriculaService', () => {
  let service: CurriculaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
