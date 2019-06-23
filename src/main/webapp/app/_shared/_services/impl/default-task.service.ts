import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from 'app/app.tokens';
import { Task } from '../../_entities/task';
import { TaskService } from '../task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    const task = new Task(name, 'TO DO', localStorage.getItem('token'));
    return this.http.post<Task>(this.baseUrl + '/tasks', task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  update(task: Task): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/tasks', task);
  }
}
