import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import {FileAttachment} from 'app/tasks/fileAttachment';

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
    const url = this.baseUrl + '/tasks/' + taskId + '/files/' + fileId;
    return this.http.get(url, {responseType : 'blob'});
  }

  attachFile(taskId: string, file: File): Observable<FileAttachment> {
    if (file) {
      const formData = new FormData();

      formData.append('file', file);
      return this.http.post<FileAttachment>(this.baseUrl + '/tasks/' + taskId + '/files', formData);
    } else {
      console.log('File attachment failed - no file');
    }
  }

  deleteFile(taskId: string, fileId: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + taskId + '/files/' + fileId);
  }
}
