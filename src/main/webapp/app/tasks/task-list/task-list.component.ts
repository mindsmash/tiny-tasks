import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import { CategoryService } from '../category.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem, } from '@angular/cdk/drag-drop';
import { Category } from '../category';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  @Input() categories: Category[];

  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  @Output() changedCategory: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService, @Inject('CategoryService') private categoryService: CategoryService) { }

  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  changeCategory(task: Task, category: Category): void {
    this.taskService.changeCategory(task.id, category.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  deleteCategory(categoryId: string): void {
    this.categoryService.delete(categoryId).subscribe(() => {
      this.deleted.emit();
    });
  }

  deleteAllTasksByCategory(categoryId: String): void{
    this.taskService.deleteAllTasksByCategory(categoryId).subscribe(() => {
      this.deleted.emit();
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.changeCategory(event.container.data[event.currentIndex], {id: event.container.id});

    }
  }
}
