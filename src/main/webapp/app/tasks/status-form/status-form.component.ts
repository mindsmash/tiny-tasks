import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { TaskService } from '../task.service';
import { Task, TaskList } from '../task';
import { DataHelper } from 'app/shared/helpers';
import { Status } from '../enums';

@Component({
  selector: 'tiny-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusFormComponent implements OnInit {

  tasks$: Observable<TaskList[] | Task[]>;
  public defaultTasksStatus = Status;

  statusForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getAll();
  }

  /**
   * drag and drop event
   * @param event CdkDragDrop
   * @param taskList list of all tasks
   */
  drop(event: CdkDragDrop<string[]>, taskList: TaskList[]): void {
    moveItemInArray(taskList, event.previousIndex, event.currentIndex);
    taskList = DataHelper.setTaskListData(taskList, event.container);
    this.tasks$ = this.taskService.updateAll(taskList);
  }

  /**
   * prevent todo and done status sorting
   * @param index sort index
   * @param drag CdkDrag
   * @param drop CdkDropList
   * @returns if status todo or done return false else true
   */
  preventMainStatus(index: number, drag: CdkDrag, drop: CdkDropList): boolean {
    return index !== 0 && index !== drop.data.length - 1;
  }

  /**
   * add new status.
   * @param tasks list of all tasks
   */
  onSubmit(tasks: TaskList[]): void {
    if (this.statusForm.valid) {
      tasks.splice(tasks.length - 1, 0, {
        id: uuid(),
        name: this.statusForm.value.name,
        data: []
      });
      this.taskService.updateAll(tasks);
    }
  }

  /**
   * delete a status.
   * @param index status index
   * @param tasksList list of all tasks
   */
  delete(index, tasksList: TaskList[]): void {
    tasksList.splice(index, 1);
    this.tasks$ = this.taskService.updateAll(tasksList);
  }

  /**
   * TrackBy to increase performance
   * @param index item index number
   * @returns item index number
   */
  trackByFn(index: number): number {
    return index;
  }

}
