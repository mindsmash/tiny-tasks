import {Pipe, PipeTransform} from '@angular/core';
import {Task, TaskStatus} from '../task';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    return [...tasks].sort((a: Task, b: Task): number => {
      if (a.status === b.status) { return 0; }

      return a.status === TaskStatus.Active ? -1 : 1;
    });
  }

}
