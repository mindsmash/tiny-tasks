import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BASE_URL} from '../app.tokens';
import {Task} from './task';
import {TaskService} from './task.service';

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

  update(name: string, done: boolean, dueDate: string): Observable<Task> {
    // let task  = this.http.get<Task[]>(this.baseUrl + '/tasks'+Task.id)
    console.log( name, done, dueDate)
    return this.http.post<Task>(this.baseUrl+'/tasks/update', { name, done, dueDate} );
  }

  done(id: string, done: boolean): Observable<Task>{
    console.log('Updating Task with Id: ',id)
    return this.http.put<Task>(this.baseUrl+'/tasks/'+id,{id, done:true});
  }

}
