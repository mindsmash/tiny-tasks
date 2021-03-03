import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../tasks/task';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tasks: Task[], term: string): Task[] {
    if(!term) {
      return tasks;
    }

    term = term.toLowerCase();
    return tasks.filter(
        task => task.name.toLowerCase().includes(term)
    )
  }
}
