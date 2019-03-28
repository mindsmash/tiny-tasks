import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';

@Component({
  selector: 'tiny-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  tasks: Array<object> = [];

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks().subscribe((data: Array<object>) => {
      this.tasks = data;
    });
  }

  add(taskInput: HTMLInputElement): void {
    this.tasksService.createTask(taskInput.value).subscribe((data: Object) => {
      this.tasks.push(data);
      taskInput.value = "";
    });
  }

  remove(id: number): void {
    this.tasksService.deleteTask(id).subscribe((data: Array<object>) => {
      this.tasks = data;
    });
  }

  clear(): void {
    this.tasksService.deleteAllTasks().subscribe((data: Array<object>) => {
      this.tasks = data;
    });
  }
}
