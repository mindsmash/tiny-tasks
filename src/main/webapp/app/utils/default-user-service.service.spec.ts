import { TestBed } from '@angular/core/testing';

import { DefaultUserServiceService } from './default-user-service.service';

describe('DefaultUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultUserServiceService = TestBed.get(DefaultUserServiceService);
    expect(service).toBeTruthy();
  });
});
