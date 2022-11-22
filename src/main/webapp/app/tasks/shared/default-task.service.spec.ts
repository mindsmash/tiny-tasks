import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {first} from 'rxjs/operators';
import {of} from 'rxjs';

import {DefaultTaskService} from './default-task.service';
import {BASE_URL} from '../../app.tokens';
import {Task} from './task';


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


  it('should return filtered tasks on getTasksByName', () => {
    spyOn(taskService, 'getAll').and.returnValue(of([{name: 'new task'}, {name: 'urgent task'}] as Task[]));
    taskService.getTasksByName('urgent').pipe(first()).subscribe(tasks => {
      expect(tasks.length).toBe(1);
    })
  });
});
