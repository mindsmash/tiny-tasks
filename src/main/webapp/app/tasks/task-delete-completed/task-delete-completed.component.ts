import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Output} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';

/**
 * A list of tiny tasks.
 */
@Component({
    selector: 'tiny-delete-completed',
    templateUrl: './task-delete-completed.component.html',
    styleUrls: ['./task-delete-completed.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDeleteCompletedComponent {

    @Output() eventDeleteCompleted: EventEmitter<Task> = new EventEmitter();

    constructor(@Inject('TaskService') private taskService: TaskService) {
    }

    deleteCompletedTasks(task: Task) {
        this.taskService.deleteCompletedTasks().subscribe(() => {
            this.eventDeleteCompleted.emit(task);
        });
    }
}
