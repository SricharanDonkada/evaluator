import { TestBed } from '@angular/core/testing';

import { FetchQuestionDataForEditService } from './fetch-question-data-for-edit.service';

describe('FetchQuestionDataForEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchQuestionDataForEditService = TestBed.get(FetchQuestionDataForEditService);
    expect(service).toBeTruthy();
  });
});
