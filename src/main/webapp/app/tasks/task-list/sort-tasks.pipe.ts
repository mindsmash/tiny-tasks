import {Pipe, PipeTransform} from '@angular/core';
import {Task, TaskStatus} from '../task';

const taskStatusOrder = [
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

  transform(tasks: Task[], order: TaskStatus[] = taskStatusOrder): Task[] {
    return [...tasks].sort((a: Task, b: Task): number => {
      if (a.status === b.status) { return 0; }

      return order.indexOf(a.status) - order.indexOf(b.status);
    });
  }

}
