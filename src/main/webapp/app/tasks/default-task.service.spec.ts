import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from 'app/app.tokens';

import { DefaultTaskService } from './default-task.service';

describe('DefaultTaskService', () => {
  let httpTestingController: HttpTestingController;
  let taskService: DefaultTaskService;
  const task = {id: 'id', name: 'name', files: []};
  const fileAttachment = {id: 'id', name: 'name', type: 'type'};

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

  it('should get file', () => {
    // when
    taskService.getFile(task.id, fileAttachment.id).subscribe();

    // then
    const url = 'http://backend.tld/tasks/' + task.id + '/files/' + fileAttachment.id;
    const req = httpTestingController.expectOne(request => request.url === url);
    expect(req.request.method).toEqual('GET');

    // finally
    req.flush(new Blob());
  });

  it('should attach file', () => {
    // when
    const file = new File([''], 'filename', { type: 'text/html' });
    taskService.attachFile(task.id, file).subscribe();

    // then
    const req = httpTestingController.expectOne(request => request.url === 'http://backend.tld/tasks/' + task.id + '/files');
    expect(req.request.method).toEqual('POST');

    // finally
    req.flush({});

  });
  it('should delete file', () => {
    // when
    taskService.deleteFile(task.id, fileAttachment.id).subscribe();

    // then
    const url = 'http://backend.tld/tasks/' + task.id + '/files/' + fileAttachment.id;
    const req = httpTestingController.expectOne(request => request.url === url);
    expect(req.request.method).toEqual('DELETE');

    // finally
    req.flush({});
  });
});
