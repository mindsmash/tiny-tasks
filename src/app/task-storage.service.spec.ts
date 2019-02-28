import { TestBed } from '@angular/core/testing';

import { TaskStorageService } from './task-storage.service';

describe('TaskStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskStorageService = TestBed.get(TaskStorageService);
    expect(service).toBeTruthy();
  });
});
