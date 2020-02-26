import { TestBed } from '@angular/core/testing';

import { TestCodeService } from './test-code.service';

describe('TestCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestCodeService = TestBed.get(TestCodeService);
    expect(service).toBeTruthy();
  });
});
