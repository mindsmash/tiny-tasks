import {ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output} from '@angular/core';

import {Task} from '../task';
import {TaskService} from '../task.service';

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

    @Output() eventDone: EventEmitter<Task> = new EventEmitter();
    @Output() deleted: EventEmitter<Task> = new EventEmitter();

    constructor(@Inject('TaskService') private taskService: TaskService) {
    }

    delete(task: Task): void {
        this.taskService.delete(task.id).subscribe(() => {
            this.deleted.emit(task);
        });
    }

    done(task: Task) {
        this.taskService.done(task.id).subscribe(() => {
            this.eventDone.emit(task);
        })
    }
}
