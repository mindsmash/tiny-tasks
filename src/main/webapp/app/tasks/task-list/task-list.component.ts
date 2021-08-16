import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';

import { Task } from '../task';
import { TaskService } from '../task.service';
import {LocalTaskService} from 'app/tasks/local-task.service';

/**
 * A list of tiny tasks.
 */
@Component({
  selector: 'tiny-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit{

  @Input() tasks: Task[];
  editMode = false;
  selectedTasks: Task[] = [];
  @Output() deleted: EventEmitter<Task> = new EventEmitter();

  constructor(@Inject('TaskService') private taskService: TaskService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.taskService.sortTasks();
  }

  /**
   * delete a task
   * @param task
   */
  delete(task: Task): void {
    this.taskService.delete(task.id).subscribe(() => {
      this.deleted.emit(task);
    });
  }

  /**
   * change edit mode
   */
  editTasks(): void{
    this.editMode = !this.editMode;
  }

  /**
   * check the selected task if true modify css class to be selected
   * @param task
   */
  checkSelectedTask(task: Task): any{
    const item = this.tasks.find(x => x.id === task.id && task.status === 'done');
    if (item){
      return true;
    }
    return false;
  }

  /**
   * function that changes the task status from uncompleted to done
   * @param task
   */
  changeTaskStatus(task: Task): void{
    this.taskService.editTask(task);
    this.updateTasks();
    this.taskService.sortTasks();

  }


  getStatus(task: Task): any{
    const item = this.tasks.find(x => x.id === task.id &&  x.status === 'done')
    if (item){
      return true;
    }else{
      return false;
    }
  }

  updateTasks(): void{
    this.taskService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  clearDoneTasks(): void{
    this.taskService.clearDoneTasks();
    this.updateTasks();
  }
}
