import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { LocalTaskService } from 'app/tasks/local-task.service';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    const userId = localStorage.getItem(LocalTaskService.USER_STORAGE_KEY);
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name, userId: userId} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
