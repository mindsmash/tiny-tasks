import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() title = '';
  @Input() readonly = false;
  @Output() taskListChange = new EventEmitter<Array<Task>>();
  @Output() taskDoneChange = new EventEmitter<Task>();
  @Output() add = new EventEmitter();
  @Output() clear = new EventEmitter();

  panelOpenState = false;
  taskList: Array<Task> = [];
  minDate = new Date();

  remove(index: number) {
    this.taskList.splice(index, 1);
    this.tasks = this.taskList;
  }

  check(index: number) {
    this.taskDoneChange.emit(this.taskList[index]);
    this.taskList.splice(index, 1);
    this.tasks = this.taskList;
  }

  @Input()
  get tasks() {
    return this.taskList;
  }

  set tasks(tasks) {
    this.taskList = tasks;
    this.taskListChange.emit(this.taskList);
  }

  addTask() {
    this.add.emit();
  }

  clearAllTasks() {
    this.clear.emit();
  }
}
