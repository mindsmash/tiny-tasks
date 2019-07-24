import { TestBed } from '@angular/core/testing';

import { HttpTokenInterceptorService } from './http-token-interceptor.service';

describe('HttpTokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpTokenInterceptorService = TestBed.get(HttpTokenInterceptorService);
    expect(service).toBeTruthy();
  });
});
