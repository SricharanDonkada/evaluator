import { TestBed } from '@angular/core/testing';

import { SaveEditedQuestionService } from './save-edited-question.service';

describe('SaveEditedQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveEditedQuestionService = TestBed.get(SaveEditedQuestionService);
    expect(service).toBeTruthy();
  });
});
