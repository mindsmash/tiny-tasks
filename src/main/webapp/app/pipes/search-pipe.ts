import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './../tasks/task';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  transform(tasks: Task[] = [], filterValue: string = '') {
    if (!tasks) {
      return [];
    }
    if (!filterValue) {
      return tasks;
    }
    return tasks.filter(task => task.name.includes(filterValue));
  }

}
