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

  create(task: any, login:string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks?login='+login, task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getTasksByUser(id ?:any):Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks/tasksbyuser/'+id);
  }

}
