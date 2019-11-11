import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';


@Pipe({name: 'sortDone'})
export class TaskListSortDone implements PipeTransform {
    transform(tasks: Task[]): Task[] {
        tasks.sort((a: Task, b: Task) => {
            return b.done ? -1 : 1;
        });
        return tasks;
    }
}
