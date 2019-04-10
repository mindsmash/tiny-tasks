import {Inject, Injectable} from '@angular/core';
import {TaskService} from 'app/tasks/task.service';
import {Observable} from 'rxjs';
import {Task} from './task';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from 'app/app.tokens';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }
}
