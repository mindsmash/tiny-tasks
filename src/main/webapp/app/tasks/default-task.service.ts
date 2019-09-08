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

  create(name: string, status: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name, status: status} as Task);
  }

  update(id: string, name: string, status: string): Observable<Task> {
    console.log('heree');
    // return this.http.put<Task>(this.baseUrl + '/tasks', {id: id, name: name, status: status} as Task);
    return this.http.put<Task>(this.baseUrl + '/tasks' + `/${id}` + `?taskupdateRequest=${status}`, null);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
