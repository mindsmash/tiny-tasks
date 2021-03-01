import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../task';

@Pipe({
  name: 'filterTask',
  pure: false
})
export class FilterTaskPipe implements PipeTransform {

  transform(tasks: Task[], text: string): Task[] {
    if (text?.trim()) {
      if (text.includes('AND')) {
        const splittedText = text.split('AND');
        return tasks.filter(task => splittedText.every(part => this.checkIfIncludeText(task.name, part)));
      } else if (text.includes('OR')) {
        const splittedText = text.split('OR');
        return tasks.filter(task => splittedText.some(part => this.checkIfIncludeText(task.name, part)));
      } else {
        return tasks.filter(task => this.checkIfIncludeText(task.name, text));
      }
    } else {
      return tasks;
    }
  }

  checkIfIncludeText(source, text) {
    return source.toLowerCase().includes(text.trim().toLowerCase());
  }

}
