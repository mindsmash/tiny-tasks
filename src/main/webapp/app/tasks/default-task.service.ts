import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {
  private searchTerm = new Subject <string>();

  searchTerm$ = this.searchTerm.asObservable();

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

  sendSearchTerm(search: string) {
    this.searchTerm.next(search);
  }

}
