import { Component, OnInit } from '@angular/core';
import { Task } from 'src/domain/Task';
import { TaskService } from '../task.service';

@Component({
  selector: 'tiny-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  tasks: Array<Task> = [];

  get countOpenTasks(): number {
    return this.openTasks.length;
  }

  get countClosedTasks(): number {
    return this.closedTasks.length;
  }

  get openTasks(): Array<Task> {
    return this.tasks.filter(t => !t.finished);
  }

  get closedTasks(): Array<Task> {
    return this.tasks.filter(t => t.finished);
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.all().subscribe(tasks => this.tasks = tasks);
  }

  remove(index: number): void {
    this.taskService.remove(index);
  }
  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.taskService.clear();
  }

  /**
   * Reopen a closed task.
   */
  reopen(task: Task) {
    this.taskService.reopen(task);
  }

  /**
 * Close a task. OnSwipe method from hammer js, close a task too
 */
  close(task: Task): void {
    this.taskService.close(task);
  }

  taskDueDateisToday(task: Task): boolean {
    if (task.dueDate.getTime() === new Date().getTime() || task.dueDate.getTime() < new Date().getTime()) {
      return true;
    }
  }
}
