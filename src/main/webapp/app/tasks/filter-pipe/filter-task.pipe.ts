import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';

@Pipe({
  name: 'filterTask',
  pure: false
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: Task[], text: string): Task[] {
    if (text) {
      if (text.includes('AND')) {
        const splittedText = text.split('AND');
        return tasks.filter(task => splittedText.every(part => task.name.toLowerCase().includes(part.trim().toLowerCase())));
      } else if (text.includes('OR')) {
        const splittedText = text.split('OR');
        return tasks.filter(task => splittedText.some(part => task.name.toLowerCase().includes(part.trim().toLowerCase())));
      } else {
        return tasks.filter(task => task.name.toLowerCase().includes(text.toLowerCase()));
      }
    } else {
      return tasks;
    }
  }

}
