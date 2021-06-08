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
    // advanced search logic with search operators - AND and OR implemented

    // OR has lower precedence than AND, so search first for OR (parsing from outside to inside)
    const orQueries = key.split(new RegExp('OR')).map(item => item.trim()).filter(item => item.length > 0);
    console.log(orQueries);
    const orResults = orQueries.map (orQuery => {
      // get AND queries
      const andQueries = orQuery.split(new RegExp('AND')).map(item => item.trim());

      // get results of individual queries
      const andResults = andQueries.map(andQuery => {
        return tasks.filter(task => task.name.toLocaleLowerCase().includes(andQuery));
      });

      // find intersection of results (AND logic)
      return andResults.reduce((intersection, singleResultList) => intersection.filter(item => singleResultList.includes(item)));
    });
    // combine and return results of OR queries
    return orResults.reduce((union, singleResultList) => [...new Set([...union, ...singleResultList])]);

  }
}
