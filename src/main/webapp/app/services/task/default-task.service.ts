import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BASE_URL } from '../../app.tokens';
import { Task } from '../../interfaces/task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  public reloadTasks$: Subject<void> = new Subject<void>();

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, creator: string): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, {name, creator} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${id}`);
  }

  getAll(creator: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/${creator}`);
  }
}
