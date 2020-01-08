import { TestBed } from '@angular/core/testing';

import { LocalUserServiceService } from './local-user-service.service';

describe('LocalUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalUserServiceService = TestBed.get(LocalUserServiceService);
    expect(service).toBeTruthy();
  });
});
