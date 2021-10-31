import { TestBed } from '@angular/core/testing';

import { CurriculaTopicService } from './curricula-topic.service';

describe('CurriculaTopicService', () => {
  let service: CurriculaTopicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurriculaTopicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
