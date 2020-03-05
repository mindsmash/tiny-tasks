import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  // TODO: Implement backend
  getTasksNotDone(): Observable<Task[]> {
    console.log('getTasksNotDone - Missing backend implementation');
    return of(null);
  }

  // TODO: Implement backend
  getTasksDone(): Observable<Task[]> {
    console.log('getTasksDone - Missing backend implementation');
    return of(null);
  }

  // TODO: Add done property on backend with false as default value
  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  // TODO: Implement backend
  update(): Observable<void> {
    console.log('update - Missing backend implementation');
    return of(null);
  }
}
