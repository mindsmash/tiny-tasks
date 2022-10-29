import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '../app.tokens';
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
    const filter: Record<string, any> = { prop1: 'value1', prop2: 'value2' };

    // when
    taskService.getFiltered(filter, mockData.sortDefault).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks?prop1=value1&prop2=value2');
    expect(req.request.method).toEqual('GET');

    // finally
    req.flush({});
  });

  it('should get all filtered tasks sorted', () => {
    //given
    const filter: Record<string, any> = { prop1: 'value1', prop2: 'value2' };
    const sort: ISort = { sortBy: { value: TaskSortType.DUE_DATE, label: '' }, sortDir: SortDirection.DESC }

    // when
    taskService.getFiltered(filter, sort).subscribe();

    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks?prop1=value1&prop2=value2&sortBy=DUE_DATE&sortDir=desc');
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should get all tasks', () => {
    taskService.getFiltered(null, null).subscribe();
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
