import { Component } from '@angular/core';
import { PersistanceService} from './persistance.service'
import { Task } from './task';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PersistanceService]
})
export class AppComponent {
  constructor(private persister: PersistanceService) {}
  tasks: Array<Task> = this.getAllTasks();

  /**
   * Marks the given task as done
   * @param task
   * @param value
   */
  changeToDone(task: Task, value: boolean) {
    if(value==true) {
      for (let i = 0; i < this.tasks.length; i++) {
        if (this.tasks[i].name == task.name) {
          this.tasks[i].status = 'done';
        }
      }
    }
    this.persistTasks();
  }
  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(addName: string): void {
    let task: Task = {name: '', status: ''};
    task.name = addName;
    task.status = 'pending';
    this.tasks.push(task);
    this.persistTasks();
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
    this.persistTasks();
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
    this.persistTasks();
  }

  /**
   * Persists the Array tasks
   */
  persistTasks(){
    this.persister.set('tasks', this.tasks);
  }

  /**
   * Returns all persisted tasks
   */
  getAllTasks(){
    if(this.persister.get('tasks') == null){
      return [];
    }
    return this.persister.get('tasks');
  }
}
