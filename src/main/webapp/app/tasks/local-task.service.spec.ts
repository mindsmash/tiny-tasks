import { TestBed } from '@angular/core/testing';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Observable } from 'rxjs';
import { Task, Status } from './task';

describe('LocalTaskService', () => {
  const id = 'de4f576e-d1b5-488a-8c77-63d4c8726909';
  const name = 'Doing the do!';
  const mockTask = `{"id":"${id}","name":"${name}"}`;
  const STORAGE_KEY: string = 'tiny.tasks';

  let taskService: LocalTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.get(LocalTaskService);

  });

  it('should be created', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    expect(taskService).toBeTruthy();
  });

  it('should return tasks from local storage', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
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
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    // when
    taskService.create('Drinking the drink!');

    // then
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should delete task from local storage', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => `[${mockTask}]`);
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    // when
    taskService.delete(id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });  
  it('should mark task as done in local storage', () => {
    // when
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{id:'test1', name: 'task1', checked: false, status: Status.blocked}]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    taskService.markAsDone('test1');
    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{id:'test1', name: 'task1', checked: true, status: Status.blocked}]));

  });
  it('should delete all done tasks from the local storage', () => {
    // when
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{id:'test1', name: 'task1', checked: true, status: Status.blocked}]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    taskService.deleteAll();
    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([]));

  });
  it('should update the status of the task the local storage', () => {
    // when
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{id:'test1', name: 'task1', checked: true, status: Status.blocked}]));
    spyOn(localStorage, 'setItem').and.callFake(() => {});
    taskService.update({id:'test1', name: 'task1', checked: true, status: Status.inProgress});
    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{id:'test1', name: 'task1', checked: true, status: Status.inProgress}]));

  });
  it('should sort the tasks, done tasks to the bottom and the todo tasks on top of them', () => {
    // when
    const sortedTasks = taskService.sort([{id:'test1', name: 'task1', checked: true, status: Status.blocked},
    {id:'test2', name: 'task2', checked: false, status: Status.blocked}]);
    // then
    expect(sortedTasks).toEqual(([{id:'test2', name: 'task2', checked: false, status: Status.blocked}, {id:'test1', name: 'task1', checked: true, status: Status.blocked}]));
    expect(sortedTasks[0].name).toBe('task2');
    expect(sortedTasks[1].name).toBe('task1');
  });
});
