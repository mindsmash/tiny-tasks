import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TaskState } from 'src/main/webapp/app/enum/task-state.enum';
import { LocalTaskService } from 'src/main/webapp/app/tasks/local-task.service';

import { Task } from '../../model/task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnChanges {

  @Input() tasks: Task[] | null = null;

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  toDoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  blockedTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(@Inject('TaskService') private taskService: TaskService, private localTaskService: LocalTaskService) { }

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasksByState();
    });
  }

  ngOnChanges(): void {
    this.filterTasksByState();
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
    this.getAllTasks();
  }

  filterTasksByState(): void {
    if (this.tasks) {
      this.toDoTasks = this.tasks.filter(task => task.state === TaskState.TODO || !task.state);
      this.inProgressTasks = this.tasks.filter(task => task.state === TaskState.IN_PROGRESS);
      this.blockedTasks = this.tasks.filter(task => task.state === TaskState.BLOCKED);
      this.doneTasks = this.tasks.filter(task => task.state === TaskState.DONE);
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      const task = event.container.data[event.currentIndex];
      task.state = this.getStateByContainerId(event.container.id);
      this.localTaskService.update(task).subscribe();
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  getStateByContainerId(containerId: string): TaskState {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return TaskState.TODO;
      case 'cdk-drop-list-1':
        return TaskState.IN_PROGRESS;
      case 'cdk-drop-list-2':
        return TaskState.BLOCKED;
      case 'cdk-drop-list-3':
        return TaskState.DONE;
    }
    return TaskState.TODO;
  }

  updateTaskState(task: Task): void {
    this.localTaskService.update(task).subscribe(() => {
      this.filterTasksByState();
    });
  }
}
