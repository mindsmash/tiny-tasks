import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from 'app/app.tokens';
import { AuthService } from '../auth/auth.service';

import { DefaultTaskService } from './default-task.service';

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
    taskService.create('Drinking the drink!', 'creatorId').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks');
    expect(req.request.method).toEqual('POST');

    // finally
    req.flush({});
  });

  it('should get all tasks', () => {
    // when
    taskService.getAll('creatorId').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/creatorId');
    expect(req.request.method).toEqual('GET');

    // finally
    req.flush({});
  });

  it('url should consist of 2 url path segments', () => {
    const url = 'http://backend.tld/tasks/creatorId';

    // when
    taskService.getAll('creatorId').subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === url);

    expect(url.match(/[a-z]\/[a-z]+?/g).length).toEqual(2);

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
});
