import { TestBed } from '@angular/core/testing';

import { FetchQuestionDataService } from './fetch-question-data.service';

describe('FetchQuestionDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchQuestionDataService = TestBed.get(FetchQuestionDataService);
    expect(service).toBeTruthy();
  });
});
