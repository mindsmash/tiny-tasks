import { TestBed } from '@angular/core/testing';
import { LocalTaskService } from './local-task.service';
import { Observable } from 'rxjs';
import { Task } from './task';
import { ISort, SortDirection, TaskSortType } from '../shared/models/sort.model';

describe('LocalTaskService', () => {
  let mockData: {
    tasks: Task[],
    sortDefault: ISort,
  };

  let taskService: LocalTaskService;
  let localStorageGetSpy: jasmine.Spy;
  let localStorageSetSpy: jasmine.Spy;

  beforeEach(() => {
    mockData = {
      tasks: [
        { id: 'de4f576e-d1b5-488a-8c77-63d4c8726901', name: 'Doing1 the do1!' },
        { id: 'de4f576e-d1b5-488a-8c77-63d4c8726902', name: 'Doing2 the do2!', dueDate: '2022-10-10T21:00:00.000Z' },
        { id: 'de4f576e-d1b5-488a-8c77-63d4c8726903', name: 'Doing3 the do3!' },
        { id: 'de4f576e-d1b5-488a-8c77-63d4c8726904', name: 'Doing4 the do4!', dueDate: '2022-10-12T21:00:00.000Z' },
      ],
      sortDefault: { sortBy: { value: '', label: 'None' }, sortDir: SortDirection.ASC },
    };

    TestBed.configureTestingModule({
      providers: [LocalTaskService]
    });

    taskService = TestBed.inject(LocalTaskService);
    localStorageGetSpy = spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify(mockData.tasks));
    localStorageSetSpy = spyOn(localStorage, 'setItem').and.callFake(() => { });
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
      expect(taskList.length).toBe(4);
      expect(taskList).toEqual(mockData.tasks);
    });
  });

  describe('on getFiltered', () => {
    it('should return empty array if taskName not found', () => {
      const taskList$: Observable<Task[]> = taskService.getFiltered({ taskName: 'taskValue' }, null);
      taskList$.subscribe((taskList) => { expect(taskList).toEqual([]); });
    });

    it('should return array with founded taskNames', () => {
      const taskList$: Observable<Task[]> = taskService.getFiltered({ taskName: 'Doing1' }, null);
      taskList$.subscribe((taskList) => { expect(taskList.length).toEqual(1); });
    });

    it('should return entire array if filter empty', () => {
      const taskList$: Observable<Task[]> = taskService.getFiltered({}, null);
      taskList$.subscribe((taskList) => { expect(taskList.length).toEqual(4); });
    });

    it('should return entire array if filter not setted', () => {
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, null);
      taskList$.subscribe((taskList) => { expect(taskList.length).toEqual(4); });
    });

    it('should return ASC sorted array by due date', () => {
      const sort: ISort = { sortBy: { value: TaskSortType.DUE_DATE, label: '' }, sortDir: SortDirection.ASC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => {
        expect(taskList).toEqual([
          mockData.tasks[0], mockData.tasks[2], mockData.tasks[1], mockData.tasks[3]
        ]);
      });
    });

    it('should return DESC sorted array by due date', () => {
      const sort: ISort = { sortBy: { value: TaskSortType.DUE_DATE, label: '' }, sortDir: SortDirection.DESC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => {
        expect(taskList).toEqual([
          mockData.tasks[3], mockData.tasks[1], mockData.tasks[0], mockData.tasks[2]
        ]);
      });
    });

    it('should return ASC sorted array by name', () => {
      const sort: ISort = { sortBy: { value: TaskSortType.NAME, label: '' }, sortDir: SortDirection.ASC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => { expect(taskList).toEqual(mockData.tasks); });
    });

    it('should return DESC sorted array by name', () => {
      const sort: ISort = { sortBy: { value: TaskSortType.NAME, label: '' }, sortDir: SortDirection.DESC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => { expect(taskList).toEqual(mockData.tasks.reverse()); });
    });

    it('should return entire array if sort is set to NONE', () => {
      const sort: ISort = { sortBy: { value: TaskSortType.NONE, label: '' }, sortDir: SortDirection.DESC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => { expect(taskList).toEqual(mockData.tasks); });
    });

    it('should return entire array if sort is set to null', () => {
      const sort: ISort = { sortBy: { value: null, label: '' }, sortDir: SortDirection.DESC };
      const taskList$: Observable<Task[]> = taskService.getFiltered(null, sort);
      taskList$.subscribe((taskList) => { expect(taskList).toEqual(mockData.tasks); });
    });
  });

  it('should return tasks from an empty local storage', () => {
    // given
    localStorageGetSpy.and.callFake(() => null);

    // when
    const taskList$: Observable<Task[]> = taskService.getAll();

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    taskList$.subscribe(taskList => {
      expect(taskList.length).toBe(0);
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
    taskService.delete(mockData.tasks[0].id);

    // then
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should handle unknown task on deletion', () => {
    // when
    taskService.delete('unknown');

    // then
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should save task to local storage on saveTaskData', () => {
    taskService.saveTaskData({ ...mockData.tasks[0], dueDate: '2022-10-9T21:00:00.000Z' });
    const expectedTasks: Task[] = JSON.parse(JSON.stringify(mockData.tasks));
    expectedTasks[0].dueDate = '2022-10-9T21:00:00.000Z';
    expect(localStorage.setItem).toHaveBeenCalledWith('tiny.tasks', JSON.stringify(expectedTasks));
  });

  it('should save task to local storage on saveTaskData', () => {
    taskService.saveTaskData({ ...mockData.tasks[0], dueDate: '2022-10-9T21:00:00.000Z', id: 'not fond' });
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
});
