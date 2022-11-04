import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '../app.tokens';
import { IFilterData } from '../shared/components/filter/utilities/filter.model';
import { ISort, SortDirection, TaskSortType } from '../shared/models/sort.model';
import { DefaultTaskService } from './default-task.service';
import { Task } from './task';

describe('DefaultTaskService', () => {
  let httpTestingController: HttpTestingController;
  let taskService: DefaultTaskService;
  let mockData: {
    sortDefault: ISort,
    task: Task,
  };

  beforeEach(() => {
    mockData = {
      sortDefault: { sortBy: { value: TaskSortType.NONE, label: 'None' }, sortDir: SortDirection.ASC },
      task: { id: 'id123', name: 'Doing1 the do1!' },
    };
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{
        provide: BASE_URL, useValue: 'http://backend.tld'
      }, DefaultTaskService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    taskService = TestBed.inject(DefaultTaskService);
  });

  afterAll(() => httpTestingController.verify());

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('should post task', () => {
    // when
    taskService.create('Drinking the drink!').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks');
    expect(req.request.method).toEqual('POST');

    // finally
    req.flush({});
  });

  it('should get all tasks', () => {
    // when
    taskService.getAll().subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks');
    expect(req.request.method).toEqual('GET');

    // finally
    req.flush({});
  });

  it('should get all filtered tasks', () => {
    //given
    const filter: IFilterData = { taskName: 'val' };

    // when
    taskService.getFiltered(filter, { sortBy: { label: 'label', value: TaskSortType.DUE_DATE }, sortDir: SortDirection.ASC }).subscribe();

    // then
    const req = httpTestingController.expectOne(request => (request.url === 'http://backend.tld/tasks'));
    expect(req.request.method).toEqual('GET');

    // finally
    req.flush({});
  });

  it('should get all filtered tasks with params setted', () => {
    //given
    const filter: IFilterData = { taskName: 'val' };
    const sort: ISort = { sortBy: { label: 'label', value: TaskSortType.DUE_DATE }, sortDir: SortDirection.ASC };

    // when
    taskService.getFiltered(filter, sort).subscribe();

    const req = httpTestingController.expectOne(request => request.params.keys().length === 3);

    req.flush({});
  });

  it('should get all tasks', () => {
    taskService.getFiltered(undefined, undefined).subscribe();
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks');
    expect(req.request.method).toEqual('GET');
    req.flush({});
  });

  it('should delete task', () => {
    // when
    taskService.delete('id123').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/id123');
    expect(req.request.method).toEqual('DELETE');

    // finally
    req.flush({});
  });

  it('should save task', () => {
    // when
    taskService.saveTaskData(mockData.task).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/task/id123');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockData.task);

    // finally
    req.flush({});
  });
});
