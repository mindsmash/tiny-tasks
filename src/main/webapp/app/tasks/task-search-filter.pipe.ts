import {Pipe, PipeTransform} from '@angular/core';
import {Task} from 'app/tasks/task';
import {FormGroup} from '@angular/forms';

@Pipe({
  name: 'taskSearchFilter',
  pure: false
})
export class TaskSearchFilterPipe implements PipeTransform {

  transform(tasks: Task[], taskForm: FormGroup): Task[] {
    const key = taskForm.value.name;
    if (key === null || key.length === 0 || tasks === null) {
      return tasks;
    }
    return tasks.filter(task => task.name.includes(key));
  }
}
