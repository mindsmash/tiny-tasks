import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name, category : {id: "Doing"}} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  changeCategory(taskId: string, categoryId: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks/changeCategory/' + taskId, {id: categoryId});
  }

  deleteAllTasksByCategory(categoryId: String): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/deleteTask/' + categoryId);
  }

  getTasksByCategory(categoryId: String) : Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
