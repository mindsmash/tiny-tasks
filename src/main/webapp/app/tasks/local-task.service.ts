import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { v4 as uuid } from 'uuid'

import { Task } from './task'
import { TaskService } from './task.service'

@Injectable()
export class LocalTaskService implements TaskService {
  private static readonly STORAGE_KEY: string = 'tiny.tasks'

  getAll(): Observable<Task[]> {
    return of(this.readTasks())
  }

  create(name: string): Observable<Task> {
    const tasks = this.readTasks()
    const task = { id: uuid(), name, status }
    tasks.push(task)
    this.writeTasks(tasks)
    return of(task)
  }

  delete(id: string): Observable<void> {
    const tasks = this.readTasks()
    const index = tasks.findIndex(task => task.id === id)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.writeTasks(tasks)
    }
    return of(null)
  }

  setIsDone(id: string): Observable<void> {
    const tasks = this.readTasks()
    tasks.forEach(task =>
      task.id === id ? (task.status = 'done') : (task.status = 'to do')
    )
    // here or in the task-list.component.ts I would sort the tasks by their status
    this.writeTasks(tasks)
    return of(null)
  }

  deleteDoneTasks(status: string): Observable<void> {
    const tasks = this.readTasks()
    const index = tasks.findIndex(task => task.status === status)
    if (index !== -1) {
      tasks.splice(index, 1)
      this.writeTasks(tasks)
    }
    return of(null)
  }

  private readTasks(): Task[] {
    const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY)
    return tasks ? JSON.parse(tasks) : []
  }

  private writeTasks(tasks: Task[]): void {
    localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks))
  }
}
