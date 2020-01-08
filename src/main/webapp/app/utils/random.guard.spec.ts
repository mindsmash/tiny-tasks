import { TestBed, async, inject } from '@angular/core/testing';

import { RandomGuard } from './random.guard';

describe('RandomGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RandomGuard]
    });
  });

  it('should ...', inject([RandomGuard], (guard: RandomGuard) => {
    expect(guard).toBeTruthy();
  }));
});
