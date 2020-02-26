import { TestBed } from '@angular/core/testing';

import { SaveNewQuestionService } from './save-new-question.service';

describe('SaveNewQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveNewQuestionService = TestBed.get(SaveNewQuestionService);
    expect(service).toBeTruthy();
  });
});
