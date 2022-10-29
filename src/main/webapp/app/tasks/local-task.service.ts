import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { v4 as uuid } from 'uuid';
import { FilterUtilities } from '../shared/components/filter/utilities/filter.functions';
import { QueryParamsUtils } from '../shared/functions/query-params.utils';
import { SortUtils } from '../shared/functions/sort.utils';
import { ISort, SortDirection, TaskSortType } from '../shared/models/sort.model';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

  private static readonly STORAGE_KEY: string = 'tiny.tasks';

  getAll(): Observable<Task[]> {
    return of(this.readTasks());
  }

  getFiltered(filter: Record<string, any> | null, sort: ISort | null): Observable<Task[]> {
    const urlQuery: string = QueryParamsUtils.buildQueryParamString(FilterUtilities.buildFilterString(filter), SortUtils.buildSortString(sort));
    return of(
      this.readTasks()
        .filter((el) => el.name.toLowerCase().includes((filter?.taskName || '').toLowerCase()))
        .sort((value1, value2) => {
          let tempValue1: any;
          let tempValue2: any;
          switch (sort?.sortBy.value) {
            case TaskSortType.NAME: {
              tempValue1 = value1.name.toLowerCase();
              tempValue2 = value2.name.toLowerCase();
              break;
            };
            case TaskSortType.DUE_DATE: {
              tempValue1 = value1.dueDate ? new Date(value1.dueDate as string).getTime() : null;
              tempValue2 = value2.dueDate ? new Date(value2.dueDate as string).getTime() : null;
              break;
            };
            case TaskSortType.NONE:
            case null:
            default: return 0;
          }
          if (tempValue1 < tempValue2) { return sort.sortDir === SortDirection.ASC ? -1 : 1; }
          if (tempValue1 > tempValue2) { return sort.sortDir === SortDirection.ASC ? 1 : -1; }
          return 0;
        })
    );
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks();
    const task = { id: uuid(), name };
    tasks.push(task);
    this.writeTasks(tasks);
    return of(task);
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.writeTasks(tasks);
    }
    return of(void 0);
  }

  saveTaskData(taskData: Task): Observable<void> {
    const tasks = this.readTasks();
    const index = tasks.findIndex(task => task.id === taskData.id);
    if (index !== -1) {
      tasks[index] = taskData;
      this.writeTasks(tasks);
    }
    return of(void 0);
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
  }
}
