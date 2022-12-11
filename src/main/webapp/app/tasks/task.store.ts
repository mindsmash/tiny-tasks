import { Inject, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

import { Task } from './task';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class TaskStore implements OnDestroy {
  private tasksSubject$ = new BehaviorSubject<Task[]>([])
  private destroy$ = new Subject<void>();
  tasks$ = this.tasksSubject$.asObservable();
 
  constructor(@Inject('TaskService') private taskService: TaskService) {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAll().pipe(takeUntil(this.destroy$)).subscribe(tasks => {
      this.tasksSubject$.next(tasks);
    })
  }

  create(task: Task) {
    const tasks = this.getTasks();
    this.tasksSubject$.next([...tasks, task]);
  }

  delete(id: string) {
    const tasks = this.getTasks();
    this.tasksSubject$.next(tasks.filter(task => task.id !== id));
  }

  update(task: Task) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(t => t.id === task.id);
    if (taskIndex > -1) {
      tasks[taskIndex] = task;
    }
    this.tasksSubject$.next(tasks);
  }

  private getTasks(): Task[] {
    return this.tasksSubject$.getValue();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
