import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { Task } from './task';
import { TaskService } from './task.service';


@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  create(name: string, image: File): Observable<Task> {
    const headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const httpUploadOptions = {
      headers
    };

    let formData = new FormData();
    formData.append('image', image);
    formData.append('taskRequest', name);

    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post<Task>(this.baseUrl + '/tasks', formData, options);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getAttach(id: string): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.baseUrl + `/tasks/${id}/attach`, {
      responseType: 'blob' as 'json',
      observe: 'response'
    });
  }
}
