import { TestBed } from '@angular/core/testing';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Observable } from 'rxjs';
import { Task } from './task';

describe('LocalTaskService', () => {
  const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name = 'Doing the do!';
  const isCompleted = false;
  const mockTask = `{"id":"${id}","name":"${name}", "isCompleted": "${isCompleted}"}`;

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

  it('should update the status of the task', () => {
    const data = {id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'Test Task', isCompleted: false};
    // when
    taskService.update(id, data);

    // then
    expect(data).toEqual({id: 'db1c4afe-d358-4b14-acfd-0953e882a6b6', name: 'Test Task', isCompleted: true});
  });

  it('should update the local storage with pending tasks', () => {
    // when
    taskService.clearCompletedTasks(mockTask);

    // then
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
