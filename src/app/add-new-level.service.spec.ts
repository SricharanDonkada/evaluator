import { TestBed } from '@angular/core/testing';

import { AddNewLevelService } from './add-new-level.service';

describe('AddNewLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddNewLevelService = TestBed.get(AddNewLevelService);
    expect(service).toBeTruthy();
  });
});
