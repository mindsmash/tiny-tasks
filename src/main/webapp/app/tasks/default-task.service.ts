import { HttpClient, HttpEventType } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  addFile(id: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file);
    return this.http.post<any>(this.baseUrl + '/tasks/' + id + '/files', formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return {
            status: 'progress',
            message: progress
          };
        case HttpEventType.Response:
          return event.body;
        default:
          return 'Unhandled event: ' + event.type;
      }
    }));
  }
  deleteFile(id: string): Observable<Task> {
    return this.http.delete<Task>(this.baseUrl + '/tasks/' + id + '/files');
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
