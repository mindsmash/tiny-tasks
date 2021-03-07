import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { AfterContentChecked, ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { LocalTaskService } from '../local-task.service';
import { Task, TaskStatus } from '../task';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements AfterContentChecked {

  @Input() tasks: Task[];
  @Output() deleted: EventEmitter<Task> = new EventEmitter();
  @Output() statusChanged: EventEmitter<Task> = new EventEmitter();
  @Output() deletedAllDoneTasks: EventEmitter<Task> = new EventEmitter();

  public doneTasks: Array<Task>;
  public toDoTasks: Array<Task>;
  public statuses: Array<string>;

  constructor(@Inject('TaskService') private taskService: LocalTaskService) {}

  /**
   * Angular lifecycle hook, called after any @Input propery is changed
   * Used to get task bifergation using task status
   */
  ngAfterContentChecked() {
    if (this.tasks) {
      this.doneTasks = this.tasks.filter( task => task.status === TaskStatus.Done );
      this.toDoTasks = this.tasks.filter( task => task.status !== TaskStatus.Done );
    }
    this.statuses = Object.values(TaskStatus);
  }

  /**
   * Callback for delete request of a task, removes task from local storage using id
   * @param task task object which needs to be deleted
   */
  public delete(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.delete(task.id).subscribe(() => {
        this.deleted.emit(task);
      });
    }
  }

  /**
   * Callback for change event of status dropdown, changes status of the given task
   * @param task task for which status needs to be updated
   * @param event change event reference to get selected value from dropdown
   */
  public changeStatus(task: Task, event: any) {
    this.taskService.changeStatus(task.id, event.value).subscribe(() => {
      this.statusChanged.emit(task);
    });
  }

  /**
   * Callback for deleting request for all done task
   * Removes all done task from local storage
   */
  public deleteAllDoneTasks(): void {
    if (confirm('Are you sure you want to delete all done tasks?')) {
      this.taskService.deleteAllTasks().subscribe(() => {
        this.deletedAllDoneTasks.emit();
      });
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
    this.doneTasks.forEach((task: Task) => {
        task.status = TaskStatus.Done;
    });
  }

  /** Predicate function that doesn't allow items to be dropped into a list. */
  noReturnPredicate() {
    return false;
  }
}
