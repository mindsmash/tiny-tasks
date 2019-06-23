import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../../_shared/_entities/task';
import { TaskService } from '../../_shared/_services/task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent {

  @Input() tasks: Task[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  changeStatus(task: Task): void{

    this.taskService.update(new Task(task.id, task.name, this.returnNextStatus(task.status), task.username)).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  returnNextStatus(status: string): string{
    if(status === 'TO DO'){
      return 'IN PROGRESS'
    } else if(status === 'IN PROGRESS'){
      return 'DONE'
    }
    return 'TO DO';
  }

  moveToStatusTooltip(input: string): string{
    if(input === 'TO DO'){
      return 'Move to: IN PROGRESS';
    } else if(input === 'IN PROGRESS'){
      return 'Move to: DONE'
    }
    return 'Revert to: TO DO'
  }
}
