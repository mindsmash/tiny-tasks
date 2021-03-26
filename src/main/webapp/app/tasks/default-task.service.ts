import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import { filterTasks, sortTasksByStatus } from './utils';

@Injectable()
export class DefaultTaskService implements TaskService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {}

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', { name } as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  update(task: Task): Observable<Task> {
    return this.http.patch<Task>(this.baseUrl + '/tasks', task);
  }

  getAll(searchText: string = ''): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks').pipe(
      map((tasks) => filterTasks(searchText, tasks)),
      map((tasks) => sortTasksByStatus(tasks))
    );
  }
}
