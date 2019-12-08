import {TestBed} from '@angular/core/testing';
import {LocalTaskService} from 'app/tasks/local-task.service';
import {Observable} from 'rxjs';
import {Task} from './task';

describe('LocalTaskService', () => {
  const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name = 'Doing the do!';

  const id2 = 'de4f576e-d1b5-488a-8c77-63d4c000000';
  const name2 = 'Doing the do!';

  const mockTask = `{"id":"${id}","name":"${name}", "done": true}`;
  const mockTask2 = `{"id":"${id2}","name":"${name2}", "done": false}`;

  let taskService: LocalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.get(LocalTaskService);
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}, ${mockTask2}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {
    });
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should return tasks from local storage and sort by done field (not done first)', () => {
    // when
    const taskList$: Observable<Task[]> = taskService.getAll();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();

    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(2);
      expect(taskList[0].name).toEqual(name2);

      expect(taskList[0].done).toEqual(false);
      expect(taskList[1].done).toEqual(true);
    });
  });

  it('should write task to local storage', () => {
    // when
    taskService.create('Drinking the drink!');

    // then
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete task from local storage', () => {
    // when
    taskService.delete(id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should mark task as done on local storage', () => {
    // when
    taskService.markAsDone(id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete all done tasks from local storage', () => {
    // when
    taskService.deleteAllDone();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
