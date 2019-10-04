import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, file: File): Observable<Task> {
    if (file !== undefined) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('task', new Blob([JSON.stringify({ name })],
        {
          type: 'application/json'
        }));
      return this.http.post<Task>(this.baseUrl + '/tasks/imageAttached', formData);
    } else {
      return this.http.post<Task>(this.baseUrl + '/tasks', { name: name } as Task);
    }
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  downloadImage(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.baseUrl + '/tasks/file/' + id, {
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
