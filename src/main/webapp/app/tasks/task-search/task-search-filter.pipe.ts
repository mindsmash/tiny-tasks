import {Pipe, PipeTransform} from '@angular/core';
import {Task} from 'app/tasks/task';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'taskSearchFilter',
  pure: false
})
export class TaskSearchFilterPipe implements PipeTransform {

  private static filterTaskList(tasks: Task[], key: string): Task[] {
    // advanced search logic with search operators - AND and OR implemented

    if (key.includes('OR')) {
      return this.filterTasksForOperator(tasks, key, 'OR')
        .reduce((union, singleResultList) => [...new Set([...union, ...singleResultList])]);

    } else if (key.includes('AND')) {
      return this.filterTasksForOperator(tasks, key, 'AND')
        .reduce((intersection, singleResultList) => intersection.filter(item => singleResultList.includes(item)));

    } else {
      return tasks.filter(task => task.name.toLocaleLowerCase().includes(key));
    }
  }

  private static filterTasksForOperator(tasks: Task[], key: string, operator: string): Task[][] {
    return key.split(new RegExp(operator)) // finds individual queries
      .map(item => item.trim()) // trim whitespace
      .map(andQuery => { // evaluate each query
        return this.filterTaskList(tasks, andQuery);
      });
  }


  transform(tasks: Task[], taskForm: FormGroup): Task[] {
    const key = taskForm.value.name;
    if (key === null || key.length === 0 || tasks === null) {
      return tasks;
    }
    return TaskSearchFilterPipe.filterTaskList(tasks, key);

  }


}
