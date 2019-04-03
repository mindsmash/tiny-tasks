import {Component, OnInit} from '@angular/core';
import {TaskService} from 'app/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  tasks: Array<string>;

  constructor(private taskService: TaskService) {
  }

  /**
   * Adds a new task to the list of tasks.
   *
   * @param task the task's description
   */
  add(task: string): void {
    this.tasks.push(task);
    this.taskService.add(task);
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.tasks.splice(index, 1);
    this.taskService.remove(index);
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
    this.taskService.clear();
  }

  ngOnInit(): void {
    this.tasks = this.taskService.getAll();
  }
}
