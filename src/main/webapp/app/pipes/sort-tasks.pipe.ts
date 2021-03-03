import { Pipe, PipeTransform } from '@angular/core';
import { Task } from 'app/tasks/task';

@Pipe({
  name: 'sortTasks'
})
export class SortTasksPipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    tasks.sort((a, b) => {
      if (a.done && !b.done) {
        return 1;
      }
      if (!a.done && b.done) {
        return -1;
      }
    });
    return tasks;
  }

}
