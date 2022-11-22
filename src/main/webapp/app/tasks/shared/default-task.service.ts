import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BASE_URL} from '../../app.tokens';
import {Task} from './task';
import {TaskService} from './task.service';
import {map} from 'rxjs/operators';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name} as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  public getTasksByName(name: string): Observable<Task[]> {
    return this.getAll().pipe(
      map(tasks => tasks.filter(task => task.name.includes(name)))
    );
  }
}
