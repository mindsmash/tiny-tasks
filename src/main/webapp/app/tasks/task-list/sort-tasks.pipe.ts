import {Pipe, PipeTransform} from '@angular/core';
import {Task, TaskStatus} from '../task';

export const DEFAULT_TASK_STATUS_ORDER = [
  TaskStatus.Todo,
  TaskStatus.InProgress,
  TaskStatus.Blocked,
  TaskStatus.Done,
  TaskStatus.Cancelled
];

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: Task[], order: TaskStatus[] = DEFAULT_TASK_STATUS_ORDER): Task[] {
    return [...tasks].sort((a: Task, b: Task): number => {
      if (a.status === b.status) { return 0; }
      const aIndex = order.indexOf(a.status);
      const bIndex = order.indexOf(b.status);
      if (aIndex < 0) { return 1; }
      if (bIndex < 0) { return -1; }

      return  aIndex - bIndex;
    });
  }
}
