import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import {FileAttachement} from 'app/tasks/fileAttachement';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getFile(taskId: string, fileId: string): Observable<Blob> {
    console.log('getFile(taskId={},fileId={})', taskId, fileId);
    const url = this.baseUrl + '/tasks/' + taskId + '/files/' + fileId;
    console.log('url:', url);
    return this.http.get(url, {responseType : 'blob'});
  }

  attachFile(taskId: string, formData: FormData): Observable<FileAttachement> {
    console.log('For task', taskId, ' uploading ', formData);
    return this.http.post<FileAttachement>(this.baseUrl + '/tasks/' + taskId + '/files', formData);
  }

  deleteFile(taskId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + taskId + '/files/' + fileId);
  }
}
