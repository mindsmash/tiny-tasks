import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';

@Pipe({
  name: 'filterTask',
  pure: false
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: Task[], text: string): Task[] {
    if (text.includes('AND')) {
      const splittedText = text.split('AND');
        return tasks.filter(task => {
          let isFound = true;
          splittedText.map(part => part.trim().toLowerCase()).forEach(part => {
            if (!task.name.toLowerCase().includes(part) || !part.length) {
              isFound = false;
            }
          });
          return isFound;
        });
    }
    else if (text.includes('OR')) {
      const splittedText = text.split('OR');
        return tasks.filter(task => {
          let isFound = false;
          splittedText.map(part => part.trim().toLowerCase()).forEach(part => {
            if (task.name.toLowerCase().includes(part) && part.length) {
              isFound = true;
            }
          });
          return isFound;
        });
    }
    else if (text) {
      return tasks.filter(task => task.name.toLowerCase().includes(text.toLowerCase()));
    } else {
      return tasks;
    }
  }

}
