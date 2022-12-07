import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';
import {map} from "rxjs/operators";

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, duedate: Date): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', { name, duedate } as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks').pipe(map(response => {
      return response.sort(function compare(a, b) {
        // @ts-ignore
        const dateA: any = new Date(a.duedate);
        // @ts-ignore
        const dateB: any = new Date(b.duedate);

        // @ts-ignore
        if (a.duedate === '') {
          return 1;
        }
        // @ts-ignore
        if (b.duedate === '') {
          return -1;
        }
        return dateA - dateB;
      });
    }))
  }
}
