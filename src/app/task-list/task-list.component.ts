import { Component } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {


  constructor(private taskService: TaskService) {}

  public addTask(task: string): void {
    this.taskService.add(task);
  }

  public clearAll(): void {
    this.taskService.clear();
  }

  /**
   * Removes the task with the given index from the list of tasks.
   *
   * @param index the index of the task to be removed
   */
  remove(index: number): void {
    this.taskService.remove(index);
  }

  get tasks(): string[] {
    return this.taskService.tasks;
  }

}
