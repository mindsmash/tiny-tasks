import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

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

  patch(id: string, data: object): Observable<void> {
    return this.http.patch<void>(this.baseUrl + '/tasks/' + id, data);
  }

  deleteMultiple(tasks: Task[]): Observable<void> {
    return this.http.request<void>('delete', this.baseUrl + '/tasks', {body: tasks});
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
