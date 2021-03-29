import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output, SimpleChanges
} from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnChanges{

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks.currentValue) {
      this.sort();
    }
  }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  clear(): void {
    this.tasks.forEach(task => {
      if (task.done) {
        this.delete(task);
      }
    });
  }

  update(task: Task): void {
    this.taskService.update(task).subscribe();
    this.sort();
  }

  sort(): void {
    this.tasks.sort((task1, task2) => {
      if (task1.done > task2.done) { return 1; }
      else if (task1.done < task2.done) { return -1; }
      return 0;
    });
  }
}
