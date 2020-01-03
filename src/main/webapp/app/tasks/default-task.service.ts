import {HttpClient, HttpResponse} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {BASE_URL} from '../app.tokens';
import {Task} from './task';
import {TaskService} from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, file?: File): Observable<Task> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('taskRequest', name);
    return this.http.post<Task>(this.baseUrl + '/tasks', formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  downloadFile(fileName: String): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.baseUrl + '/files/' + fileName, {
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
