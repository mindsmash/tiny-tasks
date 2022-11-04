import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { IFilterData } from '../shared/components/filter/utilities/filter.model';
import { ISort } from '../shared/models/sort.model';
import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class DefaultTaskService implements TaskService {

  constructor(
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) { }

  create(name: string): Observable<Task> {
    return this.http.post<Task>(this.baseUrl + '/tasks', { name } as Task);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/tasks/' + id);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl + '/tasks');
  }

  getFiltered(filter: IFilterData | undefined, sort: ISort | undefined): Observable<Task[]> {
    const tempParamsObj: Record<string, any> = {
      ...(filter || {}),
      ...{
        sortBy: sort && sort.sortBy && sort.sortBy.value,
        sortDir: sort && sort.sortDir
      }
    };
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`, { params: tempParamsObj });
  }

  saveTaskData(taskData: Task): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/task/${taskData.id}`, taskData);
  }
}
