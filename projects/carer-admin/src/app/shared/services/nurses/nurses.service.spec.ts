import { TestBed } from '@angular/core/testing';

import { NursesService } from './nurses.service';

describe('NursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NursesService = TestBed.get(NursesService);
    expect(service).toBeTruthy();
  });
});
