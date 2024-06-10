import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import { HttpClientUtil } from '../utils/HttpClientUtil';

@Injectable()
export class DefaultTaskService implements TaskService {
  constructor(private client: HttpClientUtil) {}

  create(name: string): Observable<Task> {
    return this.client.authClient().post<Task>('/tasks', { name } as Task);
  }

  delete(id: string): Observable<void> {
    return this.client.authClient().delete<void>('/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.client.authClient().get<Task[]>('/tasks');
  }
}
