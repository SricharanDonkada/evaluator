import { TestBed } from '@angular/core/testing';

import { FetchCodejamQuestionsService } from './fetch-codejam-questions.service';

describe('FetchCodejamQuestionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchCodejamQuestionsService = TestBed.get(FetchCodejamQuestionsService);
    expect(service).toBeTruthy();
  });
});
