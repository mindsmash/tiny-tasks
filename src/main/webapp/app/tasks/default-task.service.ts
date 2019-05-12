import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, {name: name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }

  update(task: Task): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/tasks/${task.id}`, {name: task.name, due: task.due} as Task);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`).pipe(
      // parse the due date string into a Moment object
      map(tasks => {
        if (tasks instanceof Array) {
          return tasks.map(task => {
            if (task.due) {
              task.due = moment(task.due);
            }

            return task;
          });
        } else {
          return [];
        }
      })
    );
  }
}
