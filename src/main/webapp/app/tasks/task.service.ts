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
   * @returns an `Observable` holding the created task
   */
  create(name: string): Observable<Task>;

  /**
   * Removes the task with the given ID from the list of tasks.
   *
   * @param id the ID of the task to be removed
   * @returns an empty `Observable`
   */
  delete(id: string): Observable<void>;

  /**
   * Marks a task as done by the given ID.
   *
   * @param id the ID of the task to be marked
   * @param isDone the status of task
   * @returns an empty `Observable`
   */
  setIsDone(id: string, isDone: boolean): Observable<void>;

  /**
   * Delete all done tasks.
   *
   * @returns an empty `Observable`
   */
  deleteAllDoneTasks(): Observable<void>;
}
