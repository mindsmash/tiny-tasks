import { Injectable } from '@angular/core';
import { Task } from 'src/domain/Task';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Array<Task> = [];

  constructor() { }

  /**
   * Add a new Task.
   */
  add(task: Task): Observable<any> {
    return new BehaviorSubject(this.tasks.push(task));
  }

  /**
 * Return  all tasks saved.
 */
  all(): Observable<Task[]> {
    return new BehaviorSubject(this.tasks);
  }

  /**
 * Removes the task with the given index from the list of tasks.
 *
 * @param index the index of the task to be removed
 */
  remove(index: number): Observable<any> {
    return new BehaviorSubject(this.tasks.splice(index, 1));
  }

  /**
   * Clears the list of tasks.
   */
  clear(): void {
    this.tasks.splice(0);
  }

  /**
   * Close a task.
   */
  close(task: Task) {
    task.finished = true;
  }


  /**
   * Reopen a closed task.
   */
  reopen(task: Task) {
    task.finished = false;
  }
}
