import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2'

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

  @Input() tasks: Task[] | null = [];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  searchValue: any = '';

  constructor(@Inject('TaskService') private taskService: TaskService) {}

  searchTask(event: string) {
    // @ts-ignore
    this.searchValue = event;
  }

  delete(task: Task): void {
    Swal.fire({
      title: 'Do you want to delete this task?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.taskService.delete(task.id).subscribe(() => {
          this.deleted.emit(task);
          Swal.fire('Task has been deleted!', '', 'success');

        });

      } else if (result.isDenied) {
        Swal.fire('The task was not deleted', '', 'info')
      }
    })
  }
}
