import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {BASE_URL} from 'app/app.tokens';

import {DefaultTaskService} from './default-task.service';
import {Task} from "app/tasks/task";

describe('DefaultTaskService', () => {
  let httpTestingController: HttpTestingController;
  let taskService: DefaultTaskService;

  beforeEach(() => {
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

  it('should delete task', () => {
    // when
    taskService.delete('id123').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/id123');
    expect(req.request.method).toEqual('DELETE');

    // finally
    req.flush({});
  });

  it('should update task', () => {
    const task: Task = {id: 'de4f576e-d1b5-488a-8c77-63d4c8726911', name: 'My task', done: true};

    // when
    taskService.update(task.id, task).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/' + task.id);
    expect(req.request.method).toEqual('PUT');

    // finally
    req.flush({});
  });

  it('should delete tasks', () => {
    const task: Task = {id: 'de4f576e-d1b5-488a-8c77-63d4c8726911', name: 'My task', done: true};
    const task2: Task = {id: 'de4f576e-d1b5-488a-8c77-63d4c8726912', name: 'My task 2', done: true};

    // when
    taskService.deleteTasks([task.id, task2.id]).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/deleteBulk');
    expect(req.request.method).toEqual('POST');

    // finally
    req.flush({});
  });
});
