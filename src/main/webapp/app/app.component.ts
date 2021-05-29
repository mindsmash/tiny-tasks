import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Task, TaskList } from './tasks/task';
import { TaskService } from './tasks/task.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  tasks$: Observable<Task[]>;

  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.init();
  }

  created(): void {
    this.tasks$ = this.taskService.getAll();
  }

  deleted(): void {
    this.tasks$ = this.taskService.getAll();
  }

  /**
   * change task status by using drag and drop
   * @param event drag drop event
   * @param taskList list of all tasks
   */
  drop(event: CdkDragDrop<Task[]>, taskList: TaskList[]): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      taskList = this.setTaskListData(taskList, event.previousContainer);
    }
    taskList = this.setTaskListData(taskList, event.container);
    this.tasks$ = this.taskService.updateAll(taskList);
  }

  setTaskListData(taskList: TaskList[], container): TaskList[] {
    const dataIndex = taskList.findIndex(x => x.id === container.id);
    if (dataIndex !== -1) {
      taskList[dataIndex].data = container.data;
    }
    return taskList;
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
