import { Pipe, PipeTransform } from '@angular/core';
import { Status, Task } from '../task';

@Pipe({name: 'filterByStatus'})
export class FilterByStatusPipe implements PipeTransform {
  transform(tasks: Task[] | null, status: Status): Task[] {
    return tasks?.filter(task => task.status === status)??[];
  }
}