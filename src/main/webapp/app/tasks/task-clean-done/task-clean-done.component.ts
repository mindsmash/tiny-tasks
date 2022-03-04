import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {TaskService} from "../task.service";
import {Task} from "../task";

@Component({
  selector: 'tiny-task-clean-done',
  templateUrl: './task-clean-done.component.html',
  styleUrls: ['./task-clean-done.component.scss']
})
export class TaskCleanDoneComponent implements OnInit {

  @Output() cleanedDone: EventEmitter<Task[]> = new EventEmitter();
  constructor(@Inject('TaskService') private taskService: TaskService) { }

  ngOnInit(): void {
  }

  clearDoneTasks() {
    this.taskService.clearDone().subscribe(tasks=> {
      this.cleanedDone.emit(tasks);

    })
  }
}
