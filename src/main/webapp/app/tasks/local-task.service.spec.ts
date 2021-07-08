import {TestBed} from '@angular/core/testing';
import {LocalTaskService} from 'app/tasks/local-task.service';
import {EMPTY, Observable} from 'rxjs';
import {Task, TaskStatus} from './task';

describe('LocalTaskService', () => {
  let taskService: LocalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.inject(LocalTaskService);
  });

  describe('single task in store', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
      spyOn(localStorage, 'setItem').and.callFake(() => { });
    });

    const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
    const name = 'Doing the do!';
    const status = String(TaskStatus.Todo);
    const mockTask = `{"id":"${id}","name":"${name}","status":"${status}"}`;
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

    it('should set new status for task', () => {
      // when
      taskService.setStatus(id, TaskStatus.Done);

      // then
      expect(localStorage.setItem).toHaveBeenCalledWith('tiny.tasks', JSON.stringify([
        {id, name, status: TaskStatus.Done}
      ]));
    });

    it('should return updated task', () => {
      // when
      const result = taskService.setStatus(id, TaskStatus.Done);

      // then
      const subscription = result.subscribe(value => {
        expect(value).toEqual({id, name, status: TaskStatus.Done});
      });
      subscription.unsubscribe();
    });

    it('should return completed observable if no task was found to update', () => {
      // when
      const result = taskService.setStatus('id123', TaskStatus.Done);

      // then
      expect(result).toEqual(EMPTY);
    });
  });
  describe('multiple tasks', () => {
    beforeEach(() => {
      spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([
        { id: 'id007', name: 'bang', status: TaskStatus.Todo },
        { id: 'id123', name: 'say hello', status: TaskStatus.Todo },
        { id: 'id1234', name: 'say goodbye', status: TaskStatus.Cancelled },
        { id: 'id000', name: 'todo not todo', status: TaskStatus.Todo },
      ]));
      spyOn(localStorage, 'setItem').and.callFake(() => { });
    });

    it('should delete a list of tasks from local storage', () => {
      // when
      taskService.deleteAll(['id123', 'id1234']);

      // then
      expect(localStorage.setItem).toHaveBeenCalledWith('tiny.tasks', JSON.stringify([
        {id: 'id007', name: 'bang', status: TaskStatus.Todo},
        {id: 'id000', name: 'todo not todo', status: TaskStatus.Todo}
      ]));
    });
  });
});
