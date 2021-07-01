import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from 'app/app.tokens';

import { DefaultTaskService } from './default-task.service';
import {TaskStatus} from "app/tasks/task";

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

  it('should delete a list of tasks', () => {
    // when
    taskService.deleteAll(['1', '2', '3']).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.urlWithParams === 'http://backend.tld/tasks?id=1&id=2&id=3');
    expect(req.request.method).toEqual('DELETE');

    // finally
    req.flush({});
  });

  it('should set new status for task', () => {
    // when
    taskService.setStatus('id123', TaskStatus.Done).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/id123/status');
    expect(req.request.method).toEqual('PUT');

    // finally
    req.flush({});
  });
});
