import { TestBed } from '@angular/core/testing';

import { JqxDomService } from './jqwidgets-dom.service';

describe('JqxDomService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JqxDomService = TestBed.get(JqxDomService);
    expect(service).toBeTruthy();
  });
});
