import {TestBed} from '@angular/core/testing';
import {LocalTaskService} from 'app/tasks/local-task.service';

describe('LocalTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [LocalTaskService]
  }));

  it('should be created', () => {
    const service: LocalTaskService = TestBed.get(LocalTaskService);
    expect(service).toBeTruthy();
  });
});
