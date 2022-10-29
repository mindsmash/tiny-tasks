import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../app.tokens';
import { FilterUtilities } from '../shared/components/filter/utilities/filter.functions';
import { QueryParamsUtils } from '../shared/functions/query-params.utils';
import { SortUtils } from '../shared/functions/sort.utils';
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

  getFiltered(filter: Record<string, string> | null, sort: ISort | null): Observable<Task[]> {
    const urlQuery: string = QueryParamsUtils.buildQueryParamString(FilterUtilities.buildFilterString(filter), SortUtils.buildSortString(sort));
    return this.http.get<Task[]>(`${this.baseUrl}/tasks${urlQuery ? `?${urlQuery}` : ''}`);
  }

  saveTaskData(taskData: Task): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/task/${taskData.id}`, taskData);
  }
}
