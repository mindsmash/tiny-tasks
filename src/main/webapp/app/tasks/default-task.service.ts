import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BASE_URL} from '../app.tokens';
import {Task} from './task';
import {TaskService} from './task.service';
import {UserService} from "app/utils/user.service";

@Injectable()
export class DefaultTaskService implements TaskService {
  private readonly headers: HttpHeaders;

  constructor(private http: HttpClient,
              @Inject(BASE_URL) private baseUrl: string,
              @Inject('UserService') private userService: UserService) {
    this.headers = new HttpHeaders({
      'Authorization': 'Bearer ' + userService.getToken()
    });
  }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', {name: name} as Task, {headers: this.headers});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id, {headers: this.headers});
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks', {headers: this.headers});
  }
}
