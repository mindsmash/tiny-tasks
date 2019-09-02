import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import { User } from '../user/user';
import { AppComponent } from '../app.component';

@Injectable()
export class DefaultTaskService implements TaskService {
  user: User;

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    console.log("task create", name)
    let task:Task = new Task() ;
    task.name = name;
    task.user = new User();
    console.log("user task", task)
    task.user = this.user; 
    return this.http.post<Task>(this.baseUrl + '/tasks', task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
