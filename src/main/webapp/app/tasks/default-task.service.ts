import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {BASE_URL} from '../app.tokens';
import {Task} from './task';
import {TaskService} from './task.service';

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

  update(id: string, payload: Task): Observable<Task> {
    return this.http.put<Task>(this.baseUrl + '/tasks/' + id, payload);
  }

  deleteTasks(tasksId: string[]): Observable<void> {
    return this.http.post<void>(this.baseUrl + '/tasks/deleteBulk', tasksId);
  }
}
