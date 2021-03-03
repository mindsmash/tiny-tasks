import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)', 'height': '0', 'margin-top': '0', }),
        animate('0.3s ease-in',
          style({
            'opacity': '1',
            'height': '32px',
            'margin-top': '32px',
            transform: 'translateY(0%)'
          }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate('0.3s ease-out',
          style({
            'opacity': '0',
            'margin-top': '0',
            'height': '0',
            transform: 'translateY(-100%)'
          }))
      ])
    ])
  ]
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() doneStatusChanged: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  toggleDone(event: MatCheckboxChange, task: Task): void {
    this.taskService.setIsDone(task.id, event.checked).subscribe(() => {
      this.doneStatusChanged.emit(task);
    });
  }

  get hasDoneTasks(): boolean {
    if (this.tasks) {
      return this.tasks.some(task => task.done);
    }
    return false;
  }

  deleteAllDoneTasks() {
    this.taskService.deleteAllDoneTasks().subscribe(() => {
      this.doneStatusChanged.emit();
    });
  }
}
