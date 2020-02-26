import { TestBed } from '@angular/core/testing';

import { FetchQuestionIndexService } from './fetch-question-index.service';

describe('FetchQuestionIndexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchQuestionIndexService = TestBed.get(FetchQuestionIndexService);
    expect(service).toBeTruthy();
  });
});
