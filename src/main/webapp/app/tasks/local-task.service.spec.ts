import { TestBed } from '@angular/core/testing';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Observable } from 'rxjs';
import { Task } from './task';

describe('LocalTaskService', () => {
  const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name = 'Doing the do!';
  const completed = false;
  const mockTask = `{"id":"${id}","name":"${name}", "completed":${completed}}`;

  let taskService: LocalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.inject(LocalTaskService);
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should return tasks from local storage', () => {
    // when
    const taskList$: Observable<Task[]> = taskService.getAll();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(1);
      expect(taskList[0].name).toEqual(name);
      expect(taskList[0].completed).toEqual(completed);
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

  it('should update the completed status of a task in local storage', () => {
    // when
    taskService.togglecomplete(id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete all completed tasks from local storage', () => {
    // when
    taskService.clearcomplete();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
