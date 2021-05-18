import {Pipe, PipeTransform} from '@angular/core';
import {Task} from "app/tasks/task";

@Pipe({
  name: 'taskSort'
})
export class TaskSortPipe implements PipeTransform {

  transform(tasks: Task[]): Task[] {
    if (tasks === null) return tasks;
    tasks.sort((a, b) => {
      if (a.done && !b.done) {
        return 1;
      }
      if (!a.done && b.done) {
        return -1;
      }
      return 0;
    });
    return tasks;
  }

}
