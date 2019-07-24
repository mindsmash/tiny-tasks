import { TestBed } from '@angular/core/testing';

import { AppGlobalValuesService } from './app-global-values.service';

describe('AppGlobalValuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppGlobalValuesService = TestBed.get(AppGlobalValuesService);
    expect(service).toBeTruthy();
  });
});
