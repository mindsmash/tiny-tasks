import { Observable } from 'rxjs';

import { Task } from 'app/tasks/task';

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface TaskService {

  /**
   * Returns the list of all tasks.
   *
   * @returns an `Observable` holding the list of tasks
   */
  getAll(): Observable<Task[]>;

  /**
   * Adds a new task to the list of tasks.
   *
   * @param name the task's name
   * @param status the task's status
   * @returns an `Observable` holding the created task
   */
  create(name: string, status: string): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;


  /**
   * Update the status of a task item.
   *
   * @param id the ID of the task to be updated
   * @param status the task's status to be updated
   * @returns an `Observable` holding the list of tasks
   */
  updateStatus(id: string, status: string): Observable<Task[]>;

  /**
   * Clear all completed (done) task items.
   *
   * @returns an empty `Observable`
   */
  clearCompletedTasks(): Observable<void>;
}
